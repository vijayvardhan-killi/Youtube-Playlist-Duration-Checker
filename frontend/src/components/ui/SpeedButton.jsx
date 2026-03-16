export default function SpeedButton({ value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold border transition-all cursor-pointer
        ${active
          ? "bg-red-500 text-white border-red-500 shadow-sm"
          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:text-zinc-200"}`}
    >
      {value}x
    </button>
  );
}
