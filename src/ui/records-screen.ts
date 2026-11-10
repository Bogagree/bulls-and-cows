import { formatDuration } from "../core/format-duration.js";
import { topResults, type Result } from "../core/leaderboard.js";
import { el } from "../dom.js";

const BASE_LABEL: Record<number, string> = {
  2: "двоичная",
  8: "восьмеричная",
  10: "десятичная",
  16: "шестнадцатеричная",
};

const HEADERS = ["Место", "Попытки", "Время", "Условия"];

function conditions(result: Result): string {
  return `${result.length} · ${BASE_LABEL[result.base] ?? ""}`;
}

export function createRecordsScreen(initial: readonly Result[]): {
  element: HTMLElement;
  show: (results: readonly Result[]) => void;
} {
  const body = el("div", { className: "records__body" });
  const element = el("section", {
    className: "records",
    children: [
      el("h2", { className: "records__title", text: "Рекорды" }),
      body,
    ],
  });

  const show = (results: readonly Result[]): void => {
    const top = topResults(results);

    if (top.length === 0) {
      body.replaceChildren(
        el("p", { className: "records__empty", text: "Пока нет результатов" }),
      );
      return;
    }

    body.replaceChildren(
      el("table", {
        className: "records__table",
        children: [
          el("thead", {
            children: [
              el("tr", {
                children: HEADERS.map((label) => el("th", { text: label })),
              }),
            ],
          }),
          el("tbody", {
            children: top.map((result, index) =>
              el("tr", {
                children: [
                  el("td", { text: String(index + 1) }),
                  el("td", { text: String(result.attempts) }),
                  el("td", { text: formatDuration(result.elapsedMs) }),
                  el("td", { text: conditions(result) }),
                ],
              }),
            ),
          }),
        ],
      }),
    );
  };

  show(initial);

  return { element, show };
}
