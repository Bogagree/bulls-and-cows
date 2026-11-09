# Core

Пять функций, которые курс проверяет по коммитам и по коду. Сигнатуры ниже фиксированы. Каждый шаг: коммит `test:` со заглушкой и этими кейсами, затем коммит `feat:` без правки тестов. См. [D-010](../decisions.md).

Общий алфавит живёт в `src/core/create-digit-validator.ts`:

```ts
export const DIGITS = "0123456789abcdef";
```

Остальные модули берут цифры отсюда, второй список не заводят.

## `createDigitValidator`

```ts
export function createDigitValidator(base: number): (char: string) => boolean;
```

Фабрика возвращает предикат одного символа. Сравнение после `toLowerCase()`. Символ короче или длиннее одного знака — `false`.

| base | char | результат |
| --- | --- | --- |
| 10 | `"7"` | `true` |
| 10 | `"a"` | `false` |
| 16 | `"a"` | `true` |
| 16 | `"A"` | `true` |
| 16 | `"g"` | `false` |
| 2 | `"0"` | `true` |
| 2 | `"2"` | `false` |
| 8 | `"7"` | `true` |
| 8 | `"8"` | `false` |
| 10 | `"7a"` | `false` |
| 10 | `""` | `false` |
| 10 | `" "` | `false` |

Отдельный кейс на форму фабрики: `const isHex = createDigitValidator(16); isHex("F")` равно `true`.

Шаг `feat/digit-validator`. Позже эту же функцию вызывают `isValidGuess` и фильтр поля ввода.

## `isValidGuess`

```ts
export function isValidGuess(guess: string, length: number, base: number): boolean;
```

Истина, когда длина строки совпадает с `length`, каждый символ проходит `createDigitValidator(base)`, повторов после `toLowerCase()` нет. Тело функции вызывает фабрику, а не копирует алфавит.

| guess | length | base | результат |
| --- | --- | --- | --- |
| `"1234"` | 4 | 10 | `true` |
| `"0123"` | 4 | 10 | `true` |
| `"123"` | 4 | 10 | `false` |
| `"12345"` | 4 | 10 | `false` |
| `"1123"` | 4 | 10 | `false` |
| `"12a4"` | 4 | 10 | `false` |
| `"10"` | 2 | 2 | `true` |
| `"12"` | 2 | 2 | `false` |
| `"ab"` | 2 | 16 | `true` |
| `"AB"` | 2 | 16 | `true` |
| `"aB"` | 2 | 16 | `false` |
| `"gg"` | 2 | 16 | `false` |
| `""` | 2 | 10 | `false` |

Шаг `feat/valid-guess`.

## `evaluateGuess`

```ts
export function evaluateGuess(
  secret: string,
  guess: string,
): { bulls: number; cows: number };
```

Обе строки приводятся к нижнему регистру. Бык — тот же символ на том же индексе. Корова — символ есть в секрете, но на этом индексе он не бык. Цифры в секрете уникальны, поэтому корову можно узнать принадлежностью к множеству.

Считать через `filter` / `reduce`, без цикла `for` / `while`, который сам увеличивает счётчики. Множество символов секрета собирается `reduce`.

| secret | guess | bulls | cows |
| --- | --- | --- | --- |
| `"1234"` | `"1234"` | 4 | 0 |
| `"1234"` | `"4321"` | 0 | 4 |
| `"1234"` | `"1243"` | 2 | 2 |
| `"1234"` | `"5678"` | 0 | 0 |
| `"0123"` | `"0132"` | 2 | 2 |
| `"ab"` | `"ba"` | 0 | 2 |
| `"a1b2"` | `"A1B2"` | 4 | 0 |
| `"a1b2"` | `"b1a2"` | 2 | 2 |

Шаг `feat/evaluate-guess`.

## `generateSecret`

```ts
export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string;
```

Берёт `DIGITS.slice(0, base)`, копирует в новый массив и тасует Фишера–Йейтса с конца:

```ts
for (let i = copy.length - 1; i > 0; i -= 1) {
  const j = Math.floor(random() * (i + 1));
  // обмен copy[i] и copy[j]
}
```

Исходная строка `DIGITS` не меняется. Результат — первые `length` символов копии, склеенные в строку. `random` в тестах на полуинтервале `[0, 1)`.

Зафиксированные расклады:

| вызов | результат |
| --- | --- |
| `generateSecret(4, 10, () => 0)` | `"1234"` |
| `generateSecret(2, 2, () => 0)` | `"10"` |
| `generateSecret(4, 10, () => 0.999)` | `"0123"` |

Ещё кейсы при `() => 0`:

- длина результата равна `length`;
- символы уникальны и входят в `DIGITS.slice(0, base)`;
- для основания 10 функция вызывает переданный `random` 9 раз (`base - 1`).

Тесты не вызывают `Math.random`. Шаг `feat/generate-secret`.

## `countPossibleSecrets`

```ts
export function countPossibleSecrets(length: number, base: number): number;
```

Число секретов — размещения без повторений `P(base, length) = base! / (base - length)!`. Первая цифра может быть нулём, отдельно вычитать такие секреты не нужно.

Рекурсия:

- `length === 0` → `1`;
- `length < 0` или `length > base` → `0`;
- иначе `base * countPossibleSecrets(length - 1, base - 1)`.

Результат мемоизируется своим `Map` по ключу `` `${length}:${base}` ``. Библиотечную `memoize` не подключать. Повторный вызов с теми же аргументами возвращает то же число. Сколько раз выполнилась рекурсия, тесты не проверяют: общий кеш сделал бы такой ассерт зависимым от порядка.

| length | base | значение |
| --- | --- | --- |
| 4 | 10 | 5040 |
| 2 | 2 | 2 |
| 6 | 16 | 5765760 |
| 6 | 8 | 20160 |
| 1 | 10 | 10 |
| 0 | 10 | 1 |
| 3 | 2 | 0 |

Шаг `feat/possible-secrets`. Экран настроек вызывает функцию при каждом пересчёте, это уже шаг `feat/settings`.
