# SliderOld

> ⚠️ **Deprecated.** `slider-old-block` is deprecated and will be removed in a future major release. Use [`slider-block`](../Slider/README.md) (the `Slider` block, built on Swiper) for new and existing pages.

The legacy carousel block, built on top of `react-slick`. Renders child cards as slides with optional title, description, dots, arrows, autoplay, and per-breakpoint slide counts.

## Block type

`type: 'slider-old-block'`

## When to use

- Only for backward compatibility with existing JSON that already uses `slider-old-block`.
- For anything new, use `slider-block`.

## Example

```json
{
  "type": "slider-old-block",
  "title": {"text": "Slider", "url": "https://example.com"},
  "description": "Lorem ipsum dolor sit amet",
  "dots": true,
  "arrows": true,
  "animated": true,
  "children": [
    {
      "type": "basic-card",
      "url": "https://example.com",
      "title": "Lorem ipsum dolor sit amet",
      "text": "Ut enim ad minim veniam.",
      "icon": "/story-assets/icon_1_light.svg"
    }
  ]
}
```

## Properties

| Property       | Type                                                   | Default | Description                                                                             |
| -------------- | ------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------- |
| `title`        | `string \| TitleProps`                                 | —       | Block title (plain string or options object).                                           |
| `description`  | `string` (YFM)                                         | —       | Block description under the title.                                                      |
| `children`     | `Card[]`                                               | —       | Array of child card blocks rendered as slides.                                          |
| `slidesToShow` | `number \| {sm?, md?, lg?, xl?}`                       | —       | Number of slides to show, constant or per-breakpoint.                                   |
| `dots`         | `boolean`                                              | `true`  | Show pagination dots.                                                                   |
| `arrows`       | `boolean`                                              | `true`  | Show prev/next navigation arrows.                                                       |
| `autoplay`     | `number`                                               | —       | Autoplay speed in milliseconds.                                                         |
| `randomOrder`  | `boolean`                                              | —       | Shuffle slides on render.                                                               |
| `disclaimer`   | `{text *required*, size?}`                             | —       | Disclaimer text under the slider. `size` is one of `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`. |
| `loadable`     | `{source *required*, params?, minCount? (deprecated)}` | —       | Disabled in the default schema; used by projects that wire up a custom loadable source. |

### Common properties

Inherits: `anchor`, `visible`, `indent`, `qa`, `className`, `animated`, `theme`, `when`, `context`. See root README.

## Themed values

Child cards may individually use themed values; the block itself does not theme its scalar properties.

## Storybook

[SliderOld](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-sliderold-deprecated--docs)
