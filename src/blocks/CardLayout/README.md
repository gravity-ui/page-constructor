# CardLayout

Renders a responsive grid of arbitrary cards (children) with an optional header and a decorative background image. Use it whenever you need to lay out a homogeneous set of cards — basic, image, background, price, or layout-item — in a row that adapts to the viewport.

## Block type

`type: 'card-layout-block'`

## When to use

- Displaying a set of cards that should reflow across desktop, tablet, and mobile.
- When you need a title/description above a card row, optionally centered.
- When the card row needs a decorative background image (with or without a border/shadow).

## Example

```json
{
  "type": "card-layout-block",
  "title": "Card layout with basic cards",
  "description": "Three cards in a row on the desktop, two cards in a row on a tablet, one card in a row on a mobile phone.",
  "colSizes": {"all": 12, "sm": 6, "md": 4},
  "children": [
    {
      "type": "basic-card",
      "title": "Tell a story and build a narrative",
      "text": "We are all storytellers. Stories are a powerful way to communicate ideas and share information.",
      "icon": "/story-assets/icon_1_light.svg"
    },
    {
      "type": "basic-card",
      "title": "Reach your audience",
      "text": "The right story can lead to a better understanding of a situation, make us laugh, or even inspire us.",
      "icon": "/story-assets/icon_2_light.svg"
    },
    {
      "type": "basic-card",
      "title": "Inspire action",
      "text": "Use a clear narrative to drive your visitors toward the next step.",
      "icon": "/story-assets/icon_3_light.svg"
    }
  ]
}
```

## Properties

| Property      | Type                                                                     | Default                   | Description                                                                                                                          |
| ------------- | ------------------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `title`       | `string \| TitleProps`                                                   | —                         | Block heading (string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). Rendered above the cards.        |
| `description` | `string`                                                                 | —                         | YFM subtitle shown under the title.                                                                                                  |
| `colSizes`    | `{all?, sm?, md?, lg?, xl?}` (each `number` 1–12)                        | `{all: 12, sm: 6, md: 4}` | Column width per breakpoint. 12 = full width.                                                                                        |
| `background`  | `ImageBaseObjectProps \| ImageDeviceProps` (each with optional `border`) | —                         | Decorative background media behind the card row. Supports a `{light, dark}` themed object. `border`: `'none' \| 'shadow' \| 'line'`. |
| `children`    | `CardBlock[]`                                                            | —                         | Array of card sub-blocks to lay out (see _Children / sub-blocks_).                                                                   |
| `animated`    | `boolean`                                                                | —                         | Enables entrance animation for the block.                                                                                            |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Children / sub-blocks

`children` accepts an array of any card sub-block registered under the `cards` definition. The following are commonly used:

- `basic-card` — Basic card
- `image-card` — Image card
- `background-card` — Background card
- `price-card` — Price card
- `layout-item` — Media + content card (used by the `Layout` block)

Each child is rendered inside a grid column sized by `colSizes`.

## Themed values

`background` (and any themed value on children) accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[CardLayout](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-card-layout-block--docs)
