# Учебные задания «Разработка на Node.js». File manager

## Сборка

```bash
npm run build
```

## Запуск

```bash
npm run start -- --username=<your_username>
```

## Команды

```bash
help

up
cd <directory_path>
ls

cat <file_path>
add <file_path>
rn <file_path> <file_path>
cp <file_path> <directory_path>
mv <file_path> <directory_path>
rm <file_path>

os --EOL
os --cpus
os --homedir
os --username
os --architecture

hash <file_path>

compress <file_path> <file_path>
decompress <file_path> <file_path>

.exit
```

\* пути содержащие пробелы должны быть заключены в двойные кавычки

## Опции

| Команда | Флаг                                                                                                      | Назначение            | Тип     | Умолчание |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------------- | ------- | --------- |
|         | [isErrorCodeOutput](https://github.com/MihailStar/node-bas-3/blob/master/02/src/handle-input.ts#L8)       | Выводить коды ошибок  | boolean | true      |
| ls      | [isNameTruncated](https://github.com/MihailStar/node-bas-3/blob/master/02/src/executor/ls-executor.ts#L5) | Усекать длинные имена | boolean | true      |
