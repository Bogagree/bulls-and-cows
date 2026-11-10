import { startRound, type Round, type Settings } from "./core/game-state.js";
import { el } from "./dom.js";
import { createRoundScreen } from "./ui/game-screen.js";
import { createSettingsScreen } from "./ui/settings-screen.js";

const BASE_LABEL: Record<number, string> = {
  2: "двоичная",
  8: "восьмеричная",
  10: "десятичная",
  16: "шестнадцатеричная",
};

let round: Round | null = null;
const roundSlot = el("div", { className: "round-slot" });

const settings = createSettingsScreen((chosen: Settings) => {
  round = startRound(chosen, Math.random, Date.now());
  const label = BASE_LABEL[round.base] ?? "";

  roundSlot.replaceChildren(
    createRoundScreen(round, `${round.length} · ${label}`),
  );
});

const screen = el("main", {
  className: "app",
  children: [
    el("header", {
      className: "app__header",
      children: [
        el("h1", { className: "app__title", text: "Быки и коровы" }),
        el("button", {
          className: "app__new-game",
          text: "Новая игра",
          attrs: { type: "button" },
        }),
      ],
    }),
    settings,
    roundSlot,
    el("section", {
      className: "records",
      children: [
        el("h2", { className: "records__title", text: "Рекорды" }),
        el("p", { className: "records__empty", text: "Пока нет результатов" }),
      ],
    }),
  ],
});

document.body.append(screen);
