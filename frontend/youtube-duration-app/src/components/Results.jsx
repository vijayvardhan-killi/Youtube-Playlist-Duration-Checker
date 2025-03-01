import React from 'react'
import { useState } from 'react';
import SearchAndSort from './SearchAndSort';
import VideoListings from './VideoListings'

const Results = ({playListDetails}) => {
  const [sortField , setSortField] = useState('default');
  const [sortOrder , setSortOrder] = useState('default')
  const [searchText , setSearchText] = useState('')

  if (!playListDetails || !playListDetails.video_details) {
    return (
      <div className="bg-youtube-border-gray">
        <h1 className="text-3xl text-center font-semibold tracking-tight pt-10">
          No video details available.
        </h1>
      </div>
    );
  }

  const sortData = (video_details) => {

  const filteredData = video_details.filter(video =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
  );

    if (sortField === "default") {
      return [...filteredData];
    }
    else if (sortField === "duration") {
      return filteredData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.seconds - b.seconds;
        } else {
          return b.seconds - a.seconds;
        }
      });
    }
    else if (sortField === 'title') {
      return filteredData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        } else {
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        }
      });
    }else{
      return [...filteredData];
    }
  }

  return (
    <div className="shadow-xl  p-4">
      <h1 className="sm:text-3xl text-lg text-center font-semibold tracking-tight pt-10 ">
        Total Duration Of PlayList : 
      </h1> 
      <p className="sm:text-5xl text-3xl font-extrabold text-youtube-red text-center  block">{playListDetails.playlist_duration}</p>
      <h1 className="sm:text-xl p-3 font-bold text-center text-ellipsis">Average Duration of video : </h1>
      <p className="sm:text-3xl text-3xl font-medium text-youtube-red text-center block">{playListDetails.average_duration}</p> 
      <SearchAndSort sortField={sortField} setSortField={setSortField} sortOrder={sortOrder} setSortOrder={setSortOrder} searchText={searchText} setSearchText = {setSearchText} />
      <VideoListings video_details={sortData([...playListDetails.video_details])}  />
    </div>
  );
  
}

export default Results
