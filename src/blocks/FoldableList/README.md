# FoldableList

Renders a two-column block: a content panel on the left (title, text, links, buttons) and a list of collapsible items on the right, each with its own title, YFM text, and optional link. Use it for FAQ-style or specification pages where each row expands to reveal more detail.

## Block type

`type: 'foldable-list-block'`

## When to use

- FAQs, glossaries, or specification lists where each entry should expand/collapse.
- When you need a sticky intro panel (title, description, CTA) next to a long list.
- When individual answers may contain a bulleted list (`dash` or `disk` markers).

## Example

```json
{
  "type": "foldable-list-block",
  "title": "Lorem ipsum",
  "text": "Dolor sit amet, consectetur adipiscing elit [sed do eiusmod](https://example.com) tempor incididunt ut labore et dolore magna aliqua.",
  "additionalInfo": "Dolor sit amet [consectetur adipiscing](https://example.com) Duis aute irure dolor in reprehenderit.",
  "links": [{"url": "/security", "text": "Learn more", "theme": "normal", "arrow": true}],
  "buttons": [{"text": "Button", "theme": "action", "url": "https://example.com"}],
  "items": [
    {
      "title": "Lorem ipsum dolor sit amet 0",
      "text": "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "link": {"url": "#", "text": "Documentation", "theme": "normal", "arrow": true}
    },
    {
      "title": "Ut enim ad minim veniam, quis nostrud exercitation ullamco? 1",
      "text": "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "link": {"url": "#", "text": "Documentation", "theme": "normal", "arrow": true}
    },
    {
      "title": "Some title with a list",
      "text": "Lorem ipsum dolor sit amet:\n\n- Lorem ipsum\n- Lorem ipsum\n- Lorem ipsum",
      "link": {"url": "#", "text": "Documentation", "theme": "normal", "arrow": true},
      "listStyle": "disk"
    }
  ]
}
```

## Properties

| Property           | Type                    | Default | Description                                                                                              |
| ------------------ | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `title` _required_ | `string \| TitleProps`  | —       | Left-panel heading (string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). |
| `text`             | `string`                | —       | YFM body text in the left panel.                                                                         |
| `additionalInfo`   | `string`                | —       | YFM supplementary text in the left panel.                                                                |
| `links`            | `LinkProps[]`           | —       | Array of links rendered in the left panel.                                                               |
| `buttons`          | `ButtonBlock[]`         | —       | Array of buttons rendered in the left panel.                                                             |
| `list`             | `ContentItem[]`         | —       | Icon + title + text list rendered in the left panel. Each item requires an `icon` or `gravityIcon`.      |
| `controlPosition`  | `'default' \| 'bottom'` | —       | Position of the link/button controls in the left panel.                                                  |
| `items` _required_ | `FoldableListItem[]`    | —       | Collapsible rows on the right (see below).                                                               |

### `FoldableListItem`

| Property           | Type               | Default  | Description                                      |
| ------------------ | ------------------ | -------- | ------------------------------------------------ |
| `title` _required_ | `string`           | —        | Row title (always visible).                      |
| `text` _required_  | `string`           | —        | YFM body text revealed when the row is expanded. |
| `link`             | `LinkProps`        | —        | Link rendered below the text.                    |
| `listStyle`        | `'dash' \| 'disk'` | `'dash'` | Marker style for lists inside the text.          |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' \| 'dark'`), `when`, `context`. See the root README for details.

## Themed values

No dedicated themed props; the block follows the runtime `theme` for text/background coloring.

## Storybook

[FoldableList](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-foldable-list-block--docs)
