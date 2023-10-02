[`title?: Title | string` - title](?path=/docs/documentation-types#title-block-title)

`text?: string` — Text (with YFM support)

`additionalInfo?: string` — Gray text (with YFM support)

[`links?: Link[]` — An array with link objects](?path=/docs/documentation-types#link)

[`buttons?: Button[]` — An array with button objects](?path=/docs/documentation-types#button)

`centered?: false | true` - Aligns all content to the center ('false' by default)

`theme?: 'default' | 'dark' | 'light'` — Component's theme: default, dark, or monochrome light ('default' by default).

- `size?: 's' | 'l'` — Component's size that defines font sizes ('l' by default)

`сolSizes?: Object` — Width of buttons tabs, the value ranges from 1 to 12 columns. If 12 columns, buttons takes up the entire width of the row.

- `all: number` — On all screens.
- `sm: number` — On a screen wider than 577px.
- `md: number` — On a screen wider than 769px.
- `lg: number` — On a screen wider than 1081px.
- `xl: number` — On a screen wider than 1185px.
