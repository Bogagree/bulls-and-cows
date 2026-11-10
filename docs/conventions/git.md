# Git & PR

Источники: [RS Git convention](https://rs.school/docs/git-convention), [PR requirements](https://rs.school/docs/mentoring/pull-request-review-process#pull-request-requirements-pr).

## Ветки

```text
main
 └── bulls-and-cows          ← PR #1 в main, сюда коммитятся все шаги
```

- Все шаги коммитятся в `bulls-and-cows`. Отдельную ветку и PR на шаг не открывать.
- `bulls-and-cows` уже открыта как PR #1. Название — **Bulls and Cows**. Этот PR не мержить.
- Коммит и push в `bulls-and-cows` — только после явного одобрения пользователя.

## Коммиты

Сообщения в нижнем регистре, повелительное наклонение, настоящее время:

```text
<type>: <description>
```

Типы: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `build`, `ci`.

Примеры:

```text
test: add failing tests for evaluateGuess
feat: implement evaluateGuess
chore: add typescript eslint and jest
docs: describe algorithms in DESIGN.md
```

На Windows сообщение передавать here-string PowerShell, не bash heredoc:

```powershell
git commit -m @"
feat: implement evaluateGuess

"@
```

## Пара тестов и реализации

Для шагов ядра из [plan.md](../plan.md):

1. Коммит `test:` добавляет тесты и заглушку модуля (`throw new Error("not implemented")` или заведомо неверный возврат). Импорт резолвится. `npm test` на этом коммите падает по утверждениям, не по отсутствию файла.
2. Коммит `feat:` меняет только реализацию. Существующие тесты этого модуля в нём не правятся.
3. Между этими коммитами не пушить. `pre-push` гоняет `npm test` и отправляет `bulls-and-cows` только зелёной.
4. Коммиты не сжимать. В PR #1 у функции предок с тестами виден раньше реализации.

Если тест в красном коммите проверяет не то, поправить его новым коммитом `test:` до коммита `feat:`, пока ветка не запушена. Уже запушенную пару не переписывать.

## PR #1 `bulls-and-cows` → `main`

Единственный PR. Новые шаги дописывают коммиты в его ветку, а не открывают следующий PR.

До шага `feat/readme-deploy` чеклист курса в описание не вставлять. На этом шаге текст брать из [submit-checklist.md](../submit-checklist.md), и в описании обязательно:

1. ссылка на задание;
2. ссылка на деплой;
3. скриншот;
4. done / deadline;
5. подтверждение порядка коммитов тесты → реализация по каждой из пяти функций;
6. ссылка на `DESIGN.md`;
7. пройденный чеклист поведения;
8. самопроверка по баллам.

Футер `Made with Cursor` **не добавлять**.
