export function extractVideoId(input) {
  const patterns = [
    /(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ];

  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }

  return null;
}
