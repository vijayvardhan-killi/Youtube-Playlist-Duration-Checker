import { useState, useMemo } from "react";
import { fmtSeconds, fmtHuman } from "../utils/format";
import StatCard from "./ui/StatCard";
import SearchAndSort from "./SearchAndSort";
import VideoListings from "./VideoListings";
import VideoPlayerModal from "./VideoPlayerModel";

// Icons
const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const DownloadIcon = () => (
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
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
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

function BreakdownBar({ label, value, max, display }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-400 dark:text-zinc-500 w-20 text-right flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 w-16 flex-shrink-0">
        {display}
      </span>
    </div>
  );
}

export default function Results({
  videos,
  speed,
  sortMode,
  setSortMode,
  excludeShorts,
  skipWatched,
  onRemove,
  onToggleWatched,
  onClearAll,
}) {
  const [activeTab, setActiveTab] = useState("queue");
  const [copied, setCopied] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = useMemo(() => {
    let list = [...videos];
    if (excludeShorts) list = list.filter((v) => !v.isShort);
    if (skipWatched) list = list.filter((v) => !v.watched);
    if (sortMode === "asc") list.sort((a, b) => a.duration - b.duration);
    if (sortMode === "desc") list.sort((a, b) => b.duration - a.duration);
    return list;
  }, [videos, excludeShorts, skipWatched, sortMode]);

  const stats = useMemo(() => {
    const total = filteredVideos.reduce((a, v) => a + v.duration, 0);
    const adjusted = total / speed;
    const avg = filteredVideos.length
      ? Math.round(total / filteredVideos.length)
      : 0;
    const longest = filteredVideos.length
      ? Math.max(...filteredVideos.map((v) => v.duration))
      : 0;
    const shortest = filteredVideos.length
      ? Math.min(...filteredVideos.map((v) => v.duration))
      : 0;
    return {
      total,
      adjusted,
      avg,
      longest,
      shortest,
      count: filteredVideos.length,
    };
  }, [filteredVideos, speed]);

  const handleCopy = () => {
    const text = `${stats.count} videos - Total: ${fmtHuman(
      stats.total
    )} - At ${speed}x: ${fmtHuman(stats.adjusted)}`;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const rows = [
      ["Title", "Channel", "Duration (s)", "Formatted", `At ${speed}x`],
      ...filteredVideos.map((v) => [
        `"${v.title}"`,
        v.channel,
        v.duration,
        fmtSeconds(v.duration),
        fmtSeconds(v.duration / speed),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "playlist-durations.csv";
    a.click();
  };

  const handleOpenPlayer = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handlePlayerPrev = () => {
    if (!selectedVideo) return;
    const index = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
    if (index > 0) {
      setSelectedVideo(filteredVideos[index - 1]);
    }
  };

  const handlePlayerNext = () => {
    if (!selectedVideo) return;
    const index = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
    if (index >= 0 && index < filteredVideos.length - 1) {
      setSelectedVideo(filteredVideos[index + 1]);
    }
  };

  const handleMarkWatched = (id) => {
    const video = videos.find((v) => v.id === id);
    if (video && !video.watched) {
      onToggleWatched(id);
    }
  };

  return (
    <div className="space-y-5">
      {/* Stats Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Time"
          value={fmtHuman(stats.total)}
          sub="at 1x speed"
          accent
        />
        <StatCard
          label={`At ${speed}x`}
          value={fmtHuman(stats.adjusted)}
          sub={`${speed}x playback`}
        />
        <StatCard label="Videos" value={stats.count} sub="in queue" />
        <StatCard
          label="Avg Length"
          value={stats.count ? fmtSeconds(stats.avg) : "�"}
          sub="per video"
        />
      </section>

      {/* Tabs */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-zinc-100 dark:border-zinc-800">
          {["queue", "breakdown"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold capitalize transition-all cursor-pointer
                ${
                  activeTab === tab
                    ? "text-red-500 border-b-2 border-red-500 bg-red-50/30 dark:bg-red-950/10"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
            >
              {tab === "queue" ? `Queue (${stats.count})` : "Breakdown"}
            </button>
          ))}
          {activeTab === "queue" && (
            <SearchAndSort sortMode={sortMode} setSortMode={setSortMode} />
          )}
        </div>

        {/* Queue tab */}
        {activeTab === "queue" && (
          <VideoListings
            videos={filteredVideos}
            speed={speed}
            onRemove={onRemove}
            onToggleWatched={onToggleWatched}
            onClearAll={onClearAll}
            total={stats.total}
            onPlay={handleOpenPlayer}
          />
        )}

        {/* Breakdown tab */}
        {activeTab === "breakdown" && (
          <div className="p-5 space-y-6">
            {stats.count === 0 ? (
              <p className="text-sm text-zinc-400 text-center py-8">
                Load a playlist to see the breakdown.
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Duration comparison
                  </p>
                  <BreakdownBar
                    label="At 1x"
                    value={stats.total}
                    max={Math.max(stats.total, stats.adjusted)}
                    display={fmtHuman(stats.total)}
                  />
                  <BreakdownBar
                    label={`At ${speed}x`}
                    value={stats.adjusted}
                    max={Math.max(stats.total, stats.adjusted)}
                    display={fmtHuman(stats.adjusted)}
                  />
                  <BreakdownBar
                    label="Longest"
                    value={stats.longest}
                    max={stats.total}
                    display={fmtSeconds(stats.longest)}
                  />
                  <BreakdownBar
                    label="Average"
                    value={stats.avg}
                    max={stats.total}
                    display={fmtSeconds(stats.avg)}
                  />
                  <BreakdownBar
                    label="Shortest"
                    value={stats.shortest}
                    max={stats.total}
                    display={fmtSeconds(stats.shortest)}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    Per-video share
                  </p>
                  <div className="space-y-2">
                    {filteredVideos.map((v) => (
                      <div key={v.id} className="flex items-center gap-3">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-40 flex-shrink-0">
                          {v.title.length > 32
                            ? v.title.slice(0, 32) + "..."
                            : v.title}
                        </p>
                        <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-400/70 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.round(
                                (v.duration / stats.total) * 100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 w-10 text-right flex-shrink-0">
                          {Math.round((v.duration / stats.total) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {speed > 1 && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      You save{" "}
                      <span className="font-mono font-bold">
                        {fmtHuman(stats.total - stats.adjusted)}
                      </span>{" "}
                      watching at {speed}x speed.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* Actions */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          {
            label: copied ? "Copied!" : "Copy Summary",
            icon: <CopyIcon />,
            onClick: handleCopy,
            accent: copied,
          },
          {
            label: "Export CSV",
            icon: <DownloadIcon />,
            onClick: handleExport,
          },
          {
            label: "Clear All",
            icon: <TrashIcon />,
            onClick: onClearAll,
            danger: true,
          },
        ].map(({ label, icon, onClick, accent, danger }) => (
          <button
            key={label}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all cursor-pointer
              ${
                accent
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-400"
                  : danger
                  ? "bg-white border-zinc-200 text-zinc-500 hover:bg-red-50 hover:border-red-300 hover:text-red-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-red-950/40 dark:hover:border-red-700"
                  : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
              }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </section>

      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          playlist={filteredVideos}
          speed={speed}
          onClose={handleClosePlayer}
          onMarkWatched={handleMarkWatched}
          onNext={handlePlayerNext}
          onPrev={handlePlayerPrev}
        />
      )}
    </div>
  );
}
