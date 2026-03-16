import { useEffect, useRef, useState, useCallback } from "react";
import { fmtSeconds } from "../utils/format";

export default function VideoPlayerModal({
  video,
  playlist,
  speed,
  onClose,
  onMarkWatched,
  onNext,
  onPrev,
}) {
  if (!video) return null;

  const backdropRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const currentIndex = playlist.findIndex((v) => v.id === video.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < playlist.length - 1;
  const prevVideo = hasPrev ? playlist[currentIndex - 1] : null;
  const nextVideo = hasNext ? playlist[currentIndex + 1] : null;

  // YouTube iframe embed URL
  // autoplay=1, rel=0 hides related videos, modestbranding=1 minimises branding
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  // Close on Escape
  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 220);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") triggerClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    },
    [hasNext, hasPrev, onNext, onPrev, triggerClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Mark watched when modal opens
  useEffect(() => {
    if (!video.watched) {
      onMarkWatched(video.id);
    }
  }, [video.id]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) triggerClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      style={{ animation: isClosing ? "none" : "fadeInBackdrop 0.2s ease" }}
    >
      <div
        className={`relative w-full max-w-4xl transition-all duration-200 ${
          isClosing
            ? "opacity-0 scale-95 translate-y-2"
            : "opacity-100 scale-100 translate-y-0"
        }`}
        style={{
          animation: isClosing
            ? "none"
            : "slideUpModal 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 font-mono text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                {currentIndex + 1} / {playlist.length}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                  {video.title}
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {video.channel}
                  {video.duration && (
                    <span className="ml-2 font-mono">
                      {fmtSeconds(video.duration)}
                    </span>
                  )}
                  {speed !== 1 && (
                    <span className="ml-1 text-red-500 font-mono">
                      → {fmtSeconds(video.duration / speed)} at {speed}x
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={triggerClose}
              className="shrink-0 ml-3 w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              title="Close (Esc)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Video player — 16:9 */}
          <div
            className="relative w-full bg-black"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              key={video.id}
              src={embedUrl}
              title={video.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-between px-4 py-3 gap-3">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 min-w-0 max-w-[200px] ${
                hasPrev
                  ? "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                  : "bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 opacity-40 cursor-not-allowed"
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="truncate">
                {prevVideo ? prevVideo.title : "No previous"}
              </span>
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
                title="Open in YouTube"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                YouTube
              </a>
            </div>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 min-w-0 max-w-[200px] justify-end ${
                hasNext
                  ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/50"
                  : "bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 opacity-40 cursor-not-allowed"
              }`}
            >
              <span className="truncate">
                {nextVideo ? nextVideo.title : "End of queue"}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="h-0.5 bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / playlist.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <p className="text-center text-[11px] text-zinc-400 mt-3 opacity-70">
          Left/Right arrows to navigate · Esc to close
        </p>
      </div>

      <style>{`
        @keyframes fadeInBackdrop { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUpModal { from { opacity:0; transform: scale(0.96) translateY(12px) } to { opacity:1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}
