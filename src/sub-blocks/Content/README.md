# Content

A text content block rendering a title, body text, additional info, links, buttons, and/or an icon content list. Used on its own as the textual portion of a content layout.

## Sub-block type

`type: 'content'`

## Used in

Accepted as `textContent` of: `content-layout-block`.

## Example

```json
{
  "type": "content",
  "title": "Lorem ipsum",
  "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris.",
  "additionalInfo": "Duis aute irure dolor in reprehenderit.",
  "size": "l",
  "centered": false,
  "links": [{"url": "#", "text": "Link", "theme": "normal", "arrow": true}],
  "buttons": [{"text": "Button", "theme": "action", "url": "https://example.com"}],
  "list": [
    {
      "icon": {"light": "/story-assets/icon_1_light.svg", "dark": "/story-assets/icon_1_dark.svg"},
      "title": "Lorem ipsum",
      "text": "Ut enim ad minim veniam quis nostrud exercitation."
    }
  ]
}
```

## Properties

| Property          | Type                                              | Default            | Description                                                                                         |
| ----------------- | ------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| `type` _required_ | `'content'`                                       | —                  | Sub-block discriminator.                                                                            |
| `title`           | `string \| TitleProps`                            | —                  | Heading (plain string or [Title](?path=/docs/documentation-types--docs#title-block-title) options). |
| `text`            | `string`                                          | —                  | Body text (YFM supported).                                                                          |
| `additionalInfo`  | `string`                                          | —                  | Secondary gray text (YFM supported).                                                                |
| `size`            | `'s' \| 'm' \| 'l' \| 'xl'`                       | `'l'`              | Content size; controls font sizes.                                                                  |
| `centered`        | `boolean`                                         | `false`            | Centers all content horizontally.                                                                   |
| `theme`           | `'default' \| 'dark' \| 'light'`                  | —                  | Content theme.                                                                                      |
| `links`           | `LinkProps[]`                                     | —                  | Array of [links](?path=/docs/documentation-types--docs#link).                                       |
| `buttons`         | `ButtonProps[]`                                   | —                  | Array of [buttons](?path=/docs/documentation-types--docs#button).                                   |
| `list`            | `ContentItem[]`                                   | —                  | Array of icon-content items (each requires `icon` or `gravityIcon`).                                |
| `controlPosition` | `'default' \| 'bottom'`                           | `'default'`        | Position of buttons/links.                                                                          |
| `colSizes`        | `{all?, sm?, md?, lg?, xl?}` (each `number` 1–12) | `{all: 12, sm: 8}` | Column width per breakpoint.                                                                        |

## Themed values

`icon`/`gravityIcon` inside `list` items accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Content](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-content--docs)
