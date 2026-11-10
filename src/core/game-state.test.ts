import { describe, expect, it } from "@jest/globals";

import { applyGuess, isAllowedSettings, startRound } from "./game-state.js";

describe("isAllowedSettings", () => {
  it.each([
    [4, 10, true],
    [2, 2, true],
    [6, 16, true],
    [6, 8, true],
    [3, 2, false],
    [1, 10, false],
    [7, 10, false],
    [4, 7, false],
    [4.5, 10, false],
  ] as const)("length %s base %s is %s", (length, base, expected) => {
    expect(isAllowedSettings({ length, base })).toBe(expected);
  });
});

describe("startRound", () => {
  it("starts a playing round with the secret from random", () => {
    expect(startRound({ length: 4, base: 10 }, () => 0, 1000)).toEqual({
      length: 4,
      base: 10,
      secret: "1234",
      history: [],
      status: "playing",
      startedAt: 1000,
      finishedAt: null,
    });
  });
});

describe("applyGuess", () => {
  const start = () => startRound({ length: 4, base: 10 }, () => 0, 1000);

  it("appends one scored guess and keeps the round playing", () => {
    const round = start();
    const next = applyGuess(round, "1243", 1500);

    expect(next.history).toEqual([{ guess: "1243", bulls: 2, cows: 2 }]);
    expect(next.status).toBe("playing");
    expect(next.finishedAt).toBeNull();
    expect(round.history).toEqual([]);
    expect(next.history).not.toBe(round.history);
  });

  it("returns the same round when the guess was already played", () => {
    const round = applyGuess(start(), "1243", 1500);

    expect(applyGuess(round, "1243", 1600)).toBe(round);
  });

  it("returns the same round when the guess length is wrong", () => {
    const round = start();

    expect(applyGuess(round, "12", 1100)).toBe(round);
  });

  it("wins when the guess matches the secret", () => {
    const round = start();
    const won = applyGuess(round, "1234", 2000);

    expect(won.status).toBe("won");
    expect(won.finishedAt).toBe(2000);
    expect(won.history).toEqual([{ guess: "1234", bulls: 4, cows: 0 }]);
    expect(round.history).toEqual([]);
  });

  it("returns the same round after a win", () => {
    const won = applyGuess(start(), "1234", 2000);

    expect(applyGuess(won, "5678", 2100)).toBe(won);
  });

  it("records a miss and then a win as two attempts", () => {
    const round = start();
    const afterMiss = applyGuess(round, "5678", 1100);
    const won = applyGuess(afterMiss, "1234", 2000);

    expect(won.history).toEqual([
      { guess: "5678", bulls: 0, cows: 0 },
      { guess: "1234", bulls: 4, cows: 0 },
    ]);
    expect(won.status).toBe("won");
    expect(won.finishedAt).toBe(2000);
    expect(afterMiss.history).toHaveLength(1);
    expect(round.history).toEqual([]);
  });

  it("stores a hex guess in lower case and rejects the same guess", () => {
    const round = startRound({ length: 2, base: 16 }, () => 0, 500);
    const next = applyGuess(round, "AB", 600);

    expect(round.secret).not.toBe("ab");
    expect(next.status).toBe("playing");
    expect(next.history).toEqual([{ guess: "ab", bulls: 0, cows: 0 }]);
    expect(applyGuess(next, "ab", 700)).toBe(next);
  });
});
