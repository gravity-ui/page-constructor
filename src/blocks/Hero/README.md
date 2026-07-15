# Hero

Renders a modern, content-driven hero block: an overtitle, a rich content column (title, body text, list, links, buttons) and a media column (image/video/iframe) that adapts to its intrinsic aspect ratio. Use it as the primary landing block when you want more layout flexibility than the classic Header provides.

## Block type

`type: 'hero-block'`

## When to use

- Top-of-page hero with a richer content column (lists, additional info, links).
- When media should intelligently switch between horizontal and vertical orientation based on its aspect ratio.
- When you need a colored or media background that can be full-width or contained.

## Example

```json
{
  "type": "hero-block",
  "overtitle": "Overtitle",
  "title": "Lorem ipsum dolor",
  "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "additionalInfo": "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  "buttons": [
    {"text": "Primary", "theme": "action", "url": "https://example.com"},
    {"text": "Secondary", "theme": "outlined", "url": "https://example.com"}
  ],
  "media": {
    "light": {"image": "/images/hero-light.png"},
    "dark": {"image": "/images/hero-dark.png"}
  }
}
```

## Properties

| Property           | Type                                                     | Default     | Description                                                                                                 |
| ------------------ | -------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `title` _required_ | `string \| TitleProps`                                   | —           | Main heading. A string or a `TitleProps` object (`text`, `textSize`, `url`, `urlTitle`, `analyticsEvents`). |
| `text`             | `string`                                                 | —           | YFM body content rendered below the title.                                                                  |
| `additionalInfo`   | `string`                                                 | —           | YFM supplementary text under the body.                                                                      |
| `links`            | `LinkProps[]`                                            | —           | Inline text links rendered below the content.                                                               |
| `list`             | `ContentItem[]`                                          | —           | Bullet-style list; each item has `title`, `text`, and an `icon`/`gravityIcon`.                              |
| `theme`            | `'default' \| 'light' \| 'dark'`                         | `'default'` | Color theme; `default` follows the runtime theme, `light`/`dark` force a monochrome scheme.                 |
| `overtitle`        | `string`                                                 | —           | Small label rendered above the title.                                                                       |
| `buttons`          | `HeroButton[] \| {light, dark}[]`                        | —           | CTA buttons. Each requires `text` + `url` and supports `theme`, `primary`, `size`, `extraProps`.            |
| `media`            | `MediaProps & {roundCorners?: boolean} \| {light, dark}` | —           | Media column (image/video/youtube/iframe/dataLens). `roundCorners` defaults to `true`.                      |
| `fullWidth`        | `boolean`                                                | `false`     | Extends the background to the full viewport width.                                                          |
| `verticalOffset`   | `'s' \| 'm' \| 'l' \| 'xl'`                              | `'m'`       | Vertical spacing around the content.                                                                        |
| `background`       | `HeroBackground \| {light, dark}`                        | —           | Background color and/or media behind the block.                                                             |
| `breadcrumbs`      | `{items: {url, text}[], theme?}`                         | —           | Breadcrumb navigation rendered above the content.                                                           |

`HeroBackground` accepts `image`, `video`, `parallax`, `height`, `ratio`, `previewImg` (from `MediaProps`) plus `color`.

`ContentItem` requires either `icon` or `gravityIcon` and supports `title`/`text`.

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Themed values

`buttons`, `media`, and `background` each accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Hero](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-hero-block--docs)
