# Info

Renders a two-column information section: a left content column and a right content column, each with its own title, text, lists, buttons, and links, placed inside an optional themed background container.

## Block type

`type: 'info-block'`

## When to use

- Side-by-side information panels that share a background but present distinct content (e.g. summary vs. details).
- Sections needing a colored/themed container wrapping two `Content`-style columns.
- When you want independent buttons, links, and bullet lists per column.

## Example

```json
{
  "type": "info-block",
  "theme": "dark",
  "backgroundColor": {"light": "#eef3fe", "dark": "#000000"},
  "leftContent": {
    "title": "Lorem ipsum dolor sit amet",
    "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation.",
    "buttons": [
      {"text": "Button", "theme": "raised", "url": "#"},
      {"text": "Button", "theme": "outlined-contrast", "url": "#"}
    ]
  },
  "rightContent": {
    "title": "Lorem ipsum dolor sit amet",
    "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation.",
    "links": [{"url": "#", "text": "Link", "theme": "normal", "arrow": true}]
  }
}
```

## Properties

| Property                     | Type                      | Default  | Description                                                                                       |
| ---------------------------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `leftContent`                | `ContentProps`            | —        | Left column content. See below.                                                                   |
| `rightContent`               | `ContentProps`            | —        | Right column content. See below.                                                                  |
| `backgroundColor`            | `string \| {light, dark}` | —        | Background color of the container.                                                                |
| `theme`                      | `'light' \| 'dark'`       | `'dark'` | Text/content theme used inside the columns.                                                       |
| `title` _deprecated_         | `string`                  | —        | Legacy left-column title; prefer `leftContent.title`.                                             |
| `sectionsTitle` _deprecated_ | `string`                  | —        | Legacy right-column title; prefer `rightContent.title`.                                           |
| `buttons` _deprecated_       | `ButtonBlock[]`           | `[]`     | Legacy buttons appended to the left column; prefer `leftContent.buttons`.                         |
| `links` _deprecated_         | `LinkProps[]`             | `[]`     | Legacy links appended to the right column (rendered as arrow links); prefer `rightContent.links`. |

### `leftContent` / `rightContent` (`ContentProps`)

| Property          | Type                    | Default | Description                                                                                    |
| ----------------- | ----------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `title`           | `string \| TitleProps`  | —       | Column heading.                                                                                |
| `text`            | `string`                | —       | YFM body text.                                                                                 |
| `additionalInfo`  | `string`                | —       | YFM supplementary text below the body.                                                         |
| `links`           | `LinkProps[]`           | —       | Inline text links.                                                                             |
| `buttons`         | `ButtonBlock[]`         | —       | CTA buttons.                                                                                   |
| `list`            | `ContentItem[]`         | —       | Bullet-style list with optional icons per item (`icon` or `gravityIcon`, plus `title`/`text`). |
| `controlPosition` | `'default' \| 'bottom'` | —       | Vertical placement of buttons/links.                                                           |

### Common properties

Inherits: `when`. See the root README for details. (This block does not expose `anchor`, `visible`, `indent`, `animated`, or `context`.)

## Themed values

`backgroundColor` accepts either a plain color string or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Info](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-info--docs)
