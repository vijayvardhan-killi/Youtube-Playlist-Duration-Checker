import { useState } from "react";
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
      const parsedUrl = new URL(playlist_id);
      const id = parsedUrl.searchParams.get("list");
      if (!id) {
        setError("Invalid Playlist URL");
        const error = new Error("Invalid Playlist URL");
        error.name = "InvalidPlaylistUrlError";
        throw error;
      }
      const data = await getData(id);
      if (data) {
        setplayListDetails(data);
      } else {
        setError("No Data Found");
      }
    } catch (err) {
      if (err.name === "InvalidPlaylistUrlError") {
        console.log(err)
        setError(err.message);
      } else {
        console.error("Error while fetching data:", err);
        setError("An error occurred while fetching data. Please try again.");
      }
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
