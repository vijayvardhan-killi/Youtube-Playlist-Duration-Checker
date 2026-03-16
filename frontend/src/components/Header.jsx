const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <path d="M10 8l6 4-6 4V8zm11-5H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

export default function Header({ count = 0 }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
            <PlayIcon />
          </div>
          <div>
            <h1 className="font-mono text-base font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">
              duration.calc
            </h1>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              YouTube playlist time calculator
            </p>
          </div>
        </div>
        <span className="text-xs bg-red-50 dark:bg-red-950/50 text-red-500 border border-red-200 dark:border-red-800 px-2.5 py-1 rounded-full font-semibold">
          {count} videos
        </span>
      </div>
    </header>
  );
}
