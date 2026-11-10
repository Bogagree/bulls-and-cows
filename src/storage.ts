import type { Result } from "./core/leaderboard.js";

export const RESULTS_KEY = "bulls-and-cows-results";

export function loadResults(storage: Pick<Storage, "getItem">): Result[] {
  throw new Error(`not implemented: ${typeof storage.getItem}`);
}

export function saveResults(
  storage: Pick<Storage, "setItem">,
  results: readonly Result[],
): void {
  throw new Error(`not implemented: ${results.length}`);
}
