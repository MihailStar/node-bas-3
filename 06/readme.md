# Учебные задания «Разработка на Node.js». Home library service. Part 1

Не включает [шаблон](https://github.com/rolling-scopes-school/nodejs-course-template/tree/4f45c36393f30aeb56f31a8e4a943fe6408f98b1)

## Установка внешних зависимостей

```bash
npm install
```

\* .env файл добавлен, для удобства

## Запуск

### Запуск в development режиме

```bash
npm run start:dev
```

### Запуск в production режиме

```bash
npm run build
npm run start:prod
```

## Тестирование

После запуска сервера, в новом терминале

```bash
npm run test
```

## Документация

После запуска сервера, по ссылке - [http://localhost:{PORT}/doc](http://localhost:4000/doc), где {PORT} переменная `PORT` указанная в .env файле, по умолчанию 4000
