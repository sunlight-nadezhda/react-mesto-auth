# Место React-приложение с регистрацией и авторизацией

Этот проект был создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Обзор
* Интро
* Ссылка на сайт
* Технологии

**Интро**

Это учебный информационный проект.  
Карточки и информация о пользователе загружается с сервера.  
При клике по карточке, она открывается в модальном окне.  
В этом проекте можно добавлять карточки и удалять свои карточки, а также редактировать данные в профиле.  
Добавлена авторизация и регистрация на сайте.

**Ссылка**

* [Ссылка на сайт проекта](https://sunlight-nadezhda.github.io/react-mesto-auth/)

**Технологии**

* БЭМ
* адаптивность под разные устройства
* javascript
* fetch
* React
* функциональные компоненты
* React-хуки: useState и useEffect с замыканием
* Работа с React.createContext
* Создание React списков с ключами
* Управляемые и неуправляемые компоненты
* История браузера

## Доступные скрипты

В каталоге проекта вы можете запустить:

```npm start```

Запускает приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

Страница перезагрузится, если вы внесете правки.\
Вы также увидите любые ошибки в консоли.

```npm test```

Запускает тесты в интерактивном режиме.\
Смотрите раздел о [running tests](https://facebook.github.io/create-react-app/docs/running-tests) для дополнительной информации.

```npm run build```

Собирает приложение для публикации в папку `build`.\
Оптимизирует сборку для достижения максимальной производительности.

Сборка минифицирована, а имена файлов включают хеши.\
Ваше приложение готово к публикации!

Смотрите раздел о [deployment](https://facebook.github.io/create-react-app/docs/deployment) для дополнительной информации.

```npm run eject```

**Примечание: это односторонняя операция. После того, как вы `eject`, вы не сможете вернуться!**

Если вас не устраивает инструмент сборки и выбор конфигурации, вы можете `eject` в любой момент. Эта команда удалит из вашего проекта зависимость отдельной сборки.

Вместо этого он скопирует все файлы конфигурации и транзитивные зависимости (webpack, Babel, ESLint и т.д.) Прямо в ваш проект, чтобы вы имели полный контроль над ними. Все команды, кроме `eject`, по-прежнему будут работать, но они будут указывать на скопированные сценарии, чтобы вы могли их настроить.

```npm run deploy```

Сначала проект собирается в папке `build`.\
Потом на Github создается ветка `gh-pages`. \
В нее копируется содержимое папки `build`. \
Затем надо в настройках Github выбрать `gh-pages`.

Смотрите раздел о [deployment on github-pages](https://create-react-app.dev/docs/deployment/#github-pages) для дополнительной информации.
