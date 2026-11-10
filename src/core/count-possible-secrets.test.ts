import { describe, expect, it } from "@jest/globals";

import { countPossibleSecrets } from "./count-possible-secrets.js";

describe("countPossibleSecrets", () => {
  it.each([
    [4, 10, 5040],
    [2, 2, 2],
    [6, 16, 5765760],
    [6, 8, 20160],
    [1, 10, 10],
    [0, 10, 1],
    [3, 2, 0],
    [-1, 10, 0],
  ] as const)("length %s base %s is %s", (length, base, expected) => {
    expect(countPossibleSecrets(length, base)).toBe(expected);
  });

  it("returns the same number when called again with the same arguments", () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });
});
