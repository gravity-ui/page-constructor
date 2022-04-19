Блок "Заголовок"

На странице может быть только один такой блок.

`type: 'header-block'`

`title: текст` - Заголовок;

`description?: текст` - Подзаголовок;

`width?: 's' | 'm' | 'l'` - ширина текста заголовка;

`buttons?: button[]` - список блоков типа Кнопка;

`offset?: 'default' | 'large'` - отступы сверху и снизу;

`image?: string | {src: string; alt?: string;}` - картинка рядом с текстом

`video?:`

- `src: string[]`
- `loop?:`
  - `start: number`
  - `end: number`

`backLink?: 'url' | 'title'`

`imageSize?: 's' | 'm'` - размеры картинки

`background?:`

- `fullWidth: true | false` - ширина фона на всю ширину экрана или по размеру колонки
- `color: строка` - цвет фона
- `url?: строка` - картинка фона

`theme?: default | dark` - определяет цвет текста (чёрный по умолчанию, белый для темного фона)

`verticalOffset?: 's' | 'm' | 'l' | 'xl'` - отступы сверху и снизу от текста. (Значения: 's' - 48px, 'm' - 80px, 'l' - 112px, 'xl' - 144px.)
