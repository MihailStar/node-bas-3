# Учебные задания «Разработка на Node.js». Simple CRUD API

## Установка внешних зависимостей

```bash
npm install
```

\* .env добавлен для удобства

## Запуск

### Запуск в development режиме

```bash
npm run start:dev
```

\* в development режиме вывод описания внутренних ошибок, добавлен для отладки

### Запуск в production режиме

```bash
npm run start:prod
```

### Запуск в production режиме, с горизонтальным масштабированием

```bash
npm run start:multi
```

### Запуск тестовых сценариев

```bash
npm test
```

## Ресурсы

### Users

|          | Метод  | Путь                 | Принимает | Возвращает         |
| -------- | ------ | -------------------- | --------- | ------------------ |
| Create   | POST   | api/users            | `UserDto` | `Data<User>`       |
| Read All | GET    | api/users            | -         | `Data<User[]>`     |
| Read     | GET    | api/users/`{UserId}` | -         | `Data<User\|null>` |
| Update   | PUT    | api/users/`{UserId}` | `UserDto` | `Data<User\|null>` |
| Delete   | DELETE | api/users/`{UserId}` | -         | -                  |

```typescript
type UserId = string; // UUID версии 4
type UserDto = { username: string; age: number; hobbies: string[] };
type User = { id: UserId } & UserDto;
type Data<T> = { data: T };
```

\* в POST и PUT запросах, помимо тела, [необходим](https://github.com/MihailStar/node-bas-3/blob/master/03/src/simple-server/parse-json-body.ts#L7) заголовок с типом отправляемых данных (`Content-Type: application/json`)
