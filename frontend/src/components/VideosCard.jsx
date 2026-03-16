import { fmtSeconds } from "../utils/format";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    className="w-3 h-3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function VideosCard({
  video,
  speed,
  onRemove,
  onToggleWatched,
  onPlay,
}) {
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50
        ${video.watched ? "opacity-50" : ""}`}
    >
      {/* Thumbnail */}
      <div
        onClick={() => onPlay?.(video)}
        className="relative flex-shrink-0 w-16 h-10 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
      >
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity text-white">
          <PlayIcon />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate leading-tight">
          {video.title}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
          {video.channel}
        </p>
      </div>

      {/* Duration */}
      <div className="flex-shrink-0 text-right hidden sm:block">
        <p className="font-mono text-sm font-bold text-zinc-800 dark:text-zinc-200">
          {fmtSeconds(video.duration)}
        </p>
        {speed !== 1 && (
          <p className="font-mono text-[11px] text-red-400 mt-0.5">
            {fmtSeconds(video.duration / speed)} @ {speed}x
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggleWatched(video.id)}
          title="Toggle watched"
          className={`p-1.5 rounded-md transition-all cursor-pointer
            ${
              video.watched
                ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                : "bg-zinc-100 text-zinc-400 hover:bg-green-100 hover:text-green-600 dark:bg-zinc-800 dark:hover:bg-green-900/40"
            }`}
        >
          <CheckIcon />
        </button>
        <button
          onClick={() => onRemove(video.id)}
          title="Remove"
          className="p-1.5 rounded-md bg-zinc-100 text-zinc-400 hover:bg-red-100 hover:text-red-500 dark:bg-zinc-800 dark:hover:bg-red-900/40 dark:hover:text-red-400 transition-all cursor-pointer"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
