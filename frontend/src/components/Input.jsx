import SpeedButton from "./ui/SpeedButton";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function Input({
  value,
  onChange,
  onSearch,
  loading,
  error,
  speed,
  onSpeedChange,
  excludeShorts,
  onToggleShorts,
  skipWatched,
  onToggleWatched,
}) {
  return (
    <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
      {/* URL input */}
      <div>
        <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
          Load Playlist
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && onSearch(e)}
            placeholder="Paste YouTube playlist URL"
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-red-400 dark:focus:border-red-600 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900/30 transition-all"
          />
          <button
            onClick={onSearch}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 active:scale-95 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            {loading ? "Loading" : "Load"}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>

      {/* Filter toggles */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "shorts",  label: "Exclude Shorts", state: excludeShorts, toggle: onToggleShorts },
          { key: "watched", label: "Skip Watched",   state: skipWatched,   toggle: onToggleWatched },
        ].map(({ key, label, state, toggle }) => (
          <button
            key={key}
            onClick={toggle}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer
              ${state
                ? "bg-red-50 border-red-300 text-red-600 dark:bg-red-950/50 dark:border-red-700 dark:text-red-400"
                : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"}`}
          >
            <span className={`w-2 h-2 rounded-full transition-colors ${state ? "bg-red-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
            {label}
          </button>
        ))}
      </div>

      {/* Speed selector */}
      <div>
        <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
          Playback Speed
        </label>
        <div className="flex flex-wrap gap-2">
          {SPEEDS.map((s) => (
            <SpeedButton key={s} value={s} active={speed === s} onClick={() => onSpeedChange(s)} />
          ))}
        </div>
      </div>
    </section>
  );
}
