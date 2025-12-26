import os
import re
import logging
from dotenv import load_dotenv
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

load_dotenv()
logger = logging.getLogger(__name__)

API_KEY = os.getenv("YOUTUBE_API_KEY")

if not API_KEY:
    raise Exception("YOUTUBE_API_KEY not found in environment")

youtube = build("youtube", "v3", developerKey=API_KEY)


def parse_duration(duration: str) -> int:
    hours = int(re.search(r"(\d+)H", duration).group(1)) if "H" in duration else 0
    minutes = int(re.search(r"(\d+)M", duration).group(1)) if "M" in duration else 0
    seconds = int(re.search(r"(\d+)S", duration).group(1)) if "S" in duration else 0
    return hours * 3600 + minutes * 60 + seconds


def format_duration(seconds: int) -> str:
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{h:02d}h {m:02d}m {s:02d}s"


def calculate_playlist_duration(playlist_id: str):
    total_seconds = 0
    video_details = []
    next_page_token = None

    try:
        while True:
            playlist_response = youtube.playlistItems().list(
                part="snippet,contentDetails,status",
                playlistId=playlist_id,
                maxResults=50,
                pageToken=next_page_token,
            ).execute()

            video_ids = [
                item["contentDetails"]["videoId"]
                for item in playlist_response["items"]
            ]

            videos_response = youtube.videos().list(
                part="snippet,contentDetails",
                id=",".join(video_ids),
            ).execute()

            for video in videos_response["items"]:
                seconds = parse_duration(video["contentDetails"]["duration"])
                total_seconds += seconds

                video_details.append({
                    "title": video["snippet"]["title"],
                    "thumbnail": video["snippet"]["thumbnails"]["medium"]["url"],
                    "duration": format_duration(seconds),
                    "seconds": seconds,
                })

            next_page_token = playlist_response.get("nextPageToken")
            if not next_page_token:
                break

        avg = total_seconds // len(video_details) if video_details else 0

        return {
            "playlist_duration": format_duration(total_seconds),
            "total_seconds": total_seconds,
            "average_duration": format_duration(avg),
            "video_details": video_details,
        }

    except HttpError as e:
        logger.error(e)
        raise Exception("YouTube API error")

