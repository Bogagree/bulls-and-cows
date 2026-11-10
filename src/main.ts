import { addResult, type Result } from "./core/leaderboard.js";
import { startRound, type Round, type Settings } from "./core/game-state.js";
import { el } from "./dom.js";
import { loadResults, saveResults } from "./storage.js";
import { createRoundScreen } from "./ui/game-screen.js";
import { createRecordsScreen } from "./ui/records-screen.js";
import { createSettingsScreen } from "./ui/settings-screen.js";

const BASE_LABEL: Record<number, string> = {
  2: "двоичная",
  8: "восьмеричная",
  10: "десятичная",
  16: "шестнадцатеричная",
};

let round: Round | null = null;
let stopRound = (): void => {};
let results = loadResults(localStorage);
const roundSlot = el("div", { className: "round-slot" });
const records = createRecordsScreen(results);

const rememberWin = (won: Round): void => {
  if (won.finishedAt === null) {
    return;
  }

  const result: Result = {
    attempts: won.history.length,
    elapsedMs: won.finishedAt - won.startedAt,
    length: won.length,
    base: won.base,
    playedAt: new Date(won.finishedAt).toISOString(),
  };

  results = addResult(results, result);
  saveResults(localStorage, results);
  records.show(results);
};

const settings = createSettingsScreen((chosen: Settings) => {
  round = startRound(chosen, Math.random, Date.now());
  const label = BASE_LABEL[round.base] ?? "";

  const view = createRoundScreen(
    round,
    `${round.length} · ${label}`,
    rememberWin,
  );
  stopRound = view.stop;
  roundSlot.replaceChildren(view.element);
});

const newGame = el("button", {
  className: "app__new-game",
  text: "Новая игра",
  attrs: { type: "button" },
});

newGame.addEventListener("click", () => {
  stopRound();
  stopRound = () => {};
  round = null;
  roundSlot.replaceChildren();
  settings.unlock();
});

const screen = el("main", {
  className: "app",
  children: [
    el("header", {
      className: "app__header",
      children: [
        el("h1", { className: "app__title", text: "Быки и коровы" }),
        newGame,
      ],
    }),
    settings.element,
    roundSlot,
    records.element,
  ],
});

document.body.append(screen);
