# Tooling

Решения: [D-002](../decisions.md), [D-010](../decisions.md).

## `chore/tooling`

Шаг поднимает инструменты и пустую страницу. Игровых функций ещё нет.

Появляется:

- `package.json` с `"type": "module"` и скриптами `lint`, `format`, `test`, `build`.
- `npm test` запускает `vitest run --passWithNoTests` и на этом шаге заканчивается успехом без файлов тестов.
- `npm run build` запускает `tsc`. `tsconfig` строгий, `rootDir` = `src`, `outDir` = `dist`, тесты исключены.
- ESLint flat config с `typescript-eslint` и `eslint-config-prettier`. В `src/core` (каталог может появиться позже, правило задаётся сразу) `ClassDeclaration` запрещён.
- Prettier со штатными настройками. `.prettierignore` исключает `dist/`, `coverage/`, `node_modules/`.
- `index.html` с пустым `body` и одним script на `./dist/main.js`.
- `src/main.ts` компилируется. На этом шаге модуль может ничего не рисовать.
- `package-lock.json` коммитится. `node_modules/` и `dist/` не коммитятся.

Проверка шага: `npm run lint`, `npm test`, `npm run build`. Все три зелёные. QA-файл не нужен.

Husky на этом шаге не ставить: следующий шаг проверяет хуки отдельно, а первый push инструментов должен проходить и без них.

## `chore/husky`

- Пакеты `husky` и `lint-staged`. Скрипт `prepare` вызывает `husky`.
- `.husky/pre-commit` запускает `lint-staged` и не содержит `npm test`.
- `lint-staged` для `*.ts` гоняет `eslint --fix` и `prettier --write`, для `*.{json,css,html,md}` — Prettier.
- `.husky/pre-push` запускает `npm test`.
- После установки `npm test` по-прежнему зелёный.

Проверка: открыть оба хука и убедиться, что тесты висят только на push. Коммит этого шага сам проходит pre-commit. QA-файл не нужен.
