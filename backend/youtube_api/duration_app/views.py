import os
import re
import logging
from django.http import JsonResponse
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)

# Fetch API key from environment variables
API_KEY = os.getenv('YOUTUBE_API_KEY')
if not API_KEY:
    logger.error("API_KEY not found. Check your .env file.")
    raise Exception("API_KEY not found. Check your .env file.")

# Initialize YouTube API client
youtube = build('youtube', 'v3', developerKey=API_KEY)


def calculate_playlist_duration(playlist_id):
    """
    Calculate the total duration of a YouTube playlist and return details of each video.
    """
    total_seconds = 0
    average_duration = 0
    next_page_token = None
    video_details = []

    try:
        while True:
            # Fetch playlist items
            playlist_request = youtube.playlistItems().list(
                part='snippet,contentDetails,status',
                playlistId=playlist_id,
                maxResults=50,
                pageToken=next_page_token
            )
            playlist_response = playlist_request.execute()

            # Extract video IDs from the playlist
            vid_ids = [item['contentDetails']['videoId'] for item in playlist_response['items']]

            # Fetch video details
            videos_request = youtube.videos().list(
                part='snippet,contentDetails',
                id=','.join(vid_ids)
            )
            videos_response = videos_request.execute()

            # Process each video
            for video in videos_response['items']:
                title = video['snippet']['title']
                thumbnail = video['snippet']['thumbnails']['medium']['url']
                duration = video['contentDetails']['duration']
                seconds = parse_duration(duration)
                formatted_duration = format_duration(seconds)
                total_seconds += seconds
                video_details.append({
                    'title': title,
                    'thumbnail':thumbnail,
                    'duration': formatted_duration,
                    'seconds': seconds,
                })

            # Check if there are more pages
            next_page_token = playlist_response.get('nextPageToken')
            if not next_page_token:
                break

        
    
    
    except HttpError as e:
        # Handle YouTube API errors
        logger.error(f"YouTube API error: {e}")
        raise Exception(f"YouTube API error: {e}")

    except KeyError as e:
        # Handle missing keys in the API response
        logger.error(f"Missing expected data in API response: {e}")
        raise Exception(f"Missing expected data in API response: {e}")

    except Exception as e:
        # Handle any other unexpected errors
        logger.error(f"An unexpected error occurred: {e}")
        raise Exception(f"An unexpected error occurred: {e}")

    return [format_duration(total_seconds), format_duration(total_seconds//len(video_details)),video_details ,total_seconds]


def format_duration(duration):
    """
    Format duration in seconds into a human-readable string (e.g., "1h 30m 45s").
    """
    hours, remainder = divmod(duration, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours:02d}h {minutes:02d}m {seconds:02d}s"



def parse_duration(duration):
    """
    Parse YouTube's duration format (e.g., "PT1H30M45S") into total seconds.
    """
    try:
        hours = int(re.search(r'(\d+)H', duration).group(1)) if 'H' in duration else 0
        minutes = int(re.search(r'(\d+)M', duration).group(1)) if 'M' in duration else 0
        seconds = int(re.search(r'(\d+)S', duration).group(1)) if 'S' in duration else 0
        return hours * 3600 + minutes * 60 + seconds
    except Exception as e:
        logger.error(f"Error parsing duration: {e}")
        raise Exception(f"Error parsing duration: {e}")


def get_playlist_duration(request):
    """
    Django view to handle requests for playlist duration.
    """
    try:
        # Get playlist ID from request
        playlist_id = request.GET.get('playlist_id')
        if not playlist_id:
            return JsonResponse({'error': 'Missing playlist ID'}, status=400)

        # Calculate playlist duration
        duration,average_duration , video_details ,total_seconds = calculate_playlist_duration(playlist_id)

        # Return JSON response
        return JsonResponse({
            'playlist_duration': duration,
            'total_seconds': total_seconds,
            'average_duration':average_duration,
            'video_details': video_details,
        })

    except Exception as e:
        # Handle any errors and return a user-friendly message
        logger.error(f"Error in get_playlist_duration: {e}")
        return JsonResponse({'error': str(e)}, status=500)