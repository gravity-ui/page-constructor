# `Title` - заголовок блока

- `text: строка` - текст заголовка
- `url?: url` - ссылка заголовка
- [`textSize?: TextSize` - размер текста](#TextSize)

---

# `Button` - кнопка

- `text: строка` - текст
- `url?: url` - ссылка
- `primary?: boolean`
- [`img?: string | Img` - иконка](#img---icon)
- `size?: s | m | l | xl` - размер кнопки
- `theme?: normal | action | outlined | outlined-info | outlined-danger | raised | flat | flat-info | flat-danger | flat-secondary | clear | normal-contrast | outlined-contrast | flat-contrast | app-store | google-play | scale | github | monochrome` - тема кнопки
- `metrikaGoals? : строка | строка[] | {name: строка, isCrossSite?: boolean}[]` - кастомные цели метрики
- `pixelEvents?: PixelEvent[]` - Цели для facebook pixel
  - `name: Lead | Contact | SubmitApplication` - название цели
  - `data?: PixelEventData` - данные для отправки
- [`target?: Target` - где отображать](#Target)

## `Img` - icon

- `data: string`
- `position?: left | right`
- `alt?: string`

> Формат данных `PixelEventData` можно посмотреть в [документации](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events)

---

# `Link` - ссылка

- `text: текст` - текст ссылки
- `url?: url` - адрес ссылки
- `arrow?: boolean` - рисовать стрелку справа
- `theme?: back | file-link | normal` - тема
- [`textSize?: TextSize` - размер текста](#TextSize)
- [`target?: Target` - где отображать](#Target)

---

# <a name="Video">`Video` - видео</a>

- `src: url[]` - ссылки на видео в разных форматах
- `loop?:` `start: number` - время начала цикла видео, `end?: number` - время конца цикла видео

---

# <a name="DataLens">`DataLens` - DataLens график</a>

- `id: string` - id графика
- `theme: dark | light` - тема графика

---

# `Media` - изображение/видео/DataLens

- `color?: строка` - цвет фона
- [`image?: ImageObjectProps | ImageObjectProps[]` - фоновое изображение](#ImageObjectProps)
- `parallax?: bool` - вкл/выкл эффекта параллакса
- [`video?: Video` - видео](#Video)
- `youtube?: url` - ссылка на видео на youtube
- `height?: number` - высота блока
- `previewImg?: string`
- `dataLens?: string |` [DataLens](#DataLens)

---

# `Loadable` - загружаемый контент.

> На данный момент поддерживается только Слайдером. При добавлении этого свойства к блоку данные будут загружены из источника и переданы компоненту в качестве дочерних блоков соответствующего этим данным типа .

- `source?: 'events' | 'blog' | 'services'` - источник данных для загрузки
- `minCount?: number` - минимальное количество элементов, при которых будет отображаться блок (по умолчанию 3)

---

# <a name="ImageObjectProps">`ImageObjectProps` - свойства картинки</a>

- `src: строка`
- `alt?: строка`
- `disableCompress?: true | false` - true отключает сжатие картинок, false по умолчанию включено сжатие картинок

---

###### <a name="TextSize">`TextSize = s | m | l` - размер текста</a>

###### <a name="Target">`Target = _blank | _parent | _top | _self` - где отображать</a>
