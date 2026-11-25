# MediaCard

Wraps a single media element (image, image slider, video, YouTube, iframe, or DataLens) inside a card with an optional border. Pure media card — no text content.

## Sub-block type

`type: 'media-card'`

## Used in

Accepted as `children` by `CardLayout`, `Slider`, `SliderOld`; also usable as a card payload in `FilterBlock` items.

## Example

```json
{
  "type": "media-card",
  "image": {
    "src": "/assets/img_6-12_white.png",
    "alt": "Picture",
    "disableCompress": true
  }
}
```

Array of images creates a slider:

```json
{
  "type": "media-card",
  "image": ["/assets/img1.png", "/assets/img2.png", "/assets/img3.png"]
}
```

## Properties

| Property                          | Type                                    | Default | Description                                                 |
| --------------------------------- | --------------------------------------- | ------- | ----------------------------------------------------------- |
| `type` _required_                 | `'media-card'`                          | —       | Sub-block discriminator.                                    |
| `when`                            | `string`                                | —       | Conditional rendering expression.                           |
| `border`                          | `'line' \| 'shadow' \| 'none'`          | —       | Card border style.                                          |
| `animated`                        | `boolean`                               | —       | Enables scroll-triggered entrance animation.                |
| `color`                           | `string`                                | —       | Background color.                                           |
| `image`                           | `ImageProps \| ImageProps[]`            | —       | Single image or array of images (array becomes a slider).   |
| `disableImageSliderForArrayInput` | `boolean`                               | —       | Render an image array as a static grid instead of a slider. |
| `video`                           | `VideoProps`                            | —       | Hosted video (`src` array required).                        |
| `youtube`                         | `string`                                | —       | YouTube video URL or ID.                                    |
| `videoIframe`                     | `string`                                | —       | Embeddable video iframe URL.                                |
| `autoplay`                        | `boolean`                               | —       | Autoplay video media.                                       |
| `parallax`                        | `boolean`                               | —       | Parallax scroll effect on the media.                        |
| `height`                          | `number`                                | —       | Fixed media height in pixels.                               |
| `previewImg`                      | `string`                                | —       | Poster image shown before video playback.                   |
| `dataLens`                        | `string \| {id, theme}`                 | —       | Embedded DataLens chart/object.                             |
| `fullscreen`                      | `boolean`                               | —       | Enables fullscreen-expandable media.                        |
| `ratio`                           | `number \| 'auto'`                      | —       | Aspect ratio of the media.                                  |
| `iframe`                          | `{src, name?, title?, height?, width?}` | —       | Generic iframe embed (`src` required).                      |
| `margins`                         | `boolean`                               | —       | Adds inner media margins.                                   |
| `analyticsEvents`                 | `AnalyticsEvent \| AnalyticsEvent[]`    | —       | Analytics events fired on media interaction.                |

## Themed values

`color`, `image`, and other media fields resolve themed values (`T | {light: T, dark: T}`) at runtime via the active theme.

## Storybook

[MediaCard](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-cards-mediacard--docs)
