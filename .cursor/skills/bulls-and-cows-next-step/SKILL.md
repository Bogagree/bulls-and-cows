---
name: bulls-and-cows-next-step
description: >-
  Runs the next Bulls and Cows plan step from docs/plan.md on branch
  bulls-and-cows, which is pull request 1. Does not open a pull request
  per step. Commits only after the user approves.
  Use when the user says следующий шаг, запусти следующий шаг, делай
  следующий шаг, or next step.
---

# Следующий шаг Bulls and Cows

Запусти шаг в этом чате. Не ограничивайся инструкцией, как его запустить.

Один запуск = один пункт `docs/plan.md`. Коммиты пункта идут в ветку `bulls-and-cows`. Эта ветка уже открыта как [PR #1](https://github.com/Bogagree/bulls-and-cows/pull/1) в `main`. Новый PR на шаг не создавать. PR #1 не мержить.

`git commit` и `git push` — только после явного одобрения пользователя в этом чате. До одобрения покажи diff и остановись.

## Какой шаг брать

1. `git fetch origin`, затем `git checkout bulls-and-cows` и `git pull`, если ветка уже есть на origin.
2. Прочитай блок `## Next` в `docs/plan.md`. Имя шага — текст внутри ограждения, например `feat/guess`.
3. Если шаг — `docs/sdd-skeleton`, он уже закрыт. Не повторяй его.
4. Делай пункт из `## Next` прямо на `bulls-and-cows`. Ветку с именем шага и отдельный PR не создавай.
5. Если пунктов `[    ]` не осталось, скажи, что план закрыт. PR #1 не мержи.

`[done]` значит «коммит шага есть в `bulls-and-cows`». Ставь `[done]` и сдвигай `## Next` только в коммите, который пользователь одобрил.

## Как делать обычный шаг

1. Прочитай спеку пункта из таблицы в `docs/plan.md`, плюс `docs/decisions.md` и `docs/conventions/code.md`. Для пары коммитов ещё раз прочитай `docs/conventions/git.md`.
2. Работай на свежей `bulls-and-cows`.
3. Сделай только контракт этого пункта. Соседний пункт не начинай.
4. Смена поведения — обнови спеку в том же коммите.
5. Шаг с интерфейсом проверь в браузере кликами. Отчёт: `docs/qa/<имя без префикса>.md`. Шаг без экрана — без QA-файла.
6. Коммиты по [RS git convention](https://rs.school/docs/git-convention). На PowerShell сообщение передавай here-string:

   ```powershell
   git commit -m @"
   feat: short description

   "@
   ```

7. После одобрения запушь `bulls-and-cows` один раз, когда `npm test` зелёный. После `chore/husky` красный push хук отклонит.
8. Перед push проверь, что в diff и в описании PR #1 нет строки `Made with Cursor`. Если она есть в описании — убери через `gh pr edit 1`. Пока строка находится, не пушь.
9. `gh pr create` не вызывай.

## Пара тестов и реализации

Эти шаги остаются на `bulls-and-cows` двумя коммитами, без squash и без отдельного PR:

- `feat/digit-validator`
- `feat/valid-guess`
- `feat/evaluate-guess`
- `feat/generate-secret`
- `feat/possible-secrets`
- `feat/game-state`
- `feat/leaderboard-core`

Порядок:

1. Коммит `test:` — тесты из спеки и заглушка модуля, импорт которой резолвится. Запусти `npm test` и убедись, что новые тесты падают. Не пушь.
2. Коммит `feat:` — реализация. Тесты этого модуля не меняй. `npm test` зелёный.
3. Оба коммита создавай после одобрения. Push один, уже зелёной пары, в `bulls-and-cows`.

Если красный коммит проверяет не контракт спеки, допиши исправление отдельным `test:` до `feat:`, пока пара не запушена. Уже запушенную пару не переписывать.

## Пример

`## Next` = `feat/digit-validator`.

На `bulls-and-cows` подготовь изменение. После одобрения: коммит `test: add failing tests for createDigitValidator`, затем `feat: implement createDigitValidator`, затем push в `bulls-and-cows`. Оба коммита видны в PR #1. Новый PR не открывай. Пока коммитов нет в `bulls-and-cows`, пункт в `docs/plan.md` остаётся `[    ]`.
