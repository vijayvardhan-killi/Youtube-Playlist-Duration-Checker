import React, { useState } from "react";
import getData from "../services/api";
import Results from "../components/Results";
const Home = () => {
  const [playlist_id, setPlayListId] = useState("");
  const [playListDetails, setplayListDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(playlist_id);

    setLoading(true);
    setError("");

    try {
      const data = await getData(playlist_id);
      if (data) {
        setplayListDetails(data);
      } else {
        setError("No Data Found");
      }
    } catch (err) {
      setError("An error Occured while Fetcj=hing Data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="bg-youtube-dark-gray text-youtube-white px-10 py-12">
      <form className="flex flex-col items-center justify-between">
        <div className="flex md:flex-row md:w-[45%] md:justify-around flex-col items-center mb-4 ">
          <label htmlFor="playListId" className="text-xl p-2 md:text-nowrap">
            Enter the Playlist ID :
          </label>
          <input
            type="text"
            name="playListId"
            id="playListId"
            className="sm:w-3/4 bg-transparent outline-none border-youtube-border-gray border-2 p-2 mt-2 focus:ring-2 focus:ring-youtube-red focus:border-youtube-light-red"
            placeholder="e.g., PLbpi6ZahtOH4x7Nr-foVTUSX5rhsYcsoT"
            aria-label="Playlist ID"
            value={playlist_id}
            onChange={(e) => setPlayListId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-youtube-red hover:bg-youtube-light-red rounded-md px-4 py-2"
          onClick={handleSearch}
        >
          {loading?"loading":"Get Duration"}
        </button>
      </form>

      {/* display erro */}
      {error && <p className="text-3xl text-red-600">{error}</p>}

    </div>
    {/* if video details  show result page*/}
    {playListDetails && <Results playListDetails={playListDetails}></Results>}
    </>
  );
};

export default Home;
