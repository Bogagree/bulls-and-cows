import { DIGITS } from "./create-digit-validator.js";

export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  const copy = DIGITS.slice(0, base).split("");

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const current = copy[i];

    copy[i] = copy[j];
    copy[j] = current;
  }

  return copy.slice(0, length).join("");
}
