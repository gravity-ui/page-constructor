# `Title` - заголовок блока

- `text: строка` - текст заголовка
- `url?: url` - ссылка заголовка

# `Button` - кнопка

- `text: строка` - текст
- `url?: url` - ссылка
- `metrikaGoals? : строка | строка[] | {name: строка, isCrossSite?: boolean}[]` - кастомные цели метрики
- `pixelEvents?: PixelEvent[]` - Цели для facebook pixel
  - `name: Lead | Contact | SubmitApplication` - название цели
  - `data?: PixelEventData` - данные для отправки

> Формат данных `PixelEventData` можно посмотреть в [документации](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events)

# `Link` - ссылка

- `text: текст` - текст ссылки;
- `url?: url` - адрес ссылка;
- `arrow?: bool` - рисовать стрелку справа;

# `Video` - видео

- `src: url[]` - ссылки на видео в разных форматах
- `loop?:` `start: number` - время начала цикла видео, `end?: number` - время конца цикла видео

# `DataLens` - DataLens график

- `id: string` - id графика
- `theme: dark | light` - тема графика

# `Media` - изображение/видео/DataLens

- `color?: строка` - цвет фона
- `image?: url` - фоновое изображение;
- `parallax?: bool` - вкл/выкл эффекта параллакса
- `video?: Video`
- `youtube?: url` - ссылка на видео на youtube
- `height?: number` - высота блока
- `previewImg?: string`
- `dataLens?: string | DataLens'

# `Loadable` - загружаемый контент.

> На данный момент поддерживается только Слайдером. При добавлении этого свойства к блоку данные будут загружены из источника и переданы компоненту в качестве дочерних блоков соответствующего этим данным типа .

- `source?: 'events' | 'blog' | 'services'` - источник данных для загрузки
- `minCount?: number` - минимальное количество элементов, при которых будет отображаться блок (по умолчанию 3)

# `ImageObjectProps` - свойства картинки

- `src: строка`
- `alt?: строка`
- `disableCompress?: true | false` - true отключает сжатие картинок, false по умолчанию включено сжатие картинок
