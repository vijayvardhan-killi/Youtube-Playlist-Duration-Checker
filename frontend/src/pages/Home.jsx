import { useState, useCallback } from "react";
import getData from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Results from "../components/Results";

function extractIdFromThumb(url) {
  if (!url) return null;
  const m = url.match(/\/vi\/([A-Za-z0-9_-]{11})\//);
  return m ? m[1] : null;
}

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [speed, setSpeed] = useState(1);
  const [sortMode, setSortMode] = useState("default");
  const [excludeShorts, setExcludeShorts] = useState(false);
  const [skipWatched, setSkipWatched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const val = urlInput.trim();
      if (!val) return;

      setLoading(true);
      setError(null);

      try {
        let id;
        try {
          const parsed = new URL(val);
          id = parsed.searchParams.get("list");
        } catch {
          id = null;
        }

        if (!id) {
          setError(
            "Please paste a valid YouTube playlist URL (must contain ?list=...)"
          );
          return;
        }

        const data = await getData(id);
        if (!data || !data.video_details) {
          setError("No data returned. Check the playlist URL and try again.");
          return;
        }

        const mapped = data.video_details.map((v) => ({
          id: extractIdFromThumb(v.thumbnail) || v.title,
          title: v.title,
          channel: "YouTube",
          duration: v.seconds,
          views: "�",
          thumb: v.thumbnail,
          watched: false,
          isShort: false,
        }));

        setVideos(mapped);
        setUrlInput("");
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [urlInput]
  );

  const handleRemove = useCallback((id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const handleToggleWatched = useCallback((id) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, watched: !v.watched } : v))
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setVideos([]);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <Header count={videos.length} />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
          error={error}
          speed={speed}
          onSpeedChange={setSpeed}
          excludeShorts={excludeShorts}
          onToggleShorts={() => setExcludeShorts((v) => !v)}
          skipWatched={skipWatched}
          onToggleWatched={() => setSkipWatched((v) => !v)}
        />

        {videos.length > 0 && (
          <Results
            videos={videos}
            speed={speed}
            sortMode={sortMode}
            setSortMode={setSortMode}
            excludeShorts={excludeShorts}
            skipWatched={skipWatched}
            onRemove={handleRemove}
            onToggleWatched={handleToggleWatched}
            onClearAll={handleClearAll}
          />
        )}

        {videos.length === 0 && !loading && (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4 opacity-10 text-zinc-500">
              &#9654;
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              Paste a YouTube playlist URL above to get started.
            </p>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}
