import { describe, expect, it } from "@jest/globals";

import { addResult, topResults, type Result } from "./leaderboard.js";

const result = (fields: Partial<Result> = {}): Result => ({
  attempts: 4,
  elapsedMs: 5000,
  length: 4,
  base: 10,
  playedAt: "2026-11-10",
  ...fields,
});

describe("addResult", () => {
  it("appends a result without changing the previous list", () => {
    const stored = [result({ attempts: 3 })];
    const next = addResult(stored, result({ attempts: 5 }));

    expect(next).toEqual([result({ attempts: 3 }), result({ attempts: 5 })]);
    expect(stored).toEqual([result({ attempts: 3 })]);
    expect(next).not.toBe(stored);
  });
});

describe("topResults", () => {
  it("ranks fewer attempts, then less time, then an earlier date", () => {
    const ranked = topResults([
      result({ attempts: 5, elapsedMs: 1000, playedAt: "2026-01-03" }),
      result({ attempts: 3, elapsedMs: 9000, playedAt: "2026-01-04" }),
      result({ attempts: 4, elapsedMs: 8000, playedAt: "2026-01-02" }),
      result({ attempts: 4, elapsedMs: 2000, playedAt: "2026-02-01" }),
      result({ attempts: 4, elapsedMs: 2000, playedAt: "2026-01-01" }),
    ]);

    expect(ranked.map((item) => item.playedAt)).toEqual([
      "2026-01-04",
      "2026-01-01",
      "2026-02-01",
      "2026-01-02",
      "2026-01-03",
    ]);
  });

  it("returns a new list and leaves the input order untouched", () => {
    const stored = [
      result({ attempts: 8, playedAt: "2026-01-02" }),
      result({ attempts: 2, playedAt: "2026-01-01" }),
    ];
    const ranked = topResults(stored);

    expect(ranked.map((item) => item.attempts)).toEqual([2, 8]);
    expect(stored.map((item) => item.attempts)).toEqual([8, 2]);
    expect(ranked).not.toBe(stored);
  });

  it("keeps the first 10 results unless a limit is passed", () => {
    const stored = Array.from({ length: 12 }, (_, index) =>
      result({ attempts: 12 - index, playedAt: `2026-01-${index + 1}` }),
    );

    expect(topResults(stored).map((item) => item.attempts)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(topResults(stored, 2).map((item) => item.attempts)).toEqual([1, 2]);
  });
});
