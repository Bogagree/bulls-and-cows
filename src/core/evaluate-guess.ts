export type GuessScore = {
  bulls: number;
  cows: number;
};

export function evaluateGuess(secret: string, guess: string): GuessScore {
  const secretChars = secret.toLowerCase().split("");
  const guessChars = guess.toLowerCase().split("");

  const bulls = guessChars.filter(
    (char, index) => char === secretChars[index],
  ).length;

  const cows = guessChars.filter(
    (char, index) => char !== secretChars[index] && secretChars.includes(char),
  ).length;

  return { bulls, cows };
}
