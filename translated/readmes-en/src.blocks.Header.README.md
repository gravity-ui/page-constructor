Header block

A page may only have one Header block.

`type: 'header-block'`

`title: text` — Title.

`description?: text` — Subtitle.

`width?: 's' | 'm' | 'l'` — Title text width.

`buttons?: button[]` — List of Button blocks.

`offset?: 'default' | 'large'` — Top and bottom margins.

`image?: string | {src: string; alt?: string;}` — Image next to text.

`video?:`

- `src: string[]`
- `loop?:`
   - `start: number`
   - `end: number`

`backLink?: 'url' | 'title'`

`imageSize?: 's' | 'm'` — Image size.

`background?:`

- `fullWidth: true | false` — Background width: to the entire screen width or as per column size.
- `color: string` — Background color
- `url?: string` — Background image

`theme?: default | dark` — Sets the text color (black by default, white for the dark background).

`verticalOffset?: 's' | 'm' | 'l' | 'xl'` — Top and bottom offsets from the text. (Values: 's' - 48px, 'm' - 80px, 'l' - 112px, 'xl' - 144px.)
