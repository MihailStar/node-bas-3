# Учебные задания «Разработка на Node.js». Home library service. Part 3

Не включает [шаблон](https://github.com/rolling-scopes-school/nodejs-course-template/tree/2e92b263cdcbc29a187b0409783d8d6fb7c7ade2)

## Запуск

Создать **.env** файл, в корне проекта. Заполнить по образцу из **example.env** файла

### Запуск в development режиме

```bash
# Запустить контейнеры
npm run docker:start:dev

# Остановить контейнеры
npm run docker:stop:dev

# Остановить контейнеры и прибрать
npm run docker:down:dev
```

### Запуск в production режиме

```bash
# Запустить контейнеры
npm run docker:start:prod

# Остановить контейнеры
npm run docker:stop:prod

# Остановить контейнеры и прибрать
npm run docker:down:prod
```

## Тестирование

После запуска контейнеров, в новом терминале

```bash
# Предварительно установить зависимости
npm clean-install

# Запустить тесты
npm run test:auth
```

## Документация

После запуска контейнеров, по ссылке - [http://localhost:{PORT}/doc](http://localhost:4000/doc), где {PORT} переменная `PORT`, указана в файле .env
