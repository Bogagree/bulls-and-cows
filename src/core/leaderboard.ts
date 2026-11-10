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
  throw new Error(`not implemented: ${results.length}, ${result.attempts}`);
}

export function topResults(results: readonly Result[], limit = 10): Result[] {
  throw new Error(`not implemented: ${results.length}, ${limit}`);
}
