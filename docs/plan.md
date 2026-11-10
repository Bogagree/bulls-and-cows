# Bulls and Cows — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).
Спека продукта: [specs/overview.md](./specs/overview.md).
Канон: [README задания](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/bulls-and-cows/README.md) (**150** баллов).

База: ветка `bulls-and-cows`, она же [PR #1](https://github.com/Bogagree/bulls-and-cows/pull/1) в `main`. Шаги коммитятся прямо сюда после одобрения. Отдельный PR на шаг не открывать. PR #1 не мержить.

`main` остаётся с текущим `readme.md`. Код, спеки и инструменты живут в `bulls-and-cows`.

---

## Next (для нового чата)

```text
feat/leaderboard
```

Победа уже в `bulls-and-cows`. Следующий запуск — запись результата и таблица рекордов.

---

## Шаги

Маркер `[done]` = влито в `bulls-and-cows`.
Маркер `[    ]` = ещё не влито.

Шаги `feat/digit-validator` … `feat/leaderboard-core` коммитятся парой `test:` → `feat:` и пушатся одним зелёным push. См. [conventions/git.md](./conventions/git.md).

```text
main
└── bulls-and-cows
    ├── [done] docs/sdd-skeleton         # эти docs, скилл, .gitignore
    ├── [done] chore/tooling             # TypeScript, ESLint, Prettier, Jest, tsc
    ├── [done] chore/husky               # pre-commit = lint-staged, pre-push = npm test
    ├── [done] feat/digit-validator      # createDigitValidator, красный затем зелёный
    ├── [done] feat/valid-guess          # isValidGuess через фабрику цифр
    ├── [done] feat/evaluate-guess       # evaluateGuess на filter
    ├── [done] feat/generate-secret      # generateSecret(random)
    ├── [done] feat/possible-secrets     # рекурсия + мемоизация
    ├── [done] feat/game-state           # иммутабельный раунд, повтор, победа
    ├── [done] feat/leaderboard-core     # сортировка топа и формат времени
    ├── [done] feat/app-shell            # пустой body, el(), каркас экрана
    ├── [done] feat/settings             # длина, система счисления, старт раунда
    ├── [done] feat/guess                # ввод, история bulls/cows, повтор
    ├── [done] feat/win                  # победа, попытки, замершее время
    ├── [    ] feat/leaderboard          # запись в localStorage и таблица
    ├── [    ] feat/new-game             # назад к настройкам без перезагрузки
    ├── [    ] docs/design               # DESIGN.md по уже написанному коду
    └── [    ] feat/readme-deploy        # запуск, Pages, текст сдаточного PR
```

| Шаг                     | Спека                                                            | Что закрывает                                           |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| `docs/sdd-skeleton`     | [docs/README.md](./README.md)                                    | знания в файлах, не в чате                              |
| `chore/tooling`         | [tooling.md](./specs/tooling.md)                                 | TypeScript 5, ESLint + Prettier 5, раннер 5             |
| `chore/husky`           | [tooling.md](./specs/tooling.md)                                 | pre-commit 3, pre-push 2                                |
| `feat/digit-validator`  | [core.md](./specs/core.md)                                       | TDD 5; фабрика для двух будущих мест                    |
| `feat/valid-guess`      | [core.md](./specs/core.md)                                       | TDD 5; первое использование фабрики                     |
| `feat/evaluate-guess`   | [core.md](./specs/core.md)                                       | TDD 5; методы массивов 10                               |
| `feat/generate-secret`  | [core.md](./specs/core.md)                                       | TDD 5; параметр `random` 10                             |
| `feat/possible-secrets` | [core.md](./specs/core.md)                                       | TDD 5; рекурсия и мемо 10                               |
| `feat/game-state`       | [state.md](./specs/state.md)                                     | чистые функции и иммутабельная история, часть из 10     |
| `feat/leaderboard-core` | [leaderboard.md](./specs/leaderboard.md)                         | правила топа без DOM                                    |
| `feat/app-shell`        | [ui.md](./specs/ui.md)                                           | пустой `body`, каркас                                   |
| `feat/settings`         | [ui.md](./specs/ui.md)                                           | настройки, блокировка, двоичная длина, 8                |
| `feat/guess`            | [ui.md](./specs/ui.md)                                           | фильтр ввода и история, 8; второе использование фабрики |
| `feat/win`              | [ui.md](./specs/ui.md)                                           | конец раунда, попытки и время, 6                        |
| `feat/leaderboard`      | [leaderboard.md](./specs/leaderboard.md), [ui.md](./specs/ui.md) | рекорды переживают перезагрузку, 6                      |
| `feat/new-game`         | [ui.md](./specs/ui.md)                                           | «Новая игра» без перезагрузки, 2                        |
| `docs/design`           | [design.md](./specs/design.md)                                   | `DESIGN.md`, 20                                         |
| `feat/readme-deploy`    | [submit-checklist.md](./submit-checklist.md)                     | деплой и схема PR, иначе штраф 50                       |

FIRST (5 баллов) — свойство всех тестов ядра, не отдельный шаг. Проверяется по [core.md](./specs/core.md) и [conventions/code.md](./conventions/code.md).

---

## Пока не делать

- Бэкенд, аккаунты, сетевые API
- Vite/Webpack как бандлер страницы
- Темы, i18n, ui-kit, модалки
- Классы в `src/core`
- `innerHTML`, `insertAdjacentHTML`, `DOMParser`, `alert` / `confirm` / `prompt`
- lodash и чужая мемоизация
- Хранение текущего секрета в `localStorage`
- Merge PR `bulls-and-cows` → `main`
- `DESIGN.md` до шага `docs/design`: файл описывает уже написанные функции
