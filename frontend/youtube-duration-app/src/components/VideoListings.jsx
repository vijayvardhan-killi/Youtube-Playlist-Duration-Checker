import React from 'react'
import VideosCard from './VideosCard'

const VideoListings = ({video_details}) => {
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

export default VideoListings
