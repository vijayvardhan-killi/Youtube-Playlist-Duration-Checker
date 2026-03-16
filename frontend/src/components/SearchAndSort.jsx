export default function SearchAndSort({ sortMode, setSortMode }) {
  const options = [
    { key: "default", label: "Added" },
    { key: "asc",     label: "Short first" },
    { key: "desc",    label: "Long first" },
  ];

  return (
    <div className="flex items-center gap-1 px-4 border-l border-zinc-100 dark:border-zinc-800">
      <span className="text-[11px] text-zinc-400 mr-1 hidden sm:inline">Sort:</span>
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSortMode(key)}
          className={`text-[11px] px-2 py-1 rounded-md transition-all cursor-pointer
            ${sortMode === key
              ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold"
              : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
