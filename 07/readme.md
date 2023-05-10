# Учебные задания «Разработка на Node.js». Home library service. Part 2

Не включает [шаблон](https://github.com/rolling-scopes-school/nodejs-course-template/tree/4f45c36393f30aeb56f31a8e4a943fe6408f98b1)

## Запуск

Создать **.env** файл, в корне проекта. Заполнить по образцу из **.env.example** файла

```bash
# Запустить контейнеры
npm run docker:up

# Остановить контейнеры
npm run docker:down
```

## Тестирование

После запуска контейнеров, в новом терминале

```bash
# Установить зависимости
npm install-clean

# Запустить тесты
npm run test
```

## Сканирование

После создания образов

```bash
# Запустить сканирование
npm run docker:scan
```

## Документация

После запуска контейнеров, по ссылке - [http://localhost:{PORT}/doc](http://localhost:4000/doc), где {PORT} переменная `PORT`, либо указана в файле .env, при запуске через docker-compose.yml, либо указана в опции --publish (-p), при запуске через Dockerfile

## Контейнеризация

### Образ

```bash
# Создать образ
docker build --tag=app-image:latest ./
docker build --tag=db-image:latest ./db

# Закачать образ
docker login --username={DOCKER_USERNAME}
docker tag app-image:latest {DOCKER_USERNAME}/app-image:latest
docker tag db-image:latest {DOCKER_USERNAME}/db-image:latest
docker push {DOCKER_USERNAME}/app-image:latest
docker push {DOCKER_USERNAME}/db-image:latest
docker logout

# Скачать образ
docker pull {DOCKER_USERNAME}/app-image:latest
docker pull {DOCKER_USERNAME}/db-image:latest
```

### Контейнер

```bash
# Создать контейнер
docker create \
  --name=app-container \
  --publish={PORT}:4000/tcp \
  --volume=./src:/app/src \
  app-image:latest
docker create \
  --env PGDATA=/var/lib/postgresql/data/pgdata \
  --env POSTGRES_PASSWORD={POSTGRES_PASSWORD} \
  --name=db-container \
  --publish={POSTGRES_PORT}:5432/tcp \
  --volume=./db/data:/var/lib/postgresql/data \
  db-image:latest

# Запустить контейнер
docker start app-container
docker start db-container

# Остановить контейнер
docker stop app-container
docker stop db-container

# Shell в контейнере
docker exec --interactive --tty app-container sh
docker exec --interactive --tty db-container sh
```

---

Написано на [Cloud Shell](https://shell.cloud.google.com)
