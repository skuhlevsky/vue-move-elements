# vue-move-elements

[Online Example](https://vue1.stas.tv/)

## Описание проекта

1. При первом запуске приложение получает 100 объектов из открытого источника.
2. В эти объекты добавляет еще дочерних 200 объектов
3. Элементы объединяются в вертикальную структуру 100 + 200 объектов, вложенность отключается.
4. Каждому элементу добавляются уникальные ID (UUID based on IETF RFC 4122)
5. Элементы выводятся в левую колонку в ожидании действий.
6. При нажатии объекты перемещают из левой колонки в правую и обратно, при этом все действия сохраняются в истории.
7. Состояния автоматически сохраняются в localStorage.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
