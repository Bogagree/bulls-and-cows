---
name: bulls-and-cows-next-step
description: >-
  Runs the next Bulls and Cows plan step from docs/plan.md: syncs
  bulls-and-cows, implements one step, and opens a PR into bulls-and-cows.
  Use when the user says следующий шаг, запусти следующий шаг, делай
  следующий шаг, or next step.
---

# Следующий шаг Bulls and Cows

Запусти шаг в этом чате. Не ограничивайся инструкцией, как его запустить.

Один запуск = один пункт `docs/plan.md`. PR шага только в `bulls-and-cows`. PR `bulls-and-cows` → `main` не создавать и не мержить.

## Какой шаг брать

1. `git fetch origin`, затем `git checkout bulls-and-cows` и `git pull`, если ветка уже есть на origin.
2. Прочитай блок `## Next` в `docs/plan.md`. Имя шага — текст внутри ограждения, например `feat/guess`.
3. Если шаг — `docs/sdd-skeleton`, смотри отдельный раздел ниже и на этом остановись.
4. Иначе `gh pr list --repo Bogagree/bulls-and-cows --base bulls-and-cows --head <имя> --state all`.
   - **OPEN** — остановись и дай URL. Следующий пункт не начинай.
   - **MERGED** — `## Next` устарел. Возьми первый пункт со статусом `[    ]`. В том же PR отметь слитый пункт `[done]` и запиши в `## Next` тот пункт, который делаешь.
   - **PR нет** — делай пункт из `## Next`.
5. Если пунктов `[    ]` не осталось, скажи, что план закрыт. Сдаточный PR не трогай.

`[done]` значит «влито в `bulls-and-cows`». Пункт, чей PR ты только открываешь, не помечай `[done]`.

## `docs/sdd-skeleton`

Файлы плана уже в рабочей копии. Игру, пакеты и `DESIGN.md` не добавлять.

1. Убедись, что ветка `bulls-and-cows` ответвлена от `main`, а в коммите `main` нет этих docs.
2. В `docs/plan.md` отметь `docs/sdd-skeleton` как `[done]`, в `## Next` запиши `chore/tooling`.
3. Один коммит на `bulls-and-cows`: `docs: add sdd plan for bulls and cows`.
4. Запушь `bulls-and-cows`. Feature-PR не открывай.

Коммит делай, потому что запуск этого шага и есть просьба его закрыть.

## Как делать обычный шаг

1. Прочитай спеку пункта из таблицы в `docs/plan.md`, плюс `docs/decisions.md` и `docs/conventions/code.md`. Для пары коммитов ещё раз прочитай `docs/conventions/git.md`.
2. Ветка `<имя из плана>` от свежей `bulls-and-cows`.
3. Сделай только контракт этого пункта. Соседний пункт не начинай.
4. Смена поведения — обнови спеку в том же PR.
5. Шаг с интерфейсом проверь в браузере кликами. Отчёт: `docs/qa/<имя без префикса>.md`. Шаг без экрана — без QA-файла.
6. Коммиты по [RS git convention](https://rs.school/docs/git-convention). На PowerShell сообщение передавай here-string:

   ```powershell
   git commit -m @"
   feat: short description

   "@
   ```

7. `git push -u origin HEAD` один раз в конце шага, когда `npm test` зелёный. После `chore/husky` красный push хук отклонит.
8. Перед `gh pr create` проверь, что в PR нет строки `Made with Cursor`. Ищи её в `git diff origin/bulls-and-cows...HEAD` и в тексте `--body` и `--title`. Если строка есть — убери, закоммить, запушь и проверь снова. Пока она находится, PR не создавай.
9. `gh pr create --base bulls-and-cows`. В теле: Summary, Test plan, ссылки на спеки и QA. Чеклист курса не заполняй.
10. Feature-PR не мержи.

## Пара тестов и реализации

Эти шаги пушатся одной зелёной веткой из двух коммитов, без squash:

- `feat/digit-validator`
- `feat/valid-guess`
- `feat/evaluate-guess`
- `feat/generate-secret`
- `feat/possible-secrets`
- `feat/game-state`
- `feat/leaderboard-core`

Порядок внутри ветки:

1. Коммит `test:` — тесты из спеки и заглушка модуля, импорт которой резолвится. Запусти `npm test` и убедись, что новые тесты падают. Не пушь.
2. Коммит `feat:` — реализация. Тесты этого модуля не меняй. `npm test` зелёный.
3. Только теперь push и PR.

Если красный коммит проверяет не контракт спеки, допиши исправление отдельным `test:` до `feat:`, пока ветка не на origin.

## Пример

`## Next` = `feat/digit-validator`, PR этого шага нет.

От `bulls-and-cows` создай `feat/digit-validator`. Сначала коммит `test: add failing tests for createDigitValidator`, затем `feat: implement createDigitValidator`. Открой PR в `bulls-and-cows`. В `docs/plan.md` этот пункт ещё `[    ]`.
