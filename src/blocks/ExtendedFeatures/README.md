# ExtendedFeatures

Renders a responsive grid of feature cards, each with an icon, title, text, an optional label (`New` / `Preview`), and an optional link. Use it to present a list of product features, capabilities, or benefits in a compact, icon-driven layout.

## Block type

`type: 'extended-features-block'`

## When to use

- Showcasing a set of features or capabilities with a small icon each.
- Highlighting new or preview items via a built-in `New` / `Preview` label.
- When you need per-item links to documentation or landing pages.

## Example

```json
{
  "type": "extended-features-block",
  "title": {"text": "Lorem ipsum dolor sit amet"},
  "description": "Three **cards in a row on the desktop**, two cards in a row on a tablet, one card in a row on a mobile phone.",
  "items": [
    {
      "title": "Sed do eiusmod tempor incididunt",
      "text": "Ut enim ad minim veniam [quis nostrud](https://example.com) ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "icon": {"light": "/story-assets/icon_1_light.svg", "dark": "/story-assets/icon_1_dark.svg"}
    },
    {
      "title": "Sed do eiusmod tempor",
      "text": "Ut enim ad minim veniam [quis nostrud](https://example.com) ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "icon": {"light": "/story-assets/icon_2_light.svg", "dark": "/story-assets/icon_2_dark.svg"},
      "label": "New"
    },
    {
      "title": "Sed do eiusmod tempor incididunt",
      "text": "Ut enim ad minim veniam [quis nostrud](https://example.com) ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "icon": {"light": "/story-assets/icon_3_light.svg", "dark": "/story-assets/icon_3_dark.svg"},
      "link": {"text": "Go", "url": "#", "arrow": true, "theme": "normal"}
    }
  ]
}
```

## Properties

| Property      | Type                                              | Default                   | Description                                                                                         |
| ------------- | ------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| `title`       | `string \| TitleProps`                            | —                         | Block heading (string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). |
| `description` | `string`                                          | —                         | YFM subtitle shown under the title.                                                                 |
| `items`       | `ExtendedFeaturesItem[]`                          | —                         | Array of feature cards (see below).                                                                 |
| `colSizes`    | `{all?, sm?, md?, lg?, xl?}` (each `number` 1–12) | `{all: 12, sm: 6, md: 4}` | Column width per breakpoint for a single feature.                                                   |
| `animated`    | `boolean`                                         | —                         | Enables entrance animation for the block.                                                           |

### `ExtendedFeaturesItem`

| Property | Type                          | Default | Description                                                                     |
| -------- | ----------------------------- | ------- | ------------------------------------------------------------------------------- |
| `title`  | `string`                      | —       | Feature title. Rendered as `<h3>` when the block has a title, otherwise `<h2>`. |
| `text`   | `string`                      | —       | YFM body text.                                                                  |
| `label`  | `'New' \| 'Preview'`          | —       | Small badge rendered next to the title.                                         |
| `link`   | `LinkProps`                   | —       | Single link rendered below the text.                                            |
| `icon`   | `ImageProps \| {light, dark}` | —       | Icon image shown above the title.                                               |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Themed values

`icon` accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[ExtendedFeatures](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-extended-features-block--docs)
