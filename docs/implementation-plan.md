# Bulls and Cows — план реализации (общий)

Шаги — в [plan.md](./plan.md). Требования и решения — в SDD-доках, здесь не дублируем.

## SDD (читать сначала)

| Артефакт | Путь |
| --- | --- |
| Как ведём проект | [docs/README.md](./README.md) |
| Закрытые решения | [decisions.md](./decisions.md) |
| Спеки | [specs/](./specs/) |
| Конвенции | [conventions/](./conventions/) |

Курс (баллы, сдача): ссылки в [docs/README.md](./README.md).

## План

| План шагов | Спека | Ветка |
| --- | --- | --- |
| [plan.md](./plan.md) | [specs/overview.md](./specs/overview.md) | `bulls-and-cows` |

## Как пользоваться

1. Следующий шаг запускает скилл `.cursor/skills/bulls-and-cows-next-step/SKILL.md` (фраза: «следующий шаг»). Он читает блок **`## Next`** в [plan.md](./plan.md), спеку шага и **decisions**.
2. Шаги сверху вниз. Один шаг = одна ветка = один короткий контекст чата.
3. Для пяти обязательных функций ядра один шаг — это два коммита в одной ветке: сначала падающие тесты, потом реализация. Пушить только когда `npm test` зелёный. См. [conventions/git.md](./conventions/git.md).
4. После merge шага в `bulls-and-cows` — `[done]` и сдвиг `## Next`.
5. Не начинать соседний шаг, пока текущий `## Next` не закрыт.
6. Решение или смена поведения → `decisions.md` / спека в том же PR.

## Жёсткие ограничения

Делать: TypeScript во всём коде, чистые функции ядра, TDD-пары коммитов, пустой `<body>` кроме `script`, `document.createElement`, ESLint, Prettier, Husky, Vitest, `localStorage` только для рекордов, RS git convention.

Не делать: классы в игровой логике, `innerHTML` / `insertAdjacentHTML` / `DOMParser`, `alert` / `confirm` / `prompt`, lodash и другие библиотеки игровой логики, бэкенд, бандлер приложения, тесты в `pre-commit`, merge PR `bulls-and-cows` → `main`.
