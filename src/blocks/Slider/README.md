# Slider

A carousel block that renders any number of child cards as swipeable slides, with optional title, description, dots, arrows, autoplay, and per-breakpoint slide counts. Built on top of Swiper.

## Block type

`type: 'slider-block'`

## When to use

- You need to display a sequence of cards (basic cards, quote cards, image cards, etc.) in a carousel.
- You need responsive control over how many slides are visible at each breakpoint.
- You want autoplay, pagination dots, and navigation arrows.

## Example

```json
{
  "type": "slider-block",
  "title": {"text": "QuoteCards", "url": "https://example.com"},
  "description": "Lorem ipsum dolor sit amet",
  "dots": true,
  "arrows": true,
  "slidesToShow": 1,
  "children": [
    {
      "type": "quote",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image": {
        "light": "/images/quote-light.png",
        "dark": "/images/quote-dark.png"
      },
      "logo": "/images/company-logo.svg",
      "author": {
        "firstName": "Lorem",
        "secondName": "ipsum",
        "description": "Lorem ipsum",
        "avatar": "/story-assets/img_6-12_light.png"
      }
    },
    {
      "type": "basic-card",
      "title": "Basic card",
      "text": "Ut enim ad minim veniam.",
      "icon": "/story-assets/icon_1_light.svg"
    }
  ]
}
```

Responsive `slidesToShow`:

```json
"slidesToShow": {"sm": 1, "md": 2, "lg": 3, "xl": 4}
```

## Properties

| Property       | Type                                                   | Default | Description                                                                                                                   |
| -------------- | ------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `title`        | `string \| TitleProps`                                 | —       | Block title (plain string or options object).                                                                                 |
| `description`  | `string` (YFM)                                         | —       | Block description under the title.                                                                                            |
| `children`     | `Card[]`                                               | —       | Array of child card blocks rendered as slides. Any registered card type is allowed.                                           |
| `slidesToShow` | `number \| {sm?, md?, lg?, xl?}`                       | —       | Number of slides to show. A number applies to all breakpoints; an object sets per-breakpoint counts (`sm`, `md`, `lg`, `xl`). |
| `dots`         | `boolean`                                              | `true`  | Show pagination dots.                                                                                                         |
| `arrows`       | `boolean`                                              | `true`  | Show prev/next navigation arrows.                                                                                             |
| `arrowSize`    | `number`                                               | —       | Size of the navigation arrows in pixels.                                                                                      |
| `autoplay`     | `number`                                               | —       | Autoplay interval in milliseconds. When set and positive, dots are hidden from the accessibility tab order.                   |
| `adaptive`     | `boolean`                                              | —       | Adaptive slide height.                                                                                                        |
| `randomOrder`  | `boolean`                                              | —       | Shuffle slides on render.                                                                                                     |
| `type`         | `string`                                               | —       | Logical slider type, used for grouping / loadable sources.                                                                    |
| `disclaimer`   | `{text *required*, size?}`                             | —       | Disclaimer text under the slider. `size` is one of `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`.                                       |
| `loadable`     | `{source *required*, params?, minCount? (deprecated)}` | —       | Disabled in the default schema. Used by projects that wire up a custom loadable source for slides.                            |

### Common properties

Inherits: `anchor`, `visible`, `indent`, `qa`, `className`, `animated`, `theme`, `when`, `context`. See root README.

## Notes

`children` accepts any block registered as a "card" in the schema. Common examples include `basic-card`, `quote`, image cards, and other content cards. A slider with a single child automatically renders without dots and arrows.

## Themed values

Child cards may individually use themed values (e.g. `{light, dark}` images); the block itself does not theme its scalar properties.

## Storybook

[Slider](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-slider--docs)
