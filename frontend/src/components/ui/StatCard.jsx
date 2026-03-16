export default function StatCard({ label, value, sub, accent = false }) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-1 border transition-all
        ${accent
          ? "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800"
          : "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"}`}
    >
      <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
      <span
        className={`font-mono text-2xl font-bold leading-none
          ${accent ? "text-red-500" : "text-zinc-900 dark:text-zinc-100"}`}
      >
        {value}
      </span>
      {sub && (
        <span className="text-[11px] text-zinc-400 dark:text-zinc-600">{sub}</span>
      )}
    </div>
  );
}
