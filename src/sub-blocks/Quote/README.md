# Quote

Renders a customer testimonial / quote card: a logo, the quote body, an optional author (name + avatar + description), and an optional CTA button. Paired with a large image on the side.

## Sub-block type

`type: 'quote'`

## Used in

Accepted as `children` by `CardLayout`, `Slider`, `SliderOld`; also usable as a card payload in `FilterBlock` items.

## Example

```json
{
  "type": "quote",
  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "quoteType": "chevron",
  "theme": "light",
  "image": {
    "light": {"src": "/assets/img_6-12_light.png"},
    "dark": {"src": "/assets/img_8-12_dark.png"}
  },
  "logo": {"src": "/assets/logo.png", "alt": "Company logo"},
  "author": {
    "firstName": "Lorem",
    "secondName": "ipsum",
    "description": "CEO, Acme",
    "avatar": "/assets/avatar.png"
  },
  "button": {
    "text": "Read the case study",
    "theme": "outlined",
    "url": "https://example.com"
  }
}
```

## Properties

| Property           | Type                            | Default     | Description                                                                                                                                  |
| ------------------ | ------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` _required_  | `'quote'`                       | —           | Sub-block discriminator.                                                                                                                     |
| `when`             | `string`                        | —           | Conditional rendering expression.                                                                                                            |
| `text`             | `string`                        | —           | Quote body (plain text). Prefer `yfmText` for Markdown.                                                                                      |
| `yfmText`          | `string` (YFM)                  | —           | Quote body in YFM Markdown (overrides `text` when set).                                                                                      |
| `image` _required_ | `ImageProps \| {light, dark}`   | —           | Large side image. Themed: `T \| {light: T, dark: T}`.                                                                                        |
| `logo` _required_  | `ImageProps`                    | —           | Company/personal logo shown above the quote.                                                                                                 |
| `color`            | `string`                        | —           | Custom card background color.                                                                                                                |
| `url`              | `string`                        | —           | Link URL for the CTA. Deprecated, prefer `button`.                                                                                           |
| `urlTitle`         | `string`                        | —           | Title/tooltip for the CTA link. Deprecated, prefer `button`.                                                                                 |
| `buttonText`       | `string`                        | —           | CTA button text. Deprecated, prefer `button`.                                                                                                |
| `button`           | `ButtonProps`                   | —           | Full button configuration (preferred over `url` / `urlTitle` / `buttonText`). Available on the component model; not part of the JSON schema. |
| `theme`            | `'light' \| 'dark'`             | `'light'`   | Text color theme.                                                                                                                            |
| `quoteType`        | `'chevron' \| 'english-double'` | `'chevron'` | Quotation mark style. `chevron` renders `« »`, `english-double` renders `“ ”`.                                                               |
| `author`           | `object`                        | —           | Author block. See below.                                                                                                                     |

### `author` object

| Property                | Type                          | Default | Description                |
| ----------------------- | ----------------------------- | ------- | -------------------------- |
| `firstName` _required_  | `string`                      | —       | Author first name.         |
| `secondName` _required_ | `string`                      | —       | Author second name.        |
| `avatar`                | `ImageProps \| {light, dark}` | —       | Avatar image (themed).     |
| `description`           | `string` (YFM)                | —       | Author role / description. |

## Themed values

`image` and `author.avatar` accept `T | {light: T, dark: T}` and are resolved at runtime via the active theme.

## Storybook

[Quote](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-cards-quote--docs)
