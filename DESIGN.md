# DESIGN

Описание фактического кода в `src/core`. Контракты: [docs/specs/core.md](docs/specs/core.md), [docs/specs/state.md](docs/specs/state.md).

## 1. Структуры и алгоритмы

Секрет и попытка — строки в нижнем регистре, не числа. `generateSecret` в `src/core/generate-secret.ts` возвращает `copy.slice(0, length).join("")`. Число не хранит лидирующий ноль: значение `0123` в десятичной записи — это `123`, а секрет `"0123"` должен сохранить четыре позиции. Буквы `a`–`f` тоже не являются цифрами одного числа. `applyGuess` в `src/core/game-state.ts` приводит попытку через `guess.toLowerCase()` и кладёт в историю уже эту строку.

`Attempt` и `Round` объявлены в `src/core/game-state.ts`. `Attempt` — это `guess`, `bulls`, `cows`. `Round` хранит `length`, `base`, `secret`, неизменяемую `history`, `status` (`"playing"` или `"won"`), `startedAt` и `finishedAt`. Новая попытка не дописывается в старый массив. `applyGuess` возвращает новый объект раунда с историей `[...round.history, { guess: normalized, ...score }]`. Если раунд уже выигран, попытка неверна или такая строка уже была, функция возвращает тот же объект `round`.

`evaluateGuess` в `src/core/evaluate-guess.ts` делает два массива: `secret.toLowerCase().split("")` и `guess.toLowerCase().split("")`. Быки — один `filter` по равенству символов на одном индексе. Коровы — второй `filter`: символ не на своём месте и `secretChars.includes(char)`.

`generateSecret` копирует `DIGITS.slice(0, base)` в массив и тасует его Фишером–Йейтсом с конца: для `i` от `base - 1` до `1` меняет `copy[i]` с `copy[j]`, где `j = Math.floor(random() * (i + 1))`. В секрет идут первые `length` символов. Источник случайности — аргумент `random`.

`countPossibleSecrets` считает размещения `P(base, length) = base! / (base - length)!`. В `src/core/count-possible-secrets.ts` это рекуррентность `base * count(length - 1, base - 1)`. База: `length === 0` даёт `1`; отрицательные аргументы и `length > base` дают `0`. Кеш — `Map` в замыкании `createMemoizedCountPossibleSecrets`, ключ `` `${length}:${base}` ``.

## 2. Сложность

`n` — длина секрета, `n ≤ 6`. Основание `base ≤ 16`.

| Функция                | Время                                                   | Почему                                                                                                                     |
| ---------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `generateSecret`       | `O(base)`                                               | цикл тасовки идёт по копии алфавита один раз, от `base - 1` до `1`; срез первых `length` символов короче этого прохода     |
| `evaluateGuess`        | `O(n²)`                                                 | быки — один `filter` за `O(n)`; коровы — `filter`, и на каждом из `n` символов `includes` смотрит массив секрета за `O(n)` |
| `isValidGuess`         | `O(n)`                                                  | один проход `every` по символам попытки и одна проверка `new Set(chars).size`; алфавит внутри предиката не длиннее `base`  |
| `countPossibleSecrets` | первый вызов `O(length)`, повтор с тем же ключом `O(1)` | рекурсия — одна цепочка `length → length - 1`, не дерево; повтор читает готовое значение из `Map`                          |

Память: стек рекурсии `countPossibleSecrets` — `O(length)`, кеш растёт по числу разных пар `(length, base)`, история раунда в `applyGuess` — `O(попытки)`.

## 3. Чистый код

`isAllowedSettings` в `src/core/game-state.ts` только отвечает, допустимы ли длина и основание. `applyGuess` в том же файле только принимает попытку и возвращает раунд. `formatDuration` в `src/core/format-duration.ts` только переводит миллисекунды в строку времени.

`startRound` и `applyGuess` в `src/core/game-state.ts` не вызывают `Date.now`: текущее время приходит аргументом `now`. `generateSecret` в `src/core/generate-secret.ts` не выбирает случайность сама: очередное число даёт аргумент `random`.

`applyGuess` в `src/core/game-state.ts` не импортирует `document` и не знает про экран. Разметку раунда собирает `createRoundScreen` в `src/ui/game-screen.ts`.

Алфавит записан один раз: константа `DIGITS` в `src/core/create-digit-validator.ts`. `generateSecret` берёт её срез, а `isValidGuess` проверяет символ через `createDigitValidator`, без второго списка цифр.

`generateSecret` в `src/core/generate-secret.ts` сразу возвращает секрет. В реализации нет `throw new Error("not implemented")`: эта заглушка осталась только в красных коммитах `test:`.
