The slider supports two types of content: loadable and from a config. Loadable content is loaded via the `loadable` property and content from a config via the `children` property.

`type: "slider-block"`

`animated?: bool` — Enables/disables animation for the block (enabled by default).

`dots?: bool` — A flag that indicates whether to show navigation dots.

`arrows? bool` — A flag that indicates whether to show navigation arrows.

`title: Title`: Title.

`description?: string`: Description.

`randomOrder?: bool`: Enables a random slide order.

`slidesToShow?: Record<'all' | 'sm' | 'md' | 'lg' | 'xl', number> | number`: How many slides to show on screens of different width. Overrides the default values. They can be overridden for each screen width. You can also set a single numeric value so that the number of slides is always the same (except for mobiles, where the value is always 1).

Default values:

- `xl`: 3
- `lg`: 3
- `md`: 2
- `sm`: 1

`loadable: Loadable` — Loadable content, the following data sources are currently supported:

- `events` — Events.
- `blog` — Blog posts.

`children: Block[]` — You can add child blocks to the slider that will be displayed as its cards. You can also add a component with nested child blocks to the slider. To make each nested child block displayed in a separate card, a child must have the items field which is the nested child.

The following blocks are currently supported:

- `Quote` — Quote
- [`BasicCard` — Basic card](?path=/story/components-cards-basiccard--default&viewMode=docs)
- [`Banner` — Banner](?path=/story/блоки-banner--default&viewMode=docs)
- [`Partner` — Partner card](?path=/story/components-cards-partner--default&viewMode=docs)
- [`Price Detailed` — Pricing](?path=/story/components-cards-pricedetailed--marked-list&viewMode=docs)
- [`BackgroundCard` — Background card](?path=/story/components-cards-backgroundcard--default&viewMode=docs)
- [`LayoutItem` — `Media` + `Content` components in one card-like view](?path=/story/components-cards-layoutitem--default&viewMode=docs)
- [`MediaCard` — Card with an image](?path=/story/блоки-media--default&viewMode=docs)
- [`NewsCard` — News card](?path=/story/components-cards-newscard--default&viewMode=docs)
