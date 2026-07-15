# HeaderSlider

Renders a carousel of full-bleed `header-block` slides — each slide carries its own title, description, buttons, and background media. Use it when the top of the page needs to rotate multiple equally important campaigns or announcements instead of a single hero.

## Block type

`type: 'header-slider-block'`

## When to use

- Top-of-page hero carousel with two or more featured items.
- When each slide needs the full Header feature set (buttons, background image/video, breadcrumbs, theme).
- When you want autoplay, dots, or arrows to navigate between slides.

## Example

```json
{
  "type": "header-slider-block",
  "dots": true,
  "arrows": true,
  "autoplay": 3000,
  "items": [
    {
      "title": "Lorem ipsum dolor sit amet",
      "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "background": {
        "light": {"image": "/images/header-bg-light.png", "color": "#EFF2F8", "fullWidth": true},
        "dark": {"image": "/images/header-bg-dark.png", "color": "#262626", "fullWidth": true}
      },
      "buttons": [{"text": "Primary", "theme": "action", "url": "https://example.com"}]
    },
    {
      "title": "Second campaign headline",
      "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      "background": {"color": "#262626", "fullWidth": true},
      "theme": "dark",
      "buttons": [{"text": "Learn more", "theme": "normal-contrast", "url": "https://example.com"}]
    }
  ]
}
```

## Properties

| Property           | Type                                               | Default | Description                                                                                                   |
| ------------------ | -------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `items` _required_ | `HeaderItem[]`                                     | —       | Array of slides. Each item follows the Header schema (`title` required) and renders as a full `header-block`. |
| `dots`             | `boolean`                                          | —       | Shows pagination dots under the slider.                                                                       |
| `arrows`           | `boolean`                                          | —       | Shows navigation arrows (hidden automatically on mobile).                                                     |
| `randomOrder`      | `boolean`                                          | —       | Shuffles slide order on load.                                                                                 |
| `autoplay`         | `number`                                           | —       | Slide interval in milliseconds; omit to disable autoplay.                                                     |
| `adaptive`         | `boolean`                                          | —       | Lets the slider height adapt to the tallest slide.                                                            |
| `arrowSize`        | `number`                                           | `20`    | Pixel size of the navigation arrows.                                                                          |
| `slidesToShow`     | `{sm?, md?, lg?, xl?, all?}`                       | —       | Responsive count of slides visible (HeaderSlider forces a single slide).                                      |
| `disclaimer`       | `{text: string, size?: 'xs'\|'s'\|'sm'\|'m'\|'l'}` | —       | Small legal/disclaimer text rendered near the slider.                                                         |

Each `HeaderItem` supports every property of the [Header](../Header/README.md) block (`title`, `description`, `buttons`, `background`, `breadcrumbs`, `theme`, etc.).

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Themed values

Theming is delegated to the individual slide `items`, which support `{light, dark}` values per the Header block.

## Storybook

[HeaderSlider](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-header-slider-block--docs)
