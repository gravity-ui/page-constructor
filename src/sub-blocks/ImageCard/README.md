# ImageCard

A card pairing a foreground image with text content (title, text, links, buttons, or a content list). The image and content can be ordered in either direction.

## Sub-block type

`type: 'image-card'`

## Used in

Accepted as a child of: `card-layout-block`, `slider-block`, `slider-old-block`.

## Example

```json
{
  "type": "image-card",
  "title": "Tell a story and build a narrative",
  "text": "We are all storytellers. Stories are a powerful way to communicate ideas.",
  "image": {
    "dark": "/story-assets/img_8-12_dark.png",
    "light": "/story-assets/img_8-12_light.png"
  },
  "direction": "direct",
  "border": "shadow"
}
```

## Properties

| Property           | Type                                 | Default     | Description                                                                                            |
| ------------------ | ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| `type` _required_  | `'image-card'`                       | —           | Sub-block discriminator.                                                                               |
| `when`             | `string`                             | —           | Conditional rendering expression.                                                                      |
| `image` _required_ | `ImageProps`                         | —           | Foreground image (URL string, object, or device-aware object).                                         |
| `title`            | `string \| TitleProps`               | —           | Card title (plain string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). |
| `text`             | `string`                             | —           | Body text (YFM supported).                                                                             |
| `additionalInfo`   | `string`                             | —           | Secondary gray text (YFM supported).                                                                   |
| `size`             | `'s' \| 'm' \| 'l' \| 'xl'`          | `'s'`       | Content size; controls font sizes.                                                                     |
| `theme`            | `'default' \| 'dark' \| 'light'`     | `'default'` | Content theme.                                                                                         |
| `links`            | `LinkProps[]`                        | —           | Array of [links](?path=/docs/documentation-types--docs#link).                                          |
| `buttons`          | `ButtonProps[]`                      | —           | Array of [buttons](?path=/docs/documentation-types--docs#button).                                      |
| `list`             | `ContentItem[]`                      | —           | Array of icon-content items (each requires `icon` or `gravityIcon`).                                   |
| `border`           | `'line' \| 'shadow' \| 'none'`       | `'shadow'`  | Card border style.                                                                                     |
| `controlPosition`  | `'content' \| 'footer'`              | `'content'` | Position of buttons/links inside the card.                                                             |
| `direction`        | `'direct' \| 'reverse'`              | `'direct'`  | Image/content order: `direct` = image first, `reverse` = content first.                                |
| `margins`          | `'s' \| 'm'`                         | —           | Internal margins around the image.                                                                     |
| `backgroundColor`  | `string`                             | —           | Solid background color (CSS value).                                                                    |
| `url`              | `string`                             | —           | Wraps the whole card in a link.                                                                        |
| `urlTitle`         | `string`                             | —           | `title` attribute for the card link.                                                                   |
| `analyticsEvents`  | `AnalyticsEvent \| AnalyticsEvent[]` | —           | Analytics events fired on card interaction.                                                            |

## Themed values

`image` accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.
