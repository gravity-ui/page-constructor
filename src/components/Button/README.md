`type: "button"`

`text: текст` - Текст

`url: url` - ссылка, куда кнопка ведет

`primary?: bool` - Является ли кнопка главной в списке всех кнопок

`size: 'xs' | 's' | 'ns' | 'n' | 'm' | 'l' | 'head' | 'promo'` - размер кнопки

`theme: 'action' | 'clear' | 'link' | 'normal' | 'pseudo' | 'raised' | 'websearch' | 'normal-dark' | 'dark-grey' | 'github' | 'app-store' | 'google-play' | 'scale' | 'monochrome'` - внешний вид кнопки;

`img?: object | string` - Иконка у кнопки. Если `string`, то указываем ссылку на иконку. Если `object`, указываем параметры ниже.

- `url: string` - ссылка на изображение
- `position?: 'left' | 'right'` - Позиция иконки на кнопке относительно текста. По умолчанию `'left'`
- `alt?: string` - Aльтернативный текст для изображения

`metrikaGoals: строка | строка[]` - свойства целей метрики

Как выглядят разные кнопки можно посмотреть [тут](https://cloud-guide.yandex-team.ru/?path=/story/lego--button).

**Отступы:**

`top: xs`
