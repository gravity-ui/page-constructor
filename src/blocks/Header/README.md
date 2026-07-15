# Header

Renders a full-width page header with a title, optional overtitle/description, call-to-action buttons, breadcrumbs, and an optional media asset (image, video, or video iframe) positioned to the right or centered. Use it as the primary hero/landing block at the top of a page.

## Block type

`type: 'header-block'`

## When to use

- As the first block of a page to introduce the product, section, or campaign.
- When you need a large headline paired with CTA buttons and an illustration or background media.
- When you want breadcrumbs, status pills, or additional info alongside the title.

## Example

```json
{
  "type": "header-block",
  "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "additionalInfo": "**Ut enim ad minim veniam** ut aliquip ex ea commodo consequat.",
  "buttons": [
    {"text": "Primary", "theme": "action", "url": "https://example.com"},
    {"text": "Secondary", "theme": "outlined", "url": "https://example.com"}
  ],
  "background": {
    "light": {"image": "/images/header-bg-light.png", "color": "#EFF2F8"},
    "dark": {"image": "/images/header-bg-dark.png", "color": "#262626"}
  }
}
```

## Properties

| Property           | Type                                                      | Default                | Description                                                                 |
| ------------------ | --------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| `title` _required_ | `string`                                                  | —                      | Main heading text (YFM-supported). Rendered as `<h1>`.                      |
| `overtitle`        | `string`                                                  | —                      | Small label rendered above the title. Accepts YFM or a React node.          |
| `description`      | `string`                                                  | —                      | YFM body text shown below the title.                                        |
| `additionalInfo`   | `string`                                                  | —                      | YFM supplementary text shown below the description.                         |
| `width`            | `'s' \| 'm' \| 'l'`                                       | `'m'`                  | Maximum text width; also drives the title size.                             |
| `buttons`          | `ButtonBlock[]`                                           | —                      | Call-to-action buttons rendered under the text.                             |
| `offset`           | `'default' \| 'large'`                                    | `'default'`            | Horizontal indent of the content column.                                    |
| `image`            | `ImageProps \| {light, dark}`                             | —                      | Inline media image placed on the right side.                                |
| `video`            | `VideoProps \| {light, dark}`                             | —                      | Inline media video placed on the right side.                                |
| `videoIframe`      | `{src, autoplay?, previewImg?, height?} \| {light, dark}` | —                      | External iframe video (e.g. video hosting) placed on the right side.        |
| `mediaView`        | `'fit' \| 'full'`                                         | `'full'`               | `fit` constrains the media height; `full` lets it fill the available space. |
| `backLink`         | `{url, title}`                                            | —                      | "Back" navigation link rendered above the title.                            |
| `imageSize`        | `'s' \| 'm'`                                              | derived from `width`   | Overrides the inline media column size.                                     |
| `verticalOffset`   | `'0' \| 's' \| 'm' \| 'l' \| 'xl'`                        | `'m'`                  | Vertical spacing around the content.                                        |
| `background`       | `HeaderBackgroundProps \| {light, dark}`                  | —                      | Full-bleed background media/color behind the content.                       |
| `theme`            | `'default' \| 'dark'`                                     | `'light'` (text theme) | Text/background color scheme for the content area.                          |
| `breadcrumbs`      | `{items: {url, text}[], theme?}`                          | —                      | Breadcrumb navigation rendered above the content.                           |
| `status`           | `string`                                                  | —                      | Status text/React node rendered next to the title.                          |
| `centered`         | `boolean`                                                 | `false`                | Centers the content and hides the right-side media.                         |

`HeaderBackgroundProps` extends `MediaProps` with `fullWidth?: boolean` and `fullWidthMedia?: boolean`.

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Themed values

`image`, `video`, `videoIframe`, and `background` each accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Header](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-header-block--docs)
