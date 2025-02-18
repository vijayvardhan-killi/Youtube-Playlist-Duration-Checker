import React from "react";

const Header = () => {
  return (
    <>
      <div className="bg-red-600 text-youtube-white p-6 text-center">
        <h1 className="sm:text-3xl text-xl line font-bold">YouTube Playlist Duration Calculator</h1>
        <p className="sm:text-base  text-sm text-youtube-black mt-2">
          Calculate the total duration of any YouTube playlist.
        </p>
      </div>
    </>
  );
};

export default Header;
