import { describe, expect, it } from "@jest/globals";

import { DIGITS } from "./create-digit-validator.js";
import { generateSecret } from "./generate-secret.js";

describe("generateSecret", () => {
  it.each([
    [4, 10, 0, "1234"],
    [2, 2, 0, "10"],
    [4, 10, 0.999, "0123"],
  ] as const)(
    "length %s base %s random %s is %j",
    (length, base, randomValue, expected) => {
      expect(generateSecret(length, base, () => randomValue)).toBe(expected);
    },
  );

  it("returns a string of the requested length when random is 0", () => {
    expect(generateSecret(4, 10, () => 0)).toHaveLength(4);
  });

  it("returns unique digits from the base alphabet when random is 0", () => {
    const secret = generateSecret(4, 10, () => 0);
    const alphabet = DIGITS.slice(0, 10);

    expect([...secret]).toEqual([...new Set(secret)]);
    expect([...secret].every((char) => alphabet.includes(char))).toBe(true);
  });

  it("calls random base - 1 times for base 10", () => {
    let calls = 0;
    const random = () => {
      calls += 1;
      return 0;
    };

    generateSecret(4, 10, random);

    expect(calls).toBe(9);
  });
});
