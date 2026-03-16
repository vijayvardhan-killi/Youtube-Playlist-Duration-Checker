import { useMemo } from "react";

export function useVideoStats(videos, speed) {
  return useMemo(() => {
    const total = videos.reduce((a, v) => a + v.duration, 0);
    const adjusted = total / speed;

    const avg = videos.length ? Math.round(total / videos.length) : 0;

    const longest = videos.length
      ? Math.max(...videos.map((v) => v.duration))
      : 0;

    const shortest = videos.length
      ? Math.min(...videos.map((v) => v.duration))
      : 0;

    return {
      total,
      adjusted,
      avg,
      longest,
      shortest,
      count: videos.length,
    };
  }, [videos, speed]);
}
