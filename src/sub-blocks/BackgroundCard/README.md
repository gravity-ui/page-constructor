# BackgroundCard

A card that renders text content (title, text, links, buttons, or a content list) over a decorative background image or solid color. Useful for promotional cards inside a card layout.

## Sub-block type

`type: 'background-card'`

## Used in

Accepted as a child of: `card-layout-block`, `slider-block`, `slider-old-block`.

## Example

```json
{
  "type": "background-card",
  "title": "Launch your product",
  "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco.",
  "additionalInfo": "Duis aute irure dolor in reprehenderit.",
  "background": {
    "light": {"src": "/story-assets/img-bg_nopadding_4-12_light.png", "alt": "Background"},
    "dark": {"src": "/story-assets/img-bg_nopadding_4-12_dark.png", "alt": "Background"}
  },
  "buttons": [
    {"text": "Get started", "theme": "action", "url": "https://example.com"},
    {"text": "Learn more", "theme": "outlined", "url": "https://example.com"}
  ],
  "theme": "dark"
}
```

## Properties

| Property           | Type                                              | Default             | Description                                                                                            |
| ------------------ | ------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| `type` _required_  | `'background-card'`                               | —                   | Sub-block discriminator.                                                                               |
| `when`             | `string`                                          | —                   | Conditional rendering expression.                                                                      |
| `title` _required_ | `string \| TitleProps`                            | —                   | Card title (plain string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). |
| `text` _required_  | `string`                                          | —                   | Body text (YFM supported).                                                                             |
| `additionalInfo`   | `string`                                          | —                   | Secondary gray text (YFM supported).                                                                   |
| `size`             | `'s' \| 'm' \| 'l' \| 'xl'`                       | `'s'`               | Content size; controls font sizes.                                                                     |
| `theme`            | `'default' \| 'dark' \| 'light'`                  | `'default'`         | Card content theme. When not `default`, or when `backgroundColor` is set, the card border is hidden.   |
| `links`            | `LinkProps[]`                                     | —                   | Array of [links](?path=/docs/documentation-types--docs#link).                                          |
| `buttons`          | `ButtonProps[]`                                   | —                   | Array of [buttons](?path=/docs/documentation-types--docs#button).                                      |
| `list`             | `ContentItem[]`                                   | —                   | Array of icon-content items (each requires `icon` or `gravityIcon`).                                   |
| `border`           | `'line' \| 'shadow' \| 'none'`                    | —                   | Card border style. Overridden to `'none'` when `backgroundColor` is set or `theme` is not `default`.   |
| `controlPosition`  | `'content' \| 'footer'`                           | `'content'`         | Position of buttons/links. `'footer'` only applies when `paddingBottom` is unset.                      |
| `colSizes`         | `{all?, sm?, md?, lg?, xl?}` (each `number` 1–12) | `{all: 12, md: 12}` | Column width per breakpoint.                                                                           |
| `url`              | `string`                                          | —                   | Wraps the whole card in a link.                                                                        |
| `urlTitle`         | `string`                                          | —                   | `title` attribute for the card link.                                                                   |
| `background`       | `ImageObjectProps \| {light, dark}`               | —                   | Decorative background image (themed).                                                                  |
| `backgroundColor`  | `string`                                          | —                   | Solid background color (CSS value). Hides the border.                                                  |
| `paddingBottom`    | `'s' \| 'm' \| 'l' \| 'xl'`                       | —                   | Adds bottom padding. When set, `controlPosition: 'footer'` is ignored.                                 |
| `analyticsEvents`  | `AnalyticsEvent \| AnalyticsEvent[]`              | —                   | Analytics events fired on card interaction.                                                            |

## Themed values

`background` accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.
