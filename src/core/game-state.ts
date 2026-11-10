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
  throw new Error(`not implemented: ${settings.length}, ${settings.base}`);
}

export function startRound(
  settings: Settings,
  random: () => number,
  now: number,
): Round {
  throw new Error(
    `not implemented: ${settings.length}, ${settings.base}, ${random}, ${now}`,
  );
}

export function applyGuess(round: Round, guess: string, now: number): Round {
  throw new Error(`not implemented: ${guess}, ${now}, ${round.status}`);
}
