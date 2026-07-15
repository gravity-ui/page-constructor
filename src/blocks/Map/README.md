# Map

A media-and-content block that embeds an interactive Yandex Map inside a card, paired with an optional title, description, links, and buttons.

## Block type

`type: 'map-block'`

## When to use

- You need to show one or more geographic points with an interactive map.
- You want a titled, bordered map card next to marketing copy and CTAs.
- You want a responsive `media-content` / `content-media` layout.

## Example

```json
{
  "type": "map-block",
  "title": "Our office",
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris.",
  "direction": "content-media",
  "map": {
    "zoom": 9,
    "id": "common-places",
    "markers": [
      {
        "address": "Moscow Arbat",
        "coordinate": [55.753994, 37.622093]
      }
    ]
  }
}
```

## Properties

| Property            | Type                                 | Default | Description                                                                |
| ------------------- | ------------------------------------ | ------- | -------------------------------------------------------------------------- |
| `title` _required_  | `string \| TitleProps`               | —       | Block title (plain string or options object with `textSize`, `url`, etc.). |
| `map` _required_    | `MapProps`                           | —       | Map configuration. See below.                                              |
| `description`       | `string` (YFM)                       | —       | Block description.                                                         |
| `direction`         | `'media-content' \| 'content-media'` | —       | Relative position of map and content.                                      |
| `mobileDirection`   | `'media-content' \| 'content-media'` | —       | Direction on touch devices.                                                |
| `largeMedia`        | `boolean`                            | —       | When `true`, the map takes 8 of 12 columns.                                |
| `border`            | `'shadow' \| 'line' \| 'none'`       | —       | Map card border.                                                           |
| `disableShadow`     | `boolean` (deprecated)               | —       | Use `border: 'none'` instead.                                              |
| `mediaOnly`         | `boolean`                            | —       | Renders only the map, without content.                                     |
| `mediaOnlyColSizes` | `{sm?, md?, lg?, xl?, all?}`         | —       | Column sizes when `mediaOnly` is `true`.                                   |
| `additionalInfo`    | `string` (YFM)                       | —       | Gray supplementary text.                                                   |
| `links`             | `LinkProps[]`                        | —       | Array of link objects.                                                     |
| `buttons`           | `ButtonProps[]`                      | —       | Array of button objects.                                                   |
| `theme`             | `'default' \| 'dark' \| 'light'`     | —       | Content theme.                                                             |
| `controlPosition`   | `'default' \| 'bottom'`              | —       | Vertical position of links/buttons.                                        |

### `map` (MapProps)

| Property          | Type                                    | Default | Description                                                |
| ----------------- | --------------------------------------- | ------- | ---------------------------------------------------------- |
| `zoom`            | `number`                                | —       | Initial map zoom level.                                    |
| `address`         | `string`                                | —       | Address string used for geocoding / balloons.              |
| `id`              | `string`                                | —       | Map instance id.                                           |
| `markers`         | `Array<{coordinate, address?, label?}>` | —       | Markers to place on the map. `coordinate` is `[lat, lng]`. |
| `disableControls` | `boolean`                               | —       | Hides map controls.                                        |
| `disableBalloons` | `boolean`                               | —       | Disables marker balloons.                                  |

### Common properties

Inherits: `anchor`, `visible`, `indent`, `qa`, `className`, `animated`, `theme`, `when`, `context`. See root README.

## Setup notes

The Map block requires the maps provider. Pass `mapsContext` (with `apikey`, map `type`, and `scriptSrc`) to `PageConstructorProvider`, otherwise the map cannot be loaded.

## Themed values

`map` is not themed itself, but the surrounding media block supports themed media; pass `{light, dark}` where a themed media value is expected.

## Storybook

[Map](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-map-block--docs)
