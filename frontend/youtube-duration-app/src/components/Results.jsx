import React from 'react'

import VideoListings from './VideoListings'

const Results = ({playListDetails}) => {
  if (!playListDetails || !playListDetails.video_details) {
    return (
      <div className="bg-youtube-border-gray">
        <h1 className="text-3xl text-center font-semibold tracking-tight pt-10">
          No video details available.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-youtube-border-gray">
      <h1 className="sm:text-3xl text-lg text-center font-semibold tracking-tight pt-10 ">
        Total Duration Of PlayList : 
      </h1> 
      <p className="sm:text-3xl text-3xl text-youtube-red text-center block">{playListDetails.playlist_duration}</p>
      <h1 className="sm:text-xl p-3 text-center text-ellipsis">Average Duration of video : </h1>
      <p className="sm:text-3xl text-3xl text-youtube-red text-center block">{playListDetails.average_duration}</p> 
      <VideoListings video_details={playListDetails.video_details} />
    </div>
  );
  
}

export default Results
