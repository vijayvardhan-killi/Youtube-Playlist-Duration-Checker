import React from "react";
import youtube from '../assets/youtube.svg'

const Header = () => {
  return (
    <>
    <div className="shadow-sm">
      <div className="bg-youtube-white  p-2 text-center border-4">
        <h1 className="sm:text-5xl text-xl "><span className=""><img src={youtube} alt="logo" className="md:w-16 w-9 inline-block md:mx-4 mx-1" /></span>YouTube Playlist Duration</h1>
        <p className="sm:text-base text mt-2 font-extralight">
          Calculate the total duration of any YouTube playlist.
        </p>
      </div>
    </div>
    </>
  );
};

export default Header;
