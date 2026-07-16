# PromoFeaturesBlock

Renders a masonry layout of promotional feature cards, each pairing a title, YFM text, and an optional media asset, displayed against a full-width background. Use it for marketing sections that showcase several value propositions with rich imagery in a non-uniform grid.

## Block type

`type: 'promo-features-block'`

## When to use

- Marketing sections that mix feature cards with media (image/video) of varying heights.
- When you want an accent/primary card theme to draw attention to specific items.
- Promo landing sections where a full-width background tone (default or grey) is desired.

## Example

```json
{
  "type": "promo-features-block",
  "title": "Lorem ipsum dolor sit amet",
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "theme": "grey",
  "items": [
    {
      "title": "Lorem ipsum dolor sit amet",
      "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "media": {"image": "/story-assets/img-mini_4-12_dark.png"}
    },
    {
      "title": "Lorem ipsum dolor sit amet",
      "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "theme": "accent",
      "media": {"image": "/story-assets/img-mini_4-12_dark.png"}
    },
    {
      "title": "Lorem ipsum dolor sit amet",
      "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "theme": "primary",
      "media": {"image": "/story-assets/img-mini_4-12_white.png"}
    }
  ]
}
```

## Properties

| Property           | Type                   | Default     | Description                                                                                         |
| ------------------ | ---------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `title`            | `string \| TitleProps` | —           | Block heading (string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). |
| `description`      | `string`               | —           | YFM subtitle shown under the title.                                                                 |
| `theme`            | `'grey' \| 'default'`  | `'default'` | Full-width background tone for the block.                                                           |
| `items` _required_ | `PromoFeaturesItem[]`  | —           | Array of promo feature cards (see below).                                                           |
| `animated`         | `boolean`              | `true`      | Enables entrance animation for the block.                                                           |

### `PromoFeaturesItem`

| Property           | Type                                      | Default                  | Description                                                                                    |
| ------------------ | ----------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `title` _required_ | `string`                                  | —                        | Card title (rendered as `<h3>`).                                                               |
| `text` _required_  | `string`                                  | —                        | YFM card body text.                                                                            |
| `theme`            | `'accent' \| 'accent-light' \| 'primary'` | derived from block theme | Card color treatment.                                                                          |
| `media`            | `MediaProps \| {light, dark}`             | —                        | Media (image/video) attached to the card. When omitted, the card renders without a media area. |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' | 'dark'`), `when`, `context`. See the root README for details.

## Themed values

`media` accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[PromoFeaturesBlock](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-promofeaturesblock--docs)
