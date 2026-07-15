# FilterBlock

Renders a set of cards grouped by tags, with a row of toggle buttons that lets the visitor filter the visible cards by tag. Use it to present a catalog of cards (articles, features, products) that the user can narrow down without leaving the page.

## Block type

`type: 'filter-block'`

## When to use

- A catalog or gallery of cards that should be filterable by category.
- When you want tag-style toggle buttons above the cards.
- When the same card may belong to multiple categories.

## Example

```json
{
  "type": "filter-block",
  "title": "Filter Block Example",
  "description": "Three **cards in a row on the desktop**, two cards in a row on a tablet, one card in a row on a mobile phone.",
  "allTag": false,
  "tagButtonSize": "l",
  "centered": false,
  "tags": [
    {"id": "one", "label": "First category"},
    {"id": "two", "label": "Second category"},
    {"id": "three", "label": "Third category"}
  ],
  "items": [
    {
      "tags": ["one"],
      "card": {
        "type": "layout-item",
        "media": {
          "dark": {"image": "/story-assets/img-mini_4-12_dark.png"},
          "light": {"image": "/story-assets/img-mini_4-12_light.png"}
        },
        "content": {"title": "Card 1", "text": "Dolor sit amet consectetur adipiscing elit"}
      }
    },
    {
      "tags": ["two"],
      "card": {
        "type": "layout-item",
        "media": {
          "dark": {"image": "/story-assets/img-mini_4-12_dark.png"},
          "light": {"image": "/story-assets/img-mini_4-12_light.png"}
        },
        "content": {"title": "Card 2", "text": "Sed do eiusmod tempor incididunt ut labore"}
      }
    },
    {
      "tags": ["three"],
      "card": {
        "type": "layout-item",
        "media": {
          "dark": {"image": "/story-assets/img-mini_4-12_dark.png"},
          "light": {"image": "/story-assets/img-mini_4-12_light.png"}
        },
        "content": {"title": "Card 3", "text": "Et dolore magna aliqua ut enim ad minim"}
      }
    }
  ],
  "colSizes": {"all": 12, "xl": 4, "lg": 4, "md": 6, "sm": 12}
}
```

## Properties

| Property           | Type                                              | Default                   | Description                                                                                                                      |
| ------------------ | ------------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `title`            | `string \| TitleProps`                            | —                         | Block heading (string or [Title](?path=/docs/documentation-types--docs#title-block-title) options).                              |
| `description`      | `string`                                          | —                         | YFM subtitle shown under the title.                                                                                              |
| `tags` _required_  | `FilterTag[]`                                     | —                         | Tag definitions used as filter toggles (see below).                                                                              |
| `items` _required_ | `FilterItem[]`                                    | —                         | Cards to filter (see below).                                                                                                     |
| `allTag`           | `boolean \| string \| FilterTag`                  | —                         | Adds an "All" toggle. `true` uses the default label; a string overrides the label; an object supplies `{label, analyticsEvent}`. |
| `tagButtonSize`    | `'s' \| 'm' \| 'l' \| 'xl'`                       | —                         | Size of the filter tag buttons.                                                                                                  |
| `centered`         | `boolean`                                         | `false`                   | Centers the header and the tag button row.                                                                                       |
| `colSizes`         | `{all?, sm?, md?, lg?, xl?}` (each `number` 1–12) | `{all: 12, sm: 6, md: 4}` | Column width per breakpoint for a single card.                                                                                   |
| `animated`         | `boolean`                                         | —                         | Enables entrance animation for the block.                                                                                        |

### `FilterTag`

| Property           | Type                   | Default | Description                                                        |
| ------------------ | ---------------------- | ------- | ------------------------------------------------------------------ |
| `id` _required_    | `string`               | —       | Tag identifier. Must match at least one value in an item's `tags`. |
| `label` _required_ | `string`               | —       | Tag button label.                                                  |
| `analyticsEvent`   | `AnalyticsEventSchema` | —       | Analytics event fired when the tag is selected.                    |

### `FilterItem`

| Property          | Type        | Default | Description                                                                                                |
| ----------------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `tags` _required_ | `string[]`  | —       | Tag ids this card belongs to.                                                                              |
| `card` _required_ | `CardBlock` | —       | Card sub-block to render (any of the `cards` definitions, e.g. `layout-item`, `basic-card`, `image-card`). |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Children / sub-blocks

Cards are declared inside `items[].card` (not via a top-level `children` array). Each `card` may be any sub-block registered under the `cards` definition (`basic-card`, `image-card`, `background-card`, `price-card`, `layout-item`, etc.). The filtered cards are laid out via an internal `card-layout-block`.

## Themed values

No dedicated themed props on the block itself; individual card `media`/`background` may still accept `{light, dark}` objects per their own schemas.

## Storybook

[FilterBlock](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-filter-block--docs)
