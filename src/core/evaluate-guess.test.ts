import { describe, expect, it } from "@jest/globals";

import { evaluateGuess } from "./evaluate-guess.js";

describe("evaluateGuess", () => {
  it.each([
    ["1234", "1234", 4, 0],
    ["1234", "4321", 0, 4],
    ["1234", "1243", 2, 2],
    ["1234", "5678", 0, 0],
    ["0123", "0132", 2, 2],
    ["ab", "ba", 0, 2],
    ["a1b2", "A1B2", 4, 0],
    ["a1b2", "b1a2", 2, 2],
  ] as const)(
    "secret %j guess %j is %s bulls and %s cows",
    (secret, guess, bulls, cows) => {
      expect(evaluateGuess(secret, guess)).toEqual({ bulls, cows });
    },
  );
});
