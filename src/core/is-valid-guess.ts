import { createDigitValidator } from "./create-digit-validator.js";

export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  if (guess.length !== length) {
    return false;
  }

  const isDigit = createDigitValidator(base);
  const chars = [...guess.toLowerCase()];
  const everyCharIsDigit = chars.every(isDigit);
  const charsAreUnique = new Set(chars).size === chars.length;

  return everyCharIsDigit && charsAreUnique;
}
