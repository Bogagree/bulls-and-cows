# Architecture

Связано с [decisions.md](../decisions.md). Меняешь границы слоёв — обнови эту спеку и decision.

## Стек

- TypeScript, ESLint, Prettier, Jest, Husky ([D-002](../decisions.md), [D-012](../decisions.md))
- Сборка страницы: `tsc` → `dist/`. Бандлера нет.
- Деплой: GitHub Pages из артефакта workflow ([D-006](../decisions.md))

## Слои

```text
index.html
css/
  base.css
  components.css
src/
  dom.ts
  main.ts
  storage.ts
  ui/
    settings-screen.ts
    game-screen.ts
    leaderboard-view.ts
  core/
    create-digit-validator.ts
    is-valid-guess.ts
    evaluate-guess.ts
    generate-secret.ts
    count-possible-secrets.ts
    game-state.ts
    leaderboard.ts
    format-duration.ts
```

`index.html`: в `<head>` — charset, viewport, title «Быки и коровы», ссылки на CSS. В `<body>` — только `<script type="module" src="./dist/main.js"></script>`.

## Правила модулей

- `el(tag, { className, text, attrs, children })` вызывает `document.createElement`, ставит класс, `textContent`, атрибуты и детей через `append`. HTML-строку не принимает.
- Модули `src/core` не импортируют `src/ui`, `src/dom.ts`, `src/storage.ts`.
- `game-state.ts` вызывает `generateSecret`, `isValidGuess`, `evaluateGuess`. Часы и `random` приходят аргументами.
- `storage.ts` читает и пишет ключ `bulls-and-cows-results`. Ему передают объект с `getItem` / `setItem`. Глобальный `localStorage` подставляет только `main.ts`.
- `main.ts` создаёт экраны, на «Начать игру» вызывает `startRound`, на «Проверить» вызывает `applyGuess`, при переходе в `won` один раз дописывает рекорд, на «Новая игра» выбрасывает раунд из памяти и снова показывает настройки.

## Поток

```text
load → settings (length 4, dec) → countPossibleSecrets
start → startRound(settings, Math.random, Date.now) → settings disabled, game visible
input → createDigitValidator отсекает символ
submit → applyGuess
  same reference → статус «Эта попытка уже была»
  new history → строка bulls/cows
  status won → заморозить время, показать попытки, saveResults один раз
new game → снять таймер интервала, включить настройки, рекорды не трогать
reload → секрет забыт, рекорды прочитаны из localStorage
```

Контракты шагов лежат в спеках, на которые ссылается [plan.md](../plan.md). Этот файл не дублирует таблицы тестов.
