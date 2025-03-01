import React, { useState } from "react";
import getData from "../services/api";
import Results from "../components/Results";
import Input from "../components/Input";
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
      setError("An error Occured while Fetching Data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Input
        value={playlist_id}
        handleSearch={handleSearch}
        loading={loading}
        error={error}
        onChange={(e) => setPlayListId(e.target.value)}
      />
      {playListDetails && <Results playListDetails={playListDetails} ></Results>}
    </div>
  );
};

export default Home;
