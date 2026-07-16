# Questions

Renders an FAQ block: a left content panel (title, text, links, buttons) and a list of expandable question/answer rows on the right. Automatically emits `FAQPage` JSON-LD microdata so search engines can index the answers as rich results.

## Block type

`type: 'questions-block'`

## When to use

- FAQ sections that benefit from search-engine rich results (JSON-LD `FAQPage`).
- Q&A lists where each answer should expand/collapse.
- When you need an intro panel (title, description, CTA) next to the questions.

## Example

```json
{
  "type": "questions-block",
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
      "title": "1. Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet:\n- Lorem ipsum\n- Lorem ipsum\n- Lorem ipsum",
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
| `items` _required_ | `QuestionItem[]`        | —       | Collapsible question rows on the right (see below).                                                      |

### `QuestionItem`

| Property           | Type               | Default  | Description                                                                             |
| ------------------ | ------------------ | -------- | --------------------------------------------------------------------------------------- |
| `title` _required_ | `string`           | —        | Question text (always visible). Also used as the JSON-LD `Question.name`.               |
| `text` _required_  | `string`           | —        | YFM answer text revealed when expanded. Also used as the JSON-LD `acceptedAnswer.text`. |
| `link`             | `LinkProps`        | —        | Link rendered below the answer.                                                         |
| `listStyle`        | `'dash' \| 'disk'` | `'dash'` | Marker style for lists inside the answer.                                               |

### Common properties

Inherits common block properties: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `animated`, `theme` (`'light' | 'dark'`), `when`, `context`. See the root README for details.

## Themed values

No dedicated themed props; the block follows the runtime `theme` for text/background coloring.

## Storybook

[Questions](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-questions--docs)
