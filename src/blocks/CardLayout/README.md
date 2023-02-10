`type: "card-layout-block"`

`title?: Title | string` — Title.

`description?: string` — Text.

`colSizes?: Object` — Sizes of a single card in columns for different screen sizes, the value ranges from 1 to 12 columns. If 12 columns, a single card takes up the entire width of the screen.

- `all: number` — On all screens.
- `sm: number` — On a screen wider than 577px.
- `md: number` — On a screen wider than 769px.
- `lg: number` — On a screen wider than 1081px.
- `xl: number` — On a screen wider than 1185px.

`children:[]` — You can add an array of any available cards here.

The following blocks are currently supported:

- [`BasicCard` — Basic card](?path=/story/components-cards-basiccard--default&viewMode=docs)
- [`Partner` — Partner card](?path=/story/components-cards-partner--default&viewMode=docs)
- [`Price Detailed` — Pricing](?path=/story/components-cards-pricedetailed--marked-list&viewMode=docs)
- [`BackgroundCard` — Background card](?path=/story/components-cards-backgroundcard--default&viewMode=docs)
- [`CardWithImage` — Card with a picture above the title (deprecated)](?path=/story/components-cards-cardwithimage--default&viewMode=docs)
- [`LayoutItem` — Component part of `Layout` component, consists with `Media` and `Content`](?path=/story/components-cards-cardwithimage--default&viewMode=docs)
- [`NewsCard` — News card](?path=/story/components-cards-newscard--default&viewMode=docs)
- [`TutorialCard` — Card with an icon](?path=/story/components-cards-tutorialcard--default&viewMode=docs)
