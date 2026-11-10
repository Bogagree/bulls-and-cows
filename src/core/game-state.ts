import { evaluateGuess } from "./evaluate-guess.js";
import { generateSecret } from "./generate-secret.js";
import { isValidGuess } from "./is-valid-guess.js";

const ALLOWED_BASES: readonly number[] = [2, 8, 10, 16];

export type Settings = { length: number; base: number };

export type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};

export type Round = {
  length: number;
  base: number;
  secret: string;
  history: readonly Attempt[];
  status: "playing" | "won";
  startedAt: number;
  finishedAt: number | null;
};

export function isAllowedSettings(settings: Settings): boolean {
  const { length, base } = settings;

  return (
    ALLOWED_BASES.includes(base) &&
    Number.isInteger(length) &&
    length >= 2 &&
    length <= 6 &&
    length <= base
  );
}

export function startRound(
  settings: Settings,
  random: () => number,
  now: number,
): Round {
  return {
    length: settings.length,
    base: settings.base,
    secret: generateSecret(settings.length, settings.base, random),
    history: [],
    status: "playing",
    startedAt: now,
    finishedAt: null,
  };
}

export function applyGuess(round: Round, guess: string, now: number): Round {
  if (round.status === "won") {
    return round;
  }

  const normalized = guess.toLowerCase();

  if (
    !isValidGuess(normalized, round.length, round.base) ||
    round.history.some((attempt) => attempt.guess === normalized)
  ) {
    return round;
  }

  const score = evaluateGuess(round.secret, normalized);
  const won = score.bulls === round.length;

  return {
    ...round,
    history: [...round.history, { guess: normalized, ...score }],
    status: won ? "won" : round.status,
    finishedAt: won ? now : round.finishedAt,
  };
}
