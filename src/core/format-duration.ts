const pad = (value: number): string => String(value).padStart(2, "0");

export function formatDuration(elapsedMs: number): string {
  const totalSeconds = elapsedMs < 0 ? 0 : Math.floor(elapsedMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${minutes}:${pad(seconds)}`;
}
