import { el } from "./dom.js";

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
