import { describe, expect, it } from "@jest/globals";

import type { Result } from "./core/leaderboard.js";
import { RESULTS_KEY, loadResults, saveResults } from "./storage.js";

const result: Result = {
  attempts: 4,
  elapsedMs: 62000,
  length: 4,
  base: 10,
  playedAt: "2026-11-10",
};

const memoryStorage = () => {
  const items = new Map<string, string>();

  return {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => {
      items.set(key, value);
    },
  };
};

describe("loadResults", () => {
  it("returns an empty list when the key is missing", () => {
    expect(loadResults(memoryStorage())).toEqual([]);
  });

  it("returns an empty list when the stored value is not a result list", () => {
    const storage = memoryStorage();

    storage.setItem(RESULTS_KEY, "{");
    expect(loadResults(storage)).toEqual([]);

    storage.setItem(RESULTS_KEY, "{}");
    expect(loadResults(storage)).toEqual([]);

    storage.setItem(RESULTS_KEY, "[{}]");
    expect(loadResults(storage)).toEqual([]);
  });
});

describe("saveResults", () => {
  it("returns the same fields after a later load", () => {
    const storage = memoryStorage();

    saveResults(storage, [result]);

    expect(loadResults(storage)).toEqual([result]);
  });
});
