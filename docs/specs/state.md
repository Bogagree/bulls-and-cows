# Round state

Чистое состояние раунда. DOM и `localStorage` здесь не используются. Шаг `feat/game-state`: сначала падающие тесты, потом реализация ([D-010](../decisions.md)).

## Настройки

```ts
export type Settings = { length: number; base: number };

export function isAllowedSettings(settings: Settings): boolean;
```

Истина только если `base` один из `2 | 8 | 10 | 16`, а `length` целое от 2 до 6 и `length <= base`.

| length | base | результат |
| --- | --- | --- |
| 4 | 10 | `true` |
| 2 | 2 | `true` |
| 6 | 16 | `true` |
| 6 | 8 | `true` |
| 3 | 2 | `false` |
| 1 | 10 | `false` |
| 7 | 10 | `false` |
| 4 | 7 | `false` |

## Раунд

```ts
export type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};

export type Round = {
  length: number;
  base: number;
  secret: string;
  history: readonly Attempt[];
  status: "playing" | "won";
  startedAt: number;
  finishedAt: number | null;
};

export function startRound(
  settings: Settings,
  random: () => number,
  now: number,
): Round;

export function applyGuess(round: Round, guess: string, now: number): Round;
```

`startRound` при разрешённых настройках возвращает `status: "playing"`, пустую историю, `startedAt: now`, `finishedAt: null` и секрет из `generateSecret(settings.length, settings.base, random)`.

`startRound({ length: 4, base: 10 }, () => 0, 1000)` даёт секрет `"1234"`.

`applyGuess`:

- если `status` уже `"won"`, вернуть тот же объект `round`;
- привести попытку к нижнему регистру;
- если `isValidGuess` ложен или такая строка уже есть в `history`, вернуть тот же объект;
- иначе вернуть новый `Round`: история `[...history, { guess, ...evaluateGuess(secret, guess) }]`, остальные поля скопированы;
- если `bulls === length`, у нового раунда `status: "won"` и `finishedAt: now`.

Старый раунд после вызова остаётся с прежней историей. Массив истории нового раунда — другой объект.

Кейсы при секрете `"1234"`, старт на `1000`:

| действие | ожидание |
| --- | --- |
| `applyGuess(round, "1243", 1500)` | история из одной записи, быки 2, коровы 2, статус `playing`, `finishedAt` по-прежнему `null` |
| повтор `"1243"` | тот же объект, что предыдущий раунд |
| `applyGuess(round, "12", 1100)` | тот же объект: длина неверная |
| `applyGuess(round, "1234", 2000)` | статус `won`, `finishedAt` 2000, в истории одна запись с 4 быками |
| попытка после победы | тот же объект выигранного раунда |
| сначала `"5678"`, затем `"1234"` | две записи, победа на второй, попыток будет 2 |

Повтор без учёта регистра проверяется на раунде hex длины 2, который ещё не выигран. Первая попытка — допустимая строка, не равная секрету, например `"AB"`, если секрет другой. В истории оказывается `"ab"`. Следующий `applyGuess` с `"ab"` возвращает тот же объект.
