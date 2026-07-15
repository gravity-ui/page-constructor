# Footer

A configurable page footer assembled from optional floors: navigation columns, contacts (social icons), disclaimer, copyright (legal links, language switcher, logo), and an attribution strip.

## Block type

`type: 'footer-block'`

## When to use

- You need a site-wide footer with link columns and/or a logo.
- You need social/contact icon links and/or a legal disclaimer.
- You need a copyright floor with legal links, language switcher, or a logo.

## Example

```json
{
  "type": "footer-block",
  "indentTop": "l",
  "backgroundColor": {"light": "#ffffff", "dark": "#111111"},
  "navigation": {
    "logo": {
      "image": {"src": "story-assets/icon_1-with-text_light.svg"},
      "url": "/"
    },
    "columns": [
      {
        "title": "Product",
        "links": [
          {"text": "Overview", "url": "#overview"},
          {"text": "Docs", "url": "#docs"}
        ]
      }
    ]
  },
  "contacts": {
    "title": "Join us",
    "links": [
      {
        "icon": {"src": "story-assets/icons-github_light.svg"},
        "url": "https://example.com",
        "urlTitle": "GitHub"
      }
    ]
  },
  "disclaimer": {"text": "Legal disclaimer text.", "align": "left"},
  "copyright": {
    "links": [
      {"text": "Privacy Policy", "url": "#privacy"},
      {"text": "Terms", "url": "#terms"}
    ],
    "copyrightText": "© 2026 Company"
  },
  "attribution": true
}
```

## Properties

| Property          | Type                                                      | Default | Description                                                                             |
| ----------------- | --------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `navigation`      | `FooterNavigation`                                        | —       | Navigation floor: logo and required link columns. Rendered when `columns` is non-empty. |
| `contacts`        | `FooterContacts`                                          | —       | Contacts floor: title + icon links. Rendered when `links` is non-empty.                 |
| `disclaimer`      | `{text *required*, align *required*: 'left' \| 'center'}` | —       | Disclaimer floor rendered as YFM.                                                       |
| `copyright`       | `FooterCopyright`                                         | —       | Copyright floor with optional legal links, language switcher, logo, and copyright text. |
| `attribution`     | `boolean`                                                 | —       | Shows the branded "Created with ..." attribution strip.                                 |
| `backgroundColor` | `string \| {light, dark}`                                 | —       | Theme-aware footer background color.                                                    |
| `indentTop`       | `'0' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl'`                | —       | Top indent of the footer.                                                               |

### `navigation` (FooterNavigation)

| Property             | Type                                                                                       | Default                         | Description                                             |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------- |
| `columns` _required_ | `Array<{title *required*, links *required*: LinkProps[]}>`                                 | —                               | Link columns.                                           |
| `logo`               | `{image *required*: ImageProps \| {light, dark}, url?, alt?, placement?: 'left' \| 'top'}` | —                               | Optional footer logo. `placement` defaults to `'left'`. |
| `colSizes`           | `{sm?, md?, lg?, xl?, all?}`                                                               | `{all: 6, sm: 4, md: 3, lg: 3}` | Grid sizes per column.                                  |
| `columnsPerRow`      | `number` (1–12)                                                                            | —                               | Switches to a fixed percentage-width-per-column layout. |

### `contacts` (FooterContacts)

| Property        | Type                                                                               | Default  | Description                                   |
| --------------- | ---------------------------------------------------------------------------------- | -------- | --------------------------------------------- |
| `title`         | `string`                                                                           | —        | Contacts floor heading.                       |
| `links`         | `Array<{icon *required*: ImageProps \| {light, dark}, url *required*, urlTitle?}>` | —        | Social/contact icon links. Open in a new tab. |
| `iconsSize`     | `'m' \| 'l'`                                                                       | `'l'`    | Icon size.                                    |
| `linksPosition` | `'left' \| 'center'`                                                               | `'left'` | Horizontal alignment of icons.                |
| `titlePosition` | `'top' \| 'near'`                                                                  | `'top'`  | Title placement relative to icons.            |

### `copyright` (FooterCopyright)

| Property                | Type                                                                                                              | Default      | Description                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------- |
| `links`                 | `LinkProps[]`                                                                                                     | —            | Legal or service links.                           |
| `linksOverflowStrategy` | `'dropdown' \| 'line-wrap'`                                                                                       | `'dropdown'` | Overflow behavior for links.                      |
| `languageSwitcher`      | `{items *required*: Array<{text *required*, href *required*}>, buttonText?, image?: ImageProps \| {light, dark}}` | —            | Dropdown language switcher rendered on the right. |
| `logo`                  | `{image *required*: ImageProps \| {light, dark}, url?, alt?}`                                                     | —            | Optional logo for the copyright floor.            |
| `copyrightText`         | `string`                                                                                                          | —            | Copyright text rendered on the right.             |

### Common properties

Inherits: `anchor`, `visible`, `indent`, `qa`, `className`, `animated`, `theme`, `when`, `context`. See root README.

## Themed values

`backgroundColor`, `navigation.logo.image`, `contacts.links[].icon`, `copyright.languageSwitcher.image`, and `copyright.logo.image` accept either a plain value or `{light, dark}`.

## Storybook

[Footer](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-footer-block--docs)
