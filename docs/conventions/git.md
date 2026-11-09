# Git & PR

Источники: [RS Git convention](https://rs.school/docs/git-convention), [PR requirements](https://rs.school/docs/mentoring/pull-request-review-process#pull-request-requirements-pr).

## Ветки

```text
main
 └── bulls-and-cows          ← сюда мержим шаги
      ├── chore/...
      ├── feat/...
      ├── docs/...
      └── PR bulls-and-cows → main   ← cross-check, НЕ мержить
```

- Шаг плана = одна ветка от свежей `bulls-and-cows` = один короткий PR в `bulls-and-cows`.
- Имя ветки совпадает с пунктом плана: `feat/guess`, `chore/tooling`, `docs/design`.
- Исключение: `docs/sdd-skeleton` коммитится прямо в `bulls-and-cows`, без feature-PR.
- Название сдаточного PR — **Bulls and Cows**.

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
chore: add typescript eslint and vitest
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
3. Между этими коммитами не пушить. `pre-push` гоняет `npm test` и отправляет ветку только зелёной.
4. Коммиты не сжимать. В PR у функции предок с тестами виден раньше реализации.

Если тест в красном коммите проверяет не то, поправить его новым коммитом `test:` до коммита `feat:`, пока ветка не запушена. Уже запушенную пару не переписывать.

## PR шага → `bulls-and-cows`

Кратко: Summary, Test plan, ссылки на затронутые `docs/specs/*` и `docs/decisions.md`.
Для шага с экраном — ссылка на `docs/qa/<step>.md`.
Чеклист курса (Task / Deploy / Score) **не заполнять**.
Футер `Made with Cursor` **не добавлять**.

## PR `bulls-and-cows` → `main`

Только здесь полный чеклист курса. Текст брать из [submit-checklist.md](../submit-checklist.md), не из шаблона feature-PR.

В описании обязательно:

1. ссылка на задание;
2. ссылка на деплой;
3. скриншот;
4. done / deadline;
5. подтверждение порядка коммитов тесты → реализация по каждой из пяти функций;
6. ссылка на `DESIGN.md`;
7. пройденный чеклист поведения;
8. самопроверка по баллам.
