Extended Features block

`type: "extended-features-block"`

`title?: Title | string`

`description?: string`

`animated?: bool` — Enables/disables animation for the block (enabled by default).

`items: FeatureItem[]` — Feature description

- `title?: string` — Title
- `text?: string` — Text
- `link?: Link` — Link below the text
- `label?: New | Preview` — Label

`colSizes?: Object` — Sizes of a single card in columns for different screen sizes, the value ranges from 1 to 12 columns. If 12 columns, a single card takes up the entire width of the screen.

- `all: number` — On all screens.
- `sm: number` — On a screen wider than 577px.
- `md: number` — On a screen wider than 769px.
- `lg: number` — On a screen wider than 1081px.
- `xl: number` — On a screen wider than 1185px.
