# Leaderboard

Одна таблица на все настройки ([D-007](../decisions.md)). Чистое ядро отделено от хранилища.

## `feat/leaderboard-core`

Сначала падающие тесты, потом реализация.

```ts
export type Result = {
  attempts: number;
  elapsedMs: number;
  length: number;
  base: number;
  playedAt: string;
};

export function addResult(
  results: readonly Result[],
  result: Result,
): Result[];

export function topResults(
  results: readonly Result[],
  limit?: number,
): Result[];

export function formatDuration(elapsedMs: number): string;
```

`addResult` возвращает новый массив и не меняет входной. Порядок в хранилище — порядок добавления.

`topResults` по умолчанию берёт 10. Сортировка, без мутации входа:

1. меньше попыток выше;
2. при равных попытках меньше `elapsedMs` выше;
3. при полном равенстве более ранний `playedAt` выше.

`formatDuration`:

| ms | текст |
| --- | --- |
| 0 | `0:00` |
| 5000 | `0:05` |
| 62000 | `1:02` |
| 3599999 | `59:59` |
| 3600000 | `1:00:00` |
| 3661000 | `1:01:01` |

Отрицательное значение показывается как `0:00`. Секунды и минуты внутри часа дополняются нулём до двух знаков. Часы пишутся, только если они есть.

Хранилище, файл `src/storage.ts`:

```ts
export const RESULTS_KEY = "bulls-and-cows-results";

export function loadResults(storage: Pick<Storage, "getItem">): Result[];

export function saveResults(
  storage: Pick<Storage, "setItem">,
  results: readonly Result[],
): void;
```

Нет ключа или в ключе не массив записей нужной формы — `loadResults` возвращает `[]`. Тест передаёт объект в памяти, не `globalThis.localStorage`. Круг `saveResults` → `loadResults` возвращает те же поля.

## `feat/leaderboard`

Экран уже умеет выигрывать ([ui.md](./ui.md)). Этот шаг в момент перехода `playing` → `won` один раз вызывает `addResult` и `saveResults`. Повторный клик по уже выигранному раунду вторую запись не пишет.

Секция «Рекорды» видна и на настройках, и во время раунда. В ней либо текст «Пока нет результатов», либо таблица не длиннее 10 строк: место, попытки, время через `formatDuration`, условия.

Текст условий: `4 · десятичная`, `2 · двоичная`, `6 · восьмеричная`, `6 · шестнадцатеричная`.

После перезагрузки страницы записанный результат на месте. Секрет и история раунда не восстанавливаются: игрок снова на экране настроек.

Незаконченная партия, закрытая «Новая игра» до победы, строку не добавляет. Это поведение кнопки доделывает шаг `feat/new-game`, но запись здесь уже завязана только на переход в `won`.
