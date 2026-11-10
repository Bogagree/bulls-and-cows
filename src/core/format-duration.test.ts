import { describe, expect, it } from "@jest/globals";

import { formatDuration } from "./format-duration.js";

describe("formatDuration", () => {
  it.each([
    [0, "0:00"],
    [5000, "0:05"],
    [62000, "1:02"],
    [3599999, "59:59"],
    [3600000, "1:00:00"],
    [3661000, "1:01:01"],
    [-1, "0:00"],
  ] as const)("%s ms is %s", (elapsedMs, expected) => {
    expect(formatDuration(elapsedMs)).toBe(expected);
  });
});
