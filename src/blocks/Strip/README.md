# Strip

Displays either child cards or one responsive image strip as an adaptive wrapping list or a
continuously moving marquee. Child cards use the same contract as `Slider`; the image mode uses
the same themed desktop/tablet/mobile image contract as `Companies`.

## Block type

`type: 'strip-block'`

## Example

```json
{
  "type": "strip-block",
  "title": "Card strip",
  "layout": "marquee",
  "colSizes": {"all": 12, "sm": 6, "md": 4},
  "itemHeight": 160,
  "gap": 32,
  "children": [
    {
      "type": "image-card",
      "image": {
        "light": {"src": "/story-assets/icon_1_light.svg", "alt": "Circle"},
        "dark": {"src": "/story-assets/icon_1_dark.svg", "alt": "Circle"}
      },
      "border": "none"
    }
  ]
}
```

The image mode accepts the `Companies` image contract directly:

```json
{
  "type": "strip-block",
  "title": "Company logos",
  "itemHeight": "auto",
  "images": {
    "light": {
      "desktop": "/logos-desktop-light.svg",
      "tablet": "/logos-tablet-light.svg",
      "mobile": "/logos-mobile-light.svg"
    },
    "dark": {
      "desktop": "/logos-desktop-dark.svg",
      "tablet": "/logos-tablet-dark.svg",
      "mobile": "/logos-mobile-dark.svg"
    }
  }
}
```

For multiple images or clickable images, use the array format:

```json
{
  "type": "strip-block",
  "title": "Company logos",
  "itemHeight": 77,
  "color": "text-color",
  "images": [
    {
      "image": {
        "light": {
          "desktop": "/logos-desktop-light.svg",
          "tablet": "/logos-tablet-light.svg",
          "mobile": "/logos-mobile-light.svg",
          "alt": "Company logos"
        },
        "dark": {
          "desktop": "/logos-desktop-dark.svg",
          "tablet": "/logos-tablet-dark.svg",
          "mobile": "/logos-mobile-dark.svg",
          "alt": "Company logos"
        }
      },
      "url": "#"
    }
  ]
}
```

## Properties

| Property       | Type                                                 | Default  | Description                                      |
| -------------- | ---------------------------------------------------- | -------- | ------------------------------------------------ |
| `children`     | `Card[]`                                             | —        | Child cards using the shared card schema.        |
| `images`       | `CompaniesBlockProps['images'] \| StripImageProps[]` | —        | Companies image contract or a list of images.    |
| `color`        | `'text-color'`                                       | —        | Colors every image with the primary text color.  |
| `title`        | `string`                                             | —        | Optional centered section title in `display-2`.  |
| `description`  | `string`                                             | —        | Optional YFM description.                        |
| `layout`       | `'wrap' \| 'marquee'`                                | `'wrap'` | Adaptive multi-row or auto-moving presentation.  |
| `colSizes`     | `GridColumnSizesType`                                | —        | Card width in columns for each breakpoint.       |
| `itemHeight`   | `number \| 'auto'`                                   | `48`     | Shared height in pixels or intrinsic height.     |
| `gap`          | `number`                                             | `44`     | Horizontal and vertical gap in pixels.           |
| `pauseOnHover` | `boolean`                                            | `true`   | Pauses the marquee while the pointer is over it. |
| `duration`     | `number`                                             | `60`     | Duration of one marquee cycle in seconds.        |
| `animated`     | `boolean`                                            | —        | Enables the block entrance animation.            |

Exactly one content property must be provided: `children` or `images`. `children` accepts the same
built-in and custom cards as `Slider`. `images` accepts either the same object as `Companies` or
an array of items. Both themed and unthemed image objects are supported. Each array item contains
an `image` with a themed
`{light, dark}` value. `desktop` is required; `tablet` and `mobile` override it at their
breakpoints. An item can also specify `url`, `urlTitle`, and `target`. Setting the block prop
`color: "text-color"` renders all images as monochrome masks filled with
`var(--g-color-text-primary)`. With reduced-motion enabled, the marquee becomes a static wrapping
list.

`colSizes` follows the `CardLayout` contract. It accepts `all`, `sm`, `md`, `lg`, and `xl` values
from 1 to 12; omitted breakpoints inherit the preceding value. Below the first configured
breakpoint, a card occupies all 12 columns.

The marquee starts only when the original card row is wider than its viewport. A short row stays
static and centered. When moving, the block renders an assistive-technology-hidden copy,
removes its controls from sequential keyboard navigation while keeping pointer clicks available,
then shifts the track exactly to that copy's start, so the first card follows the last without a gap
or jump.
