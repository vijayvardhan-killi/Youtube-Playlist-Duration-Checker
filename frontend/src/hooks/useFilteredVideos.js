import { useMemo } from "react";

export function useFilteredVideos(
  videos,
  excludeShorts,
  skipWatched,
  sortMode
) {
  return useMemo(() => {
    let list = [...videos];

    if (excludeShorts) list = list.filter((v) => !v.isShort);
    if (skipWatched) list = list.filter((v) => !v.watched);

    if (sortMode === "asc") list.sort((a, b) => a.duration - b.duration);

    if (sortMode === "desc") list.sort((a, b) => b.duration - a.duration);

    return list;
  }, [videos, excludeShorts, skipWatched, sortMode]);
}
