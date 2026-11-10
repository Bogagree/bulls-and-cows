# Bulls and Cows

Учебная браузерная игра RS School на TypeScript с функциональным ядром и TDD.

План шагов: [docs/plan.md](docs/plan.md).

Задание: https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/bulls-and-cows/README.md

Деплой: https://bogagree.github.io/bulls-and-cows/

## Запуск

```bash
npm ci
npm test
npm run build
```

После сборки откройте `index.html` через локальный статический сервер. Страница подключает `./dist/main.js` и `./css/`. С `file://` модули не загружаются.
