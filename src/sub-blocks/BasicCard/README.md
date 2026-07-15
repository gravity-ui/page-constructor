# BasicCard

A general-purpose card with an optional icon (image or Gravity UI icon) and text content (title, text, links, buttons, or a content list). The simplest and most versatile card.

## Sub-block type

`type: 'basic-card'`

## Used in

Accepted as a child of: `card-layout-block`, `slider-block`, `slider-old-block`.

## Example

```json
{
  "type": "basic-card",
  "title": "Tell a story",
  "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco.",
  "icon": {
    "light": "/story-assets/icon_1_light.svg",
    "dark": "/story-assets/icon_1_dark.svg"
  },
  "iconPosition": "top",
  "url": "https://example.com",
  "urlTitle": "Opens in a new tab",
  "buttons": [{"text": "Read more", "theme": "action", "url": "https://example.com"}]
}
```

## Properties

| Property               | Type                                         | Default     | Description                                                                                              |
| ---------------------- | -------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `type` _required_      | `'basic-card'`                               | —           | Sub-block discriminator.                                                                                 |
| `when`                 | `string`                                     | —           | Conditional rendering expression.                                                                        |
| `title`                | `string \| TitleProps`                       | —           | Card title (plain string or [Title](?path=/docs/documentation-types--docs#title-block-title) options).   |
| `text`                 | `string`                                     | —           | Body text (YFM supported).                                                                               |
| `additionalInfo`       | `string`                                     | —           | Secondary gray text (YFM supported).                                                                     |
| `size`                 | `'s' \| 'm' \| 'l' \| 'xl'`                  | `'s'`       | Content size; controls font sizes.                                                                       |
| `links`                | `LinkProps[]`                                | —           | Array of [links](?path=/docs/documentation-types--docs#link).                                            |
| `buttons`              | `ButtonProps[]`                              | —           | Array of [buttons](?path=/docs/documentation-types--docs#button).                                        |
| `list`                 | `ContentItem[]`                              | —           | Array of icon-content items (each requires `icon` or `gravityIcon`).                                     |
| `border`               | `'line' \| 'shadow' \| 'none'`               | —           | Card border style.                                                                                       |
| `controlPosition`      | `'content' \| 'footer'`                      | `'content'` | Position of buttons/links inside the card.                                                               |
| `url`                  | `string`                                     | —           | Wraps the whole card in a link.                                                                          |
| `urlTitle`             | `string`                                     | —           | `title` attribute for the card link.                                                                     |
| `target`               | `'_blank' \| '_parent' \| '_top' \| '_self'` | —           | Link target.                                                                                             |
| `icon`                 | `ImageProps`                                 | —           | Leading icon image (URL string, object, or device-aware object).                                         |
| `gravityIcon`          | `GravityIconProps`                           | —           | Leading Gravity UI icon (`string` name, or `{name, color?}` where `color` is `'brand' \| 'text-color'`). |
| `iconPosition`         | `'top' \| 'left'`                            | `'top'`     | Position of the icon relative to the content.                                                            |
| `hoverBackgroundColor` | `string`                                     | —           | _Deprecated._ Background color/gradient applied on hover.                                                |

## Themed values

`icon` and `gravityIcon` accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.
