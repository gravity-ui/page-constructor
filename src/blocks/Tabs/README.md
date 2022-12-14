Tabs block

`type: tabs-block`

`title?: Title | string`

`description?: string`

`animated?: boolean` — Enables/disables animation for the block (enabled by default).

`centered?: false | true` - Aligns all content to the center ('false' by default)

`tabsColSizes?: Object` — Width of buttons tabs, the value ranges from 1 to 12 columns. If 12 columns, buttons takes up the entire width of the row.

- `all: number` — On all screens.
- `sm: number` — On a screen wider than 577px.
- `md: number` — On a screen wider than 769px.
- `lg: number` — On a screen wider than 1081px.
- `xl: number` — On a screen wider than 1185px.

`items: TabsBlockItem[]` — Tab description

- `tabName: string` — Tab title.
- `title?: string` — Item's title
- `text?: string` — Item's text (with YFM support)
- `additionalInfo?: string` — Gray text (with YFM support)
- `links?: Link[]` — An array with link objects (see [Content blocks](?path=/story/information--common-types&viewMode=docs))
- `buttons?: Button[]` — An array with button objects (see [Content blocks](?path=/story/information--common-types&viewMode=docs))
- `image?: string | ImageObjectProps` — Image.
- [`media: Media` — Media description](?path=/story/information--common-types&viewMode=docs#media---picvideodatalens)
- `caption?: string` — Image caption.
