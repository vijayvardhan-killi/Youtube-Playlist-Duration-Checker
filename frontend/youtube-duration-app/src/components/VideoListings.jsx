import React from 'react'
import VideosCard from './VideosCard'

const VideoListings = ({video_details}) => {
  if (video_details.length === 0)
    return (
      <div className="">
        <h1 className="text-3xl text-red-500 text-center font-semibold tracking-tight pt-10">
          No video details available.
        </h1>
      </div>
    );
  else{

    return (
      <div className='py-2'>
        {
          video_details.map((video)=>(
            <VideosCard key={video.title} title = {video.title} duration = {video.duration} thumbnail={video.thumbnail}></VideosCard>
          ))
        }
      </div>
    )
  }
}

export default VideoListings
