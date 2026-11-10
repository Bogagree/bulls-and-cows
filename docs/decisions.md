# Decisions

Закрытые решения. `Accepted` = факт для агента, не «обсуждали в чате».

Формат:

```md
## D-NNN: Короткий заголовок

- Status: Accepted
- Date: YYYY-MM-DD
- Почему: одно предложение

Текст решения.
```

---

## D-001: Репозиторий и ветки по требованиям курса

- Status: Accepted
- Date: 2026-11-09
- Почему: задание отдельно описывает пустой `main` и несданный PR в него

Репозиторий `Bogagree/bulls-and-cows`.

```text
main
 └── bulls-and-cows     ← приложение; PR #1 → main, НЕ мержить
```

На `main` остаётся уже существующий `readme.md`. Спеки, инструменты и игра коммитятся в `bulls-and-cows`. От шага `chore/tooling` отдельные feature-ветки не открываются: см. [D-011](#d-011-один-pr-и-коммит-после-одобрения).

Задание просит приватный репозиторий. Сейчас репозиторий публичный. Видимость не менять в середине шага: перед сдачей проверить, что GitHub Pages открывается с выбранной видимостью, и если приватность ломает бесплатный Pages, зафиксировать новый decision, а не переключать видимость молча.

---

## D-002: Стек — TypeScript, tsc, Jest, без бандлера страницы

- Status: Accepted
- Date: 2026-11-09
- Почему: задание требует TypeScript и считает бандлер необязательным, а примеры расходятся в объёме обвязки

- TypeScript для ядра и UI. Сборка приложения — `tsc` в ES-модули, каталог `dist/`. `dist/` в `.gitignore`.
- Тесты — Jest. Команда и конфиг: [D-012](#d-012-тесты--jest).
- ESLint (flat config) + Prettier + `eslint-config-prettier`. Скрипты `lint` и `format`.
- Husky: `pre-commit` запускает только `lint-staged`; `pre-push` запускает `npm test`. Commitlint не ставим.
- Страницу в браузере открывать через статический сервер после `npm run build`. Для локальной проверки хватает `npx serve`, отдельный dev-сервер в зависимости не добавлять.
- Не переносить из примеров: Vite и ui-kit из [snischuk/bulls-and-cows](https://github.com/snischuk/bulls-and-cows/tree/bulls-and-cows), темы, переводы, `commit-msg`. У [kravchuk-st/bulls-and-cows](https://github.com/kravchuk-st/bulls-and-cows/tree/bulls-and-cows) берём только границу «ядро / экран / tsc», не файлы. Раннер у них Vitest; у нас Jest, см. [D-012](#d-012-тесты--jest).

---

## D-003: Документация плана и SDD в репозитории

- Status: Accepted
- Date: 2026-11-09
- Почему: как в memory-game — знания переживают чаты

Держим `docs/` (спеки, decisions, conventions, план) и обновляем вместе с кодом. `DESIGN.md` в корне появляется только на шаге `docs/design`.

---

## D-004: Структура исходников — ядро без DOM, экраны функциями

- Status: Accepted
- Date: 2026-11-09
- Почему: логика должна тестироваться без браузера, а UI остаётся тонкой сборкой

```text
index.html                 → пустой body + <script type="module">
css/base.css               → токены
css/components.css         → экраны
src/main.ts                → сборка экрана и связь модулей
src/dom.ts                 → el()
src/storage.ts             → localStorage за портом Storage
src/ui/settings-screen.ts
src/ui/game-screen.ts
src/ui/leaderboard-view.ts
src/core/create-digit-validator.ts
src/core/is-valid-guess.ts
src/core/evaluate-guess.ts
src/core/generate-secret.ts
src/core/count-possible-secrets.ts
src/core/game-state.ts
src/core/leaderboard.ts
src/core/format-duration.ts
src/core/*.test.ts         → рядом с модулем, tsc их не эмитит
```

Импорты в TS пишутся с расширением `.js`, чтобы собранные ES-модули открывались в браузере. Детали границ: [specs/architecture.md](./specs/architecture.md).

---

## D-005: CSS — BEM и custom properties

- Status: Accepted
- Date: 2026-11-09
- Почему: предсказуемые классы без фреймворка, как в memory-game

Классы вида `settings__length`, `guess-form__input`, `history__row`. Цвета и отступы — custom properties в `css/base.css`. Без Bootstrap и CSS-фреймворков. Экран читается на ширине 360px и на обычном окне.

---

## D-006: Деплой — GitHub Pages из собранного артефакта

- Status: Accepted
- Date: 2026-11-09
- Почему: ревьюер открывает публичный URL, а `dist/` не хранится в git

На шаге `feat/readme-deploy` workflow пушит в Pages результат `npm ci`, `npm test`, `npm run build`. В артефакт входят `index.html`, `dist/` и `css/`.

Ссылки в `index.html` относительные (`./dist/main.js`, `./css/base.css`), чтобы страница открывалась и с `https://bogagree.github.io/bulls-and-cows/`.

Ожидаемый URL: `https://bogagree.github.io/bulls-and-cows/`.

---

## D-007: Правила раунда

- Status: Accepted
- Date: 2026-11-09
- Почему: задание оставляет представление секрета, повтор попытки и форму таблицы на наш выбор

- Секрет и попытка — строки в нижнем регистре. Лидирующие нули сохраняются (`0123`).
- Системы: bin 2, oct 8, dec 10, hex 16. Длина 2–6 и не больше основания. У двоичной доступна только длина 2.
- Старт по умолчанию на экране настроек: десятичная система, длина 4.
- Алфавит один: `0123456789abcdef`. `createDigitValidator` — единственная проверка символа.
- `generateSecret` тасует алфавит Фишера–Йейтса в новом массиве и берёт первые `length` символов. Источник случайности — аргумент, по умолчанию `Math.random`. Контракт тасовки: [specs/core.md](./specs/core.md).
- Повтор уже сыгранной попытки (без учёта регистра) не добавляет запись. Неверная по длине или алфавиту попытка тоже не добавляет запись.
- Победа, когда `bulls === length`. Число попыток — длина истории. Время — `finishedAt - startedAt` в миллисекундах. Часы в ядро передаются аргументом `now`.
- Незаконченный раунд в рекорды не пишется. Текущий секрет в `localStorage` не кладётся: после перезагрузки игрок снова на настройках, таблица на месте.
- Одна общая таблица, не отдельная на каждую пару длина/основание. У записи виден бейдж настроек. На экране топ-10. В хранилище остаётся вся история результатов.

---

## D-008: Тексты интерфейса — русские

- Status: Accepted
- Date: 2026-11-09
- Почему: формулировки задания и чеклист на русском

`lang="ru"`. Кнопки: «Начать игру», «Проверить», «Новая игра». Пустая история: «Пока нет попыток». Пустые рекорды: «Пока нет результатов». Повтор: «Эта попытка уже была». Победа: «Вы угадали». Полный список строк: [specs/ui.md](./specs/ui.md).

---

## D-009: Игровая логика — функции, чужой UI не копировать

- Status: Accepted
- Date: 2026-11-09
- Почему: классы и библиотеки логики прямо запрещены заданием и стоят баллов

- В `src/core` нет классов, `document`, `window`, `localStorage`.
- Локальная копия массива внутри Фишера–Йейтса допустима. История попыток и объекты состояния — нет: только новый объект и новый массив.
- Динамическая разметка — через `document.createElement` / `el()`. Запрещены присваивания `innerHTML` и `outerHTML`, `insertAdjacentHTML`, `document.write`, `DOMParser`, `Range.createContextualFragment`.
- Запрещены `alert`, `confirm`, `prompt`.
- Запрещены lodash и любые пакеты, которые реализуют каррирование, мемоизацию или правила игры.
- Модалку не делаем: рекорды — секция страницы. Задание модалку не требует.

---

## D-010: TDD-пары и хуки

- Status: Accepted
- Date: 2026-11-09
- Почему: порядок «тесты, потом реализация» проверяется по коммитам, а `pre-push` не даёт запушить красный набор

Для `createDigitValidator`, `isValidGuess`, `evaluateGuess`, `generateSecret`, `countPossibleSecrets` в истории ветки есть коммит `test:` со заглушкой и падающими тестами и более поздний коммит `feat:` с реализацией. Коммит `feat:` эти тесты не переписывает.

`feat/game-state` и `feat/leaderboard-core` идут тем же порядком, хотя в чеклисте курса отдельных баллов за их коммиты нет.

`pre-commit` тесты не запускает, иначе красный коммит нельзя создать. Push шага один, после зелёного коммита, в ветку `bulls-and-cows`.

---

## D-011: Один PR и коммит после одобрения

- Status: Accepted
- Date: 2026-11-09
- Почему: сдача идёт одним PR в `main`, а коммиты в его ветку не должны появляться без явного согласия

Все шаги после `docs/sdd-skeleton` коммитятся в `bulls-and-cows`. Эта ветка — [PR #1](https://github.com/Bogagree/bulls-and-cows/pull/1). Отдельный PR на пункт плана не открывать и не мержить.

`git commit` и `git push` делать только после явного одобрения в текущем чате. До одобрения изменение остаётся в рабочей копии.

---

## D-012: Тесты — Jest

- Status: Accepted
- Date: 2026-11-09
- Почему: курс разрешает Jest или Vitest, для этого репозитория выбран Jest

Заменяет раннер из [D-002](#d-002-стек--typescript-tsc-jest-без-бандлера-страницы).

- Пакет `jest`. Vitest и `vitest.config.ts` не используем.
- `npm test` запускает `node --experimental-vm-modules ./node_modules/jest/bin/jest.js --passWithNoTests`. Пустой набор проходит.
- Конфиг `jest.config.js`: `testEnvironment` = `node`, `extensionsToTreatAsEsm` = `[".ts"]`, `transform` = `{}`. `moduleNameMapper` снимает суффикс `.js` у относительного импорта, чтобы резолвился соседний `.ts`. Типы снимает Node, `ts-jest` и `babel-jest` не подключаем.
- Файлы тестов — `*.test.ts` рядом с модулем. DOM-тестов нет.
