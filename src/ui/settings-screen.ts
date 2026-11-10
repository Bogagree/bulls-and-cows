import { countPossibleSecrets } from "../core/count-possible-secrets.js";
import { isAllowedSettings, type Settings } from "../core/game-state.js";
import { el } from "../dom.js";

const BASES = [
  { base: 2, label: "двоичная" },
  { base: 8, label: "восьмеричная" },
  { base: 10, label: "десятичная" },
  { base: 16, label: "шестнадцатеричная" },
] as const;

const LENGTHS = [2, 3, 4, 5, 6] as const;

const radio = (name: string, value: string): HTMLInputElement =>
  el("input", {
    attrs: { type: "radio", name, value },
  });

export function createSettingsScreen(
  onStart: (settings: Settings) => void,
): HTMLElement {
  const baseOptions = BASES.map((item) => {
    const input = radio("base", String(item.base));

    return {
      base: item.base,
      input,
      option: el("label", {
        className: "settings__option",
        children: [input, el("span", { text: item.label })],
      }),
    };
  });
  const lengthOptions = LENGTHS.map((length) => {
    const input = radio("length", String(length));

    return {
      length,
      input,
      option: el("label", {
        className: "settings__option",
        children: [input, el("span", { text: String(length) })],
      }),
    };
  });

  const decimal = baseOptions.find((item) => item.base === 10);
  const lengthFour = lengthOptions.find((item) => item.length === 4);
  if (decimal) decimal.input.checked = true;
  if (lengthFour) lengthFour.input.checked = true;

  const count = el("p", {
    className: "settings__count",
    text: "Возможных секретов: 5040",
  });
  const startButton = el("button", {
    className: "settings__start",
    text: "Начать игру",
    attrs: { type: "button" },
  });

  const selectedBase = (): number =>
    Number(baseOptions.find((item) => item.input.checked)?.base);

  const selectedLength = (): number =>
    Number(lengthOptions.find((item) => item.input.checked)?.length);

  const sync = (): void => {
    const base = selectedBase();

    if (base === 2) {
      const binaryLength = lengthOptions.find((item) => item.length === 2);
      if (binaryLength) binaryLength.input.checked = true;
    }

    for (const item of lengthOptions) {
      item.input.disabled = base === 2 && item.length !== 2;
    }

    count.textContent = `Возможных секретов: ${countPossibleSecrets(selectedLength(), base)}`;
  };

  for (const item of baseOptions) {
    item.input.addEventListener("change", sync);
  }

  for (const item of lengthOptions) {
    item.input.addEventListener("change", sync);
  }

  startButton.addEventListener("click", () => {
    const settings = { length: selectedLength(), base: selectedBase() };

    if (!isAllowedSettings(settings)) {
      return;
    }

    for (const item of [...baseOptions, ...lengthOptions]) {
      item.input.disabled = true;
    }
    startButton.disabled = true;
    onStart(settings);
  });

  return el("section", {
    className: "settings",
    children: [
      el("fieldset", {
        className: "settings__base",
        children: [
          el("legend", { text: "Система счисления" }),
          el("div", {
            className: "settings__options",
            children: baseOptions.map((item) => item.option),
          }),
        ],
      }),
      el("fieldset", {
        className: "settings__length",
        children: [
          el("legend", { text: "Длина" }),
          el("div", {
            className: "settings__options",
            children: lengthOptions.map((item) => item.option),
          }),
        ],
      }),
      count,
      startButton,
    ],
  });
}
