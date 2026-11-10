import { describe, expect, it } from "@jest/globals";

import { createDigitValidator } from "./create-digit-validator.js";

describe("createDigitValidator", () => {
  it.each([
    [10, "7", true],
    [10, "a", false],
    [16, "a", true],
    [16, "A", true],
    [16, "g", false],
    [2, "0", true],
    [2, "2", false],
    [8, "7", true],
    [8, "8", false],
    [10, "7a", false],
    [10, "", false],
    [10, " ", false],
  ] as const)("base %s char %j is %s", (base, char, expected) => {
    expect(createDigitValidator(base)(char)).toBe(expected);
  });

  it("returns a predicate for one base", () => {
    const isHex = createDigitValidator(16);

    expect(isHex("F")).toBe(true);
  });
});
