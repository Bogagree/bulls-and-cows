export type Result = {
  attempts: number;
  elapsedMs: number;
  length: number;
  base: number;
  playedAt: string;
};

export function addResult(
  results: readonly Result[],
  result: Result,
): Result[] {
  return [...results, result];
}

export function topResults(results: readonly Result[], limit = 10): Result[] {
  return [...results]
    .sort((left, right) => {
      if (left.attempts !== right.attempts) {
        return left.attempts - right.attempts;
      }

      if (left.elapsedMs !== right.elapsedMs) {
        return left.elapsedMs - right.elapsedMs;
      }

      if (left.playedAt < right.playedAt) {
        return -1;
      }

      if (left.playedAt > right.playedAt) {
        return 1;
      }

      return 0;
    })
    .slice(0, limit);
}
