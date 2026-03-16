import { fmtHuman } from "../utils/format";
import VideosCard from "./VideosCard";

export default function VideoListings({
  videos,
  speed,
  onRemove,
  onToggleWatched,
  onClearAll,
  total,
  onPlay,
}) {
  if (videos.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-4xl mb-3 opacity-20 text-zinc-500">&#9654;</div>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          No videos match your filters.
        </p>
        <p className="text-xs mt-1 text-zinc-300 dark:text-zinc-600">
          Adjust the toggles above or load a playlist.
        </p>
      </div>
    );
  }

  return (
    <div>
      {videos.map((video) => (
        <VideosCard
          key={video.id}
          video={video}
          speed={speed}
          onRemove={onRemove}
          onToggleWatched={onToggleWatched}
          onPlay={onPlay}
        />
      ))}
      <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {videos.length} videos &middot; {fmtHuman(total)} total
        </span>
        <button
          onClick={onClearAll}
          className="text-xs text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
