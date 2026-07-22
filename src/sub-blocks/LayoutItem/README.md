# LayoutItem

Renders a two-part card: a media area (image, video, YouTube, etc.) stacked above a text content area with optional title, body, buttons, links, list, and meta info. Used as the primary content unit inside card-grid blocks.

## Sub-block type

`type: 'layout-item'`

## Used in

Accepted as `children` by `CardLayout`, `Slider`, `SliderOld`; also used as the card payload in `FilterBlock` items.

## Example

```json
{
  "type": "layout-item",
  "content": {
    "title": "Lorem ipsum",
    "text": "Dolor sit *amet*",
    "buttons": [
      {"text": "Button 1", "theme": "action", "url": "#test1"},
      {"text": "Button 2", "theme": "outlined", "url": "#test2"}
    ]
  },
  "media": {
    "light": {"image": "/assets/light.png"},
    "dark": {"image": "/assets/dark.png"}
  }
}
```

## Properties

| Property             | Type                                 | Default     | Description                                                                                   |
| -------------------- | ------------------------------------ | ----------- | --------------------------------------------------------------------------------------------- |
| `type` _required_    | `'layout-item'`                      | —           | Sub-block discriminator.                                                                      |
| `when`               | `string`                             | —           | Conditional rendering expression.                                                             |
| `content` _required_ | `object`                             | —           | Text content area. See below.                                                                 |
| `media` _required_   | `MediaProps \| {light, dark}`        | —           | Media area (image / video / youtube / iframe / dataLens). Themed: `T \| {light: T, dark: T}`. |
| `contentMargin`      | `'m' \| 'l'`                         | `'m'`       | Spacing between the media and the content.                                                    |
| `metaInfo`           | `string[]`                           | —           | List of meta strings rendered under the media (YFM supported).                                |
| `border`             | `boolean`                            | —           | Adds a border to the media.                                                                   |
| `fullscreen`         | `boolean`                            | —           | Enables fullscreen-expandable media (icon + overlay).                                         |
| `controlPosition`    | `'content' \| 'footer'`              | `'content'` | Where buttons/links render: inline in the content or at the card footer.                      |
| `analyticsEvents`    | `AnalyticsEvent \| AnalyticsEvent[]` | —           | Analytics events fired on media interaction.                                                  |

### `content` object

Inherits the `Content` schema (without `colSizes` / `centered`):

| Property          | Type                             | Default | Description                                                           |
| ----------------- | -------------------------------- | ------- | --------------------------------------------------------------------- |
| `title`           | `string \| TitleProps`           | —       | Card title (plain text or a title options object).                    |
| `text`            | `string` (YFM)                   | —       | Body text in YFM Markdown.                                            |
| `additionalInfo`  | `string` (YFM)                   | —       | Secondary text block below the body.                                  |
| `size`            | `'s' \| 'm' \| 'l' \| 'xl'`      | `'s'`   | Text/content scale.                                                   |
| `theme`           | `'default' \| 'dark' \| 'light'` | —       | Content color theme.                                                  |
| `links`           | `LinkProps[]`                    | —       | Inline links (each requires `text` + `url`).                          |
| `buttons`         | `ButtonProps[]`                  | —       | Inline buttons (each requires `text` + `url`).                        |
| `list`            | `ContentItem[]`                  | —       | Icon + title + text list. Each item requires `icon` or `gravityIcon`. |
| `controlPosition` | `'default' \| 'bottom'`          | —       | Inline positioning of buttons/links within the content.               |

## Themed values

`media` (and the deprecated `icon`) accept `T | {light: T, dark: T}` and are resolved at runtime via the active theme.

## Storybook

[LayoutItem](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-cards-layoutitem--docs)
