# Banner

Renders a compact promotional card with a title, subtitle, an optional background image or color, and a single call-to-action button. Use it to highlight a feature, announce a release, or drive traffic to a landing page from anywhere in the page flow.

## Block type

`type: 'banner-block'`

## When to use

- Mid-page promotional card with a clear single CTA.
- When you need a compact, image-rich block that fits alongside other content.
- As a stand-alone banner or as a card inside grid-based layouts (also registered as `banner-card`).

## Example

```json
{
  "type": "banner-block",
  "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "subtitle": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "image": {
    "light": "/images/banner-light.png",
    "dark": "/images/banner-dark.png"
  },
  "color": {"light": "#EFF2F8", "dark": "#262626"},
  "button": {
    "text": "Learn more",
    "url": "https://example.com"
  }
}
```

## Properties

| Property            | Type                      | Default | Description                                            |
| ------------------- | ------------------------- | ------- | ------------------------------------------------------ |
| `title` _required_  | `string`                  | —       | Banner heading text.                                   |
| `button` _required_ | `ButtonBlock`             | —       | Single call-to-action button. Requires `text` + `url`. |
| `subtitle`          | `string`                  | —       | YFM body text rendered under the title.                |
| `image`             | `string \| {light, dark}` | —       | Background image URL (or themed pair).                 |
| `mediaView`         | `'fit' \| 'full'`         | —       | How the background image fits the card.                |
| `disableCompress`   | `boolean`                 | —       | Disables image compression for the background.         |
| `color`             | `string \| {light, dark}` | —       | Background color of the card.                          |
| `theme`             | `'light' \| 'dark'`       | —       | Forces a light or dark color scheme.                   |
| `width`             | `'s' \| 'm' \| 'l'`       | —       | Card width preset.                                     |
| `animated`          | `boolean`                 | —       | Enables an entrance animation.                         |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' | 'dark'`), `when`, `context`. See the root README for details.

## Themed values

`image` and `color` each accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Banner](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-banner--docs)
