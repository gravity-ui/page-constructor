# Media

Renders a two-column layout that pairs a content column (title, body, list, links, button) with a media column (image, video, YouTube, iframe, or DataLens embed). Use it for feature or explainer sections where text and a rich media asset need to sit side by side.

## Block type

`type: 'media-block'`

## When to use

- Feature or "how it works" sections with text on one side and media on the other.
- When you need an image gallery (array of images becomes a slider), video player, YouTube embed, iframe, or DataLens visualization in the same block.
- When you want to control media-vs-content order, sizing, or border treatment.

## Example

```json
{
  "type": "media-block",
  "title": "Lorem ipsum dolor sit",
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "size": "l",
  "direction": "media-content",
  "media": {
    "light": {"image": "/images/media-light.png"},
    "dark": {"image": "/images/media-dark.png"}
  }
}
```

## Properties

| Property             | Type                                 | Default | Description                                                                                                                                                                                            |
| -------------------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title` _required_   | `string \| TitleProps`               | —       | Section heading. String or `TitleProps` (`text`, `textSize`, `url`, `urlTitle`, `analyticsEvents`).                                                                                                    |
| `media` _required_   | `MediaProps \| {light, dark}`        | —       | Media column: `image` (single or array → slider), `video`, `youtube`, `videoIframe`, `iframe`, `dataLens`, plus `previewImg`, `autoplay`, `parallax`, `height`, `ratio`, `fullscreen`, `margins`, etc. |
| `description`        | `string`                             | —       | YFM body text rendered under the title.                                                                                                                                                                |
| `additionalInfo`     | `string`                             | —       | YFM supplementary text below the body.                                                                                                                                                                 |
| `size`               | `'s' \| 'm' \| 'l' \| 'xl'`          | —       | Overall content/media scale.                                                                                                                                                                           |
| `links`              | `LinkProps[]`                        | —       | Inline text links rendered under the content.                                                                                                                                                          |
| `buttons` / `button` | `ButtonBlock[]` / `ButtonBlock`      | —       | CTA button(s) attached to the content column.                                                                                                                                                          |
| `list`               | `ContentItem[]`                      | —       | Bullet-style list with optional icons per item.                                                                                                                                                        |
| `controlPosition`    | `'default' \| 'bottom'`              | —       | Vertical placement of the buttons/links.                                                                                                                                                               |
| `direction`          | `'media-content' \| 'content-media'` | —       | Column order on desktop.                                                                                                                                                                               |
| `mobileDirection`    | `'media-content' \| 'content-media'` | —       | Column order on mobile.                                                                                                                                                                                |
| `largeMedia`         | `boolean`                            | —       | Gives the media column a wider share of the grid.                                                                                                                                                      |
| `mediaOnly`          | `boolean`                            | —       | Renders only the media column, hiding the content.                                                                                                                                                     |
| `mediaOnlyColSizes`  | `{sm?, md?, lg?, xl?, all?}`         | —       | Column sizes used when `mediaOnly` is `true`.                                                                                                                                                          |
| `border`             | `'shadow' \| 'line' \| 'none'`       | —       | Border/shadow treatment around the media.                                                                                                                                                              |
| `disableShadow`      | `boolean` (deprecated)               | —       | Legacy flag; use `border: 'none'` instead.                                                                                                                                                             |
| `animated`           | `boolean`                            | —       | Enables an entrance animation.                                                                                                                                                                         |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' | 'dark'`), `when`, `context`. See the root README for details.

## Themed values

`media` accepts either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Media](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-media--docs)
