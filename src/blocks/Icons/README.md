# Icons

Renders a responsive grid of small icon items, each consisting of an image and a caption. Items can optionally be wrapped in links, turning the grid into a navigable set of icon links.

## Block type

`type: 'icons-block'`

## When to use

- Compact grids of icon + label pairs (e.g. feature highlights, category links, value props).
- Quick-link hubs where each entry is a small graphic and a short caption.
- Sections that need a plain title/description header followed by an icon row.

## Example

```json
{
  "type": "icons-block",
  "title": "Icons block title",
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation.",
  "size": "s",
  "items": [
    {"src": "/images/icon-1.svg", "text": "Lorem ipsum dolor sit amet", "url": "#"},
    {"src": "/images/icon-2.svg", "text": "Lorem ipsum dolor sit amet", "url": "#"},
    {"src": "/images/icon-3.svg", "text": "Lorem ipsum dolor sit amet", "url": "#"}
  ]
}
```

## Properties

| Property           | Type                         | Default     | Description                                            |
| ------------------ | ---------------------------- | ----------- | ------------------------------------------------------ |
| `items` _required_ | `IconsBlockItem[]`           | —           | Array of icon items. See below.                        |
| `size` _required_  | `'s' \| 'm' \| 'l'`          | `'s'`       | Controls the rendered item/grid scale.                 |
| `title`            | `string`                     | —           | Optional section heading (plain text).                 |
| `description`      | `string`                     | —           | Optional plain-text subtitle rendered under the title. |
| `colSizes`         | `{sm?, md?, lg?, xl?, all?}` | `{all: 12}` | Grid column sizes for the optional header.             |
| `animated`         | `boolean`                    | —           | Enables an entrance animation.                         |

### `items[]`

| Property          | Type                                 | Default | Description                                                                  |
| ----------------- | ------------------------------------ | ------- | ---------------------------------------------------------------------------- |
| `url` _required_  | `string`                             | —       | If present, the item is rendered as a link wrapping the icon and text.       |
| `text` _required_ | `string`                             | —       | Caption rendered under the icon; also used as the link `aria-label`/`title`. |
| `src` _required_  | `string \| {light, dark}`            | —       | Icon image URL.                                                              |
| `analyticsEvents` | `AnalyticsEvent \| AnalyticsEvent[]` | —       | Analytics events fired when the item link is clicked.                        |

### Common properties

Inherits: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `when`, `context`. See the root README for details.

## Themed values

Each item's `src` accepts either a plain URL string or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Icons](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-icons-block--docs)
