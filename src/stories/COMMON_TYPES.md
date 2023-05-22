# `Title`— Block title

- `text: string` — Title text
- `url?: url` — Title link
- [`textSize?: TextSize` — Text size](#TextSize)

---

# `Button` — Button

- `text: string` — Text
- `url?: url` — Link
- `primary?: boolean`
- [`img?: string | Img` — Icon](#img---icon)
- `size?: s | m | l | xl` — Button size
- `theme?: normal | action | outlined | outlined-info | outlined-danger | raised | flat | flat-info | flat-danger | flat-secondary | clear | normal-contrast | outlined-contrast | flat-contrast | app-store | google-play | scale | github | monochrome` — Button theme
- `metrikaGoals? : string | string[] | {name: string, isCrossSite?: boolean}[]` — Yandex Metrica custom goals
- `pixelEvents?: PixelEvent[]` — Goals for Facebook pixel
  - `name: Lead | Contact | SubmitApplication` — Goal name
  - `data?: PixelEventData` — Data to send
- [`target?: Target` — Where to display](#Target)

## `Img` - icon

- `data: string`
- `position?: left | right`
- `alt?: string`

> For `PixelEventData` format, see the [documentation](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events).

---

# `Link` — Link

- `text: text` — Link text
- `url?: url` — Link URL
- `arrow?: boolean` — Draw an arrow on the right
- `theme?: back | file-link | normal` — Theme
- [`textSize?: TextSize` — Text size](#TextSize)
- [`target?: Target` — Where to display](#Target)

---

# <a name="Video">`Video` — Video</a>

- `src: url[]` — Links to video files in different formats
- `loop?:` `start: number` — Video loop start. `end?: number` — Video loop end.

---

# <a name="DataLens">`DataLens` — DataLens chart</a>

- `id: string` — Chart ID
- `theme: dark | light` — Chart theme

---

# `Media`— Image/video/DataLens/Youtube

- `color?: string` — Background color
- [`image?: ImageObjectProps | ImageObjectProps[] | ImageDeviceProps` — Background image](#ImageObjectProps). If you pass an array, the full-screen mode is automatically turned on.
- `parallax?: bool` — Enable/disable the parallax effect
- [`video?: Video` — Video](#Video)
- `youtube?: url` — Link to a video on YouTube
- `height?: number` — Block height
- `previewImg?: string`
- `dataLens?: string |` [DataLens](#DataLens)
- `fullScreen?: bool` — Enabling full-screen mode for image or video

---

# `Loadable` — Loadable content.

> Currently, it's only supported by the Slider. When adding this property to the block, data is loaded from the source and transferred to the component as child blocks of the respective type.

- `source?: 'events' | 'blog' | 'services'` — Source of data to load
- `minCount?: number` — Minimum number of elements as a condition for displaying the block (defaults to 3)

---

# <a name="ImageObjectProps">`ImageObjectProps` — Image property</a>

- `src: string`
- `alt?: string`
- `disableCompress?: true | false` — If true, image compression is disabled. If false (default), it's enabled.

---

# <a name="ImageDeviceProps">`ImageDeviceProps` — Image property with device support</a>

- `mobile: string`
- `tablet?: string`
- `desktop: string`
- `alt?: string`
- `disableCompress?: true | false` — If true, image compression is disabled. If false (default), it's enabled.

---

###### <a name="TextSize">`TextSize = s | m | l` — Text size</a>

###### <a name="Target">`Target = _blank | _parent | _top | _self` — Where to display</a>
