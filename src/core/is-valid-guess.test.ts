import { describe, expect, it } from "@jest/globals";

import { isValidGuess } from "./is-valid-guess.js";

describe("isValidGuess", () => {
  it.each([
    ["1234", 4, 10, true],
    ["0123", 4, 10, true],
    ["123", 4, 10, false],
    ["12345", 4, 10, false],
    ["1123", 4, 10, false],
    ["12a4", 4, 10, false],
    ["10", 2, 2, true],
    ["12", 2, 2, false],
    ["ab", 2, 16, true],
    ["AB", 2, 16, true],
    ["aA", 2, 16, false],
    ["gg", 2, 16, false],
    ["", 2, 10, false],
  ] as const)(
    "guess %j length %s base %s is %s",
    (guess, length, base, expected) => {
      expect(isValidGuess(guess, length, base)).toBe(expected);
    },
  );
});
