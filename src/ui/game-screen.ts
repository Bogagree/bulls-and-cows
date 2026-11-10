import { createDigitValidator } from "../core/create-digit-validator.js";
import { applyGuess, type Round } from "../core/game-state.js";
import { isValidGuess } from "../core/is-valid-guess.js";
import { el } from "../dom.js";

export function createRoundScreen(
  initial: Round,
  modeLabel: string,
): HTMLElement {
  let round = initial;
  const isDigit = createDigitValidator(round.base);
  const input = el("input", {
    className: "guess-form__input",
    attrs: {
      id: "guess",
      type: "text",
      maxlength: String(round.length),
      autocomplete: "off",
      spellcheck: "false",
    },
  });
  const checkButton = el("button", {
    className: "guess-form__check",
    text: "Проверить",
    attrs: { type: "submit" },
  });
  const message = el("p", { className: "round__message" });
  const history = el("div", { className: "history" });

  checkButton.disabled = true;

  const renderHistory = (): void => {
    if (round.history.length === 0) {
      history.replaceChildren(
        el("p", { className: "history__empty", text: "Пока нет попыток" }),
      );
      return;
    }

    history.replaceChildren(
      el("ol", {
        className: "history__list",
        children: round.history.map((attempt) =>
          el("li", {
            className: "history__row",
            text: `${attempt.guess}: быки ${attempt.bulls}, коровы ${attempt.cows}`,
          }),
        ),
      }),
    );
  };

  const syncButton = (): void => {
    checkButton.disabled = !isValidGuess(input.value, round.length, round.base);
  };

  input.addEventListener("input", () => {
    input.value = [...input.value]
      .filter(isDigit)
      .join("")
      .slice(0, round.length);
    syncButton();
  });

  const submitGuess = (): void => {
    if (checkButton.disabled) {
      return;
    }

    const next = applyGuess(round, input.value, Date.now());

    if (next === round) {
      message.textContent = "Эта попытка уже была";
      return;
    }

    round = next;
    message.textContent = "";
    input.value = "";
    checkButton.disabled = true;
    renderHistory();
  };

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    submitGuess();
  });

  const form = el("form", {
    className: "guess-form",
    children: [
      el("label", {
        className: "guess-form__label",
        text: "Попытка",
        attrs: { for: "guess" },
      }),
      el("div", {
        className: "guess-form__row",
        children: [input, checkButton],
      }),
    ],
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitGuess();
  });

  renderHistory();

  return el("section", {
    className: "round",
    children: [
      el("p", { className: "round__mode", text: modeLabel }),
      message,
      form,
      history,
    ],
  });
}
