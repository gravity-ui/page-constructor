# Companies

Renders a heading with a logo strip — a set of responsive images (desktop / tablet / mobile) shown beneath an optional title and description. Use it for "trusted by" or "powered by" logo rows that must adapt per device and theme.

## Block type

`type: 'companies-block'`

## When to use

- Showcasing a row of company or partner logos with per-device artwork.
- "Trusted by" / "powered by" sections that need light and dark theme variants of the same logos.
- A compact brand strip paired with a short title and optional YFM description.

## Example

```json
{
  "type": "companies-block",
  "title": "Page constructor",
  "description": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris.",
  "images": {
    "light": {
      "desktop": "/images/logo-desktop-light.svg",
      "tablet": "/images/logo-tablet-light.svg",
      "mobile": "/images/logo-mobile-light.svg",
      "alt": "Page constructor"
    },
    "dark": {
      "desktop": "/images/logo-desktop-dark.svg",
      "tablet": "/images/logo-tablet-dark.svg",
      "mobile": "/images/logo-mobile-dark.svg",
      "alt": "Page constructor"
    }
  }
}
```

## Properties

| Property            | Type                                | Default | Description                             |
| ------------------- | ----------------------------------- | ------- | --------------------------------------- |
| `title` _required_  | `string`                            | —       | Section heading (plain text).           |
| `images` _required_ | `ImageDeviceProps \| {light, dark}` | —       | Responsive logo set. See below.         |
| `description`       | `string`                            | —       | YFM body text rendered under the title. |
| `animated`          | `boolean`                           | —       | Enables an entrance animation.          |

### `images`

| Property             | Type     | Default | Description                              |
| -------------------- | -------- | ------- | ---------------------------------------- |
| `desktop` _required_ | `string` | —       | Image URL for desktop viewports.         |
| `tablet` _required_  | `string` | —       | Image URL for tablet viewports.          |
| `mobile` _required_  | `string` | —       | Image URL for mobile viewports.          |
| `alt`                | `string` | —       | Alternative text for the rendered image. |

### Common properties

Inherits: `when`, `animated`. See the root README for details. (This block does not expose `anchor`, `visible`, `indent`, `theme`, or `context`.)

## Themed values

`images` accepts either a plain `ImageDeviceProps` object or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[Companies](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-companies-block--docs)
