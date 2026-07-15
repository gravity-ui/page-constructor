# Tabs

Renders a set of tab buttons that switch between rich content panels. Each tab panel pairs a content column (title, text, lists, buttons, links) with an optional media column (image, video, YouTube, iframe, DataLens), with control over column order, sizing, and border treatment.

## Block type

`type: 'tabs-block'`

## When to use

- Grouping several feature/explainer panels under a single heading where only one is visible at a time.
- Product or capability overviews that share the same layout but differ in text and media.
- Sections needing media + content panels with light/dark artwork variants per tab.

## Example

```json
{
  "type": "tabs-block",
  "title": {"text": "Lorem ipsum"},
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation.",
  "direction": "media-content",
  "centered": false,
  "contentSize": "s",
  "tabsColSizes": {"all": 12, "md": 12},
  "items": [
    {
      "tabName": "Dolor sit amet",
      "title": "Dolor sit amet",
      "text": "**Ut enim ad minim veniam** exercitation.",
      "buttons": [{"text": "Button", "theme": "action", "url": "https://example.com"}],
      "media": {
        "light": {"image": "/images/panel-light.png"},
        "dark": {"image": "/images/panel-dark.png"}
      },
      "border": "shadow"
    },
    {
      "tabName": "Lorem ipsum",
      "title": "Lorem ipsum",
      "caption": "Dolor sit amet",
      "text": "* Ut enim ad minim veniam",
      "links": [{"url": "https://example.com", "text": "Link", "theme": "normal", "arrow": true}],
      "media": {"light": {"youtube": "https://youtu.be/0Qd3T6skprA"}},
      "border": "shadow"
    }
  ]
}
```

## Properties

| Property           | Type                                                            | Default           | Description                                     |
| ------------------ | --------------------------------------------------------------- | ----------------- | ----------------------------------------------- |
| `items` _required_ | `TabsItem[]`                                                    | —                 | Array of tab panels. See below.                 |
| `title`            | `string \| TitleProps`                                          | —                 | Block heading (string or `TitleProps`).         |
| `description`      | `string`                                                        | —                 | YFM subtitle rendered under the title.          |
| `direction`        | `'media-content' \| 'content-media'`                            | `'media-content'` | Column order within each tab panel on desktop.  |
| `centered`         | `boolean`                                                       | —                 | Centers the title and the tab buttons row.      |
| `contentSize`      | `'s' \| 'm' \| 'l' \| 'xl'`                                     | `'s'`             | Content/media scale used inside each tab panel. |
| `tabsColSizes`     | `{sm?, md?, lg?, xl?, all?}` (values are column numbers `1–12`) | —                 | Grid column sizes for the tab buttons row.      |
| `animated`         | `boolean`                                                       | —                 | Enables an entrance/scroll animation.           |

### `items[]` (`TabsItem`)

| Property             | Type                           | Default | Description                                                                                                                                    |
| -------------------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `tabName` _required_ | `string`                       | —       | Label displayed on the tab button; also used as the tab identifier.                                                                            |
| `title`              | `string \| TitleProps`         | —       | Panel heading.                                                                                                                                 |
| `text`               | `string`                       | —       | YFM body text.                                                                                                                                 |
| `additionalInfo`     | `string`                       | —       | YFM supplementary text below the body.                                                                                                         |
| `links`              | `LinkProps[]`                  | —       | Inline text links.                                                                                                                             |
| `buttons`            | `ButtonBlock[]`                | —       | CTA buttons.                                                                                                                                   |
| `list`               | `ContentItem[]`                | —       | Bullet-style list with optional icons per item (`icon` or `gravityIcon`, plus `title`/`text`).                                                 |
| `controlPosition`    | `'default' \| 'bottom'`        | —       | Vertical placement of buttons/links.                                                                                                           |
| `media`              | `MediaProps \| {light, dark}`  | —       | Media column: `image` (single or array → slider), `video`, `youtube`, `videoIframe`, `iframe`, `dataLens`, plus `previewImg`, `autoplay`, etc. |
| `caption`            | `string`                       | —       | Plain-text caption rendered with the media.                                                                                                    |
| `image` _deprecated_ | `ImageProps \| {light, dark}`  | —       | Legacy single image; prefer `media`.                                                                                                           |
| `link` _deprecated_  | `LinkProps`                    | —       | Legacy single link; prefer `links`.                                                                                                            |
| `border`             | `'shadow' \| 'line' \| 'none'` | —       | Border/shadow treatment around the tab panel.                                                                                                  |

### Common properties

Inherits: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `when`, `context`. See the root README for details.

## Themed values

Each tab's `media` (and the legacy `image`) accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Tabs](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-tabs-block--docs)
