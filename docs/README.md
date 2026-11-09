# Docs — Spec-Driven Development

Bulls and Cows ведётся по **SDD**, как [memory-game](https://github.com/Bogagree/memory-game/tree/memory-game): требования и решения живут в репозитории и обновляются вместе с кодом.

## Карта

| Файл / папка | Назначение |
| --- | --- |
| [decisions.md](./decisions.md) | Закрытые решения (`Accepted`) |
| [specs/](./specs/) | Спеки продукта и шагов |
| [conventions/](./conventions/) | Код, git, PR |
| [implementation-plan.md](./implementation-plan.md) | Общий порядок работ |
| [plan.md](./plan.md) | Чеклист шагов |
| [Скилл следующего шага](../.cursor/skills/bulls-and-cows-next-step/SKILL.md) | Запускает пункт из `## Next` |
| [qa/](./qa/) | Отчёты проверки шагов с интерфейсом |
| [submit-checklist.md](./submit-checklist.md) | Сдача cross-check |

## Как работать

1. **Задача** — короткая сессия, одна ветка от `bulls-and-cows`.
2. **Перед кодом** — спека этого шага и `decisions.md`.
3. **Решение принято** — `Accepted` в `decisions.md` (дата и короткое «почему»).
4. **Поведение изменилось** — обновить спеку в том же PR, что и код.
5. **Задача закрыта** — итог в спеке, decision или PR. Длинный чат дальше не тащить.

## Источники

Канон баллов и сдачи — у RS School. Локальные спеки фиксируют наши договорённости.

- [Bulls and Cows](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/bulls-and-cows/README.md)
- [Git convention](https://rs.school/docs/git-convention)
- [PR requirements](https://rs.school/docs/mentoring/pull-request-review-process#pull-request-requirements-pr)

Чужие решения смотрели как ориентир границ, не как код для переноса:

- [snischuk/bulls-and-cows](https://github.com/snischuk/bulls-and-cows/tree/bulls-and-cows) — много экранов, Vite, темы и переводы. Это больше скоупа.
- [kravchuk-st/bulls-and-cows](https://github.com/kravchuk-st/bulls-and-cows/tree/bulls-and-cows) — ближе по размеру: `tsc`, Vitest, ядро отдельно от UI.

См. [D-002](./decisions.md) и [D-009](./decisions.md).
