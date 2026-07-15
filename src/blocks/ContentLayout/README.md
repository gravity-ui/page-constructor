# ContentLayout

Renders a single-column content section (title, body text, optional list, links, and buttons) paired with an optional list of downloadable files and a background. Use it for documentation-style sections, terms, descriptions, or anywhere a focused block of text with file attachments is needed.

## Block type

`type: 'content-layout-block'`

## When to use

- Documentation, "about", legal, or descriptive sections where text is the main asset.
- When you need a list of attached files (PDF, DOC, ZIP, etc.) alongside the text.
- When you want a centered text column over a colored or image background.

## Example

```json
{
  "type": "content-layout-block",
  "size": "l",
  "theme": "default",
  "textWidth": "m",
  "textContent": {
    "title": "Lorem ipsum dolor sit amet",
    "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "buttons": [{"text": "Primary", "theme": "action", "url": "https://example.com"}]
  },
  "fileContent": [{"href": "https://example.com/spec.pdf", "text": "Specification (PDF)"}]
}
```

## Properties

| Property      | Type                             | Default     | Description                                                                                                                                                                               |
| ------------- | -------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `textContent` | `ContentBlock`                   | —           | Inner content object: `title` (string or `TitleProps`), `text` (YFM), `additionalInfo` (YFM), `links`, `buttons`, `list`, `theme`, `size`, `controlPosition`, `centered`, and `colSizes`. |
| `fileContent` | `FileLinkProps[]`                | —           | List of file attachments rendered as horizontal file links. Each item supports `href`, `text`, and other `FileLinkProps`.                                                                 |
| `size`        | `'s' \| 'm' \| 'l' \| 'xl'`      | `'l'`       | Overall content scale; also drives file-link text size.                                                                                                                                   |
| `background`  | `BackgroundImageProps`           | —           | Optional background image/color, hidden on mobile.                                                                                                                                        |
| `centered`    | `boolean`                        | `false`     | Centers the text column and file list.                                                                                                                                                    |
| `theme`       | `'default' \| 'light' \| 'dark'` | `'default'` | Color scheme; `default` follows the runtime theme.                                                                                                                                        |
| `textWidth`   | `'s' \| 'm' \| 'l'`              | `'m'`       | Maximum width of the text column on desktop.                                                                                                                                              |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Themed values

None of the top-level ContentLayout props accept `{light, dark}` directly; the `background` value is resolved against the runtime theme internally.

## Storybook

[ContentLayout](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-content-layout-block--docs)
