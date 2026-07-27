# BannerCard

A compact banner card with a title, optional subtitle, a single call-to-action button, and a decorative background image. Designed to draw attention inside a card layout.

## Sub-block type

`type: 'banner-card'`

> The schema for this sub-block is defined in [`src/blocks/Banner/schema.ts`](../../blocks/Banner/schema.ts) (`BannerCardProps`) and shared with the standalone `banner-block`.

## Used in

Accepted as a child of: `card-layout-block`, `slider-block`, `slider-old-block`.

## Example

```json
{
  "type": "banner-card",
  "title": "Try the new release",
  "subtitle": "Faster builds, simpler APIs, and improved theming.",
  "image": {
    "light": "/story-assets/banner_light.png",
    "dark": "/story-assets/banner_dark.png"
  },
  "color": "#0275d8",
  "theme": "light",
  "mediaView": "full",
  "button": {
    "text": "Get started",
    "url": "https://example.com",
    "target": "_blank",
    "theme": "raised"
  }
}
```

## Properties

| Property            | Type                      | Default   | Description                                                                                                                                       |
| ------------------- | ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` _required_   | `'banner-card'`           | —         | Sub-block discriminator.                                                                                                                          |
| `when`              | `string`                  | —         | Conditional rendering expression.                                                                                                                 |
| `animated`          | `boolean`                 | —         | Enables entrance animation.                                                                                                                       |
| `title` _required_  | `string`                  | —         | Banner heading (rendered as `<h2>`, plain text).                                                                                                  |
| `subtitle`          | `string`                  | —         | Secondary text (YFM supported).                                                                                                                   |
| `image`             | `string \| {light, dark}` | —         | Decorative background image URL (themed).                                                                                                         |
| `mediaView`         | `'fit' \| 'full'`         | `'full'`  | How the background media fills the banner.                                                                                                        |
| `disableCompress`   | `boolean`                 | —         | Disables image compression for `image`.                                                                                                           |
| `color`             | `string \| {light, dark}` | —         | Background color (CSS value, themed). Applied to the content layer.                                                                               |
| `theme`             | `'light' \| 'dark'`       | `'light'` | Text color theme.                                                                                                                                 |
| `width`             | `'s' \| 'm' \| 'l'`       | —         | Banner width.                                                                                                                                     |
| `button` _required_ | `ButtonProps`             | —         | Single call-to-action [button](?path=/docs/documentation-types--docs#button). Uses only `text`, `url`, `target`, `theme` (`'raised'` by default). |

## Themed values

`image` and `color` each accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.
