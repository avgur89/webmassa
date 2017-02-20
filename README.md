# Дистрибутив проектов

Технологии: Gulp, Sass и простейшая шаблонизация.



## Клонирование репозитория

Для клонирования репозитория нужно прописать в консоли:

```
> git clone https://github.com/avgur89/webmassa.git
```



## Компиляция с помощью Gulp

Для запуска сборки нужно поставить необходимые пакеты. Из папки проекта запустить:

```bash
npm install
```



## Задачи Gulp

```bash
gulp               # запуск всех задач, слежения за файлами, локального сервера, автообновления
gulp sass          # компиляция стилей
gulp images        # минификация изображений и перенос в папку build/
gulp clean         # стирание папки build
```



## Парадигма

Разделяем результат и рабочие файлы:
- `build/` — папка с результатом работы
- `source/` — папка с рабочими файлами



### Разметка

Для вставки на HTML-страницы подключений стилевого файла, «Шапки», «Подвала», подключений скриптов и любых других повторяющихся блоков можно использовать [gulp-preprocess](https://www.npmjs.com/package/gulp-preprocess) (конструкции, вроде `<!-- @include _html_inc/page_header.html -->`). А можно и не использовать.



### Стилизация

- `source/scss/main.scss` — диспетчер подключений, в нем только импортируются другие файлы. Компилируется в `build/css/main.css`, который и подключается к HTML.

- `source/scss/tools` — файлы, включающие переменные, примеси, шрифты, разметку, normalize для сбросе стилей.
- `source/scss/basics` — файлы, описывающие базовые стили, стили для ссылок и типографика.
- `source/scss/components` — файлы, описывающие стили глобальных блоков страницы (forms, buttons).
- `source/scss/layouts` — файлы, описывающие стили для «Шапки», «Подвала».
- `source/scss/page-blocks` — файлы, описывающие стили отдельных блоков страницы.



### Изображения

При сборке все файлы и папки из `source/img` будут минифицированы и скопированы в `build/img`.



## Скрипты

Весь проектный JS в `source/js` будут скопированы в `build/js`.



## Переменная среды разработки

По умолчанию, переменная установлена в положении `development`.
Если переменной NODE_ENV присвоить значение `production` командой `set NODE_ENV=production`, то при запуске gulp задач, сборка проекта произойдет с минификацией стилей в `build/css/main.min.css`.

Командой `echo %NODE_ENV%` проверяем текущее значение переменной `NODE_ENV`.

```
set NODE_ENV=production (or development)
echo %NODE_ENV%
```
