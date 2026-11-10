import type { Result } from "./core/leaderboard.js";

export const RESULTS_KEY = "bulls-and-cows-results";

function isResult(value: unknown): value is Result {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.attempts === "number" &&
    typeof record.elapsedMs === "number" &&
    typeof record.length === "number" &&
    typeof record.base === "number" &&
    typeof record.playedAt === "string"
  );
}

export function loadResults(storage: Pick<Storage, "getItem">): Result[] {
  const raw = storage.getItem(RESULTS_KEY);

  if (raw === null) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed) || !parsed.every(isResult)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function saveResults(
  storage: Pick<Storage, "setItem">,
  results: readonly Result[],
): void {
  storage.setItem(RESULTS_KEY, JSON.stringify(results));
}
