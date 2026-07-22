# Share

Renders a row of social-network share buttons that share the current page URL.

## Block type

`type: 'share-block'`

## When to use

- You want to let visitors share the current page on social networks.
- You need a compact, localized share strip with analytics events on click.

## Example

```json
{
  "type": "share-block",
  "title": "Share on social networks",
  "items": ["facebook", "vk", "telegram", "twitter", "linkedin"]
}
```

## Properties

| Property           | Type                                                                 | Default                  | Description                                                                  |
| ------------------ | -------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| `items` _required_ | `Array<'telegram' \| 'facebook' \| 'twitter' \| 'vk' \| 'linkedin'>` | —                        | Social networks to render, in order.                                         |
| `title`            | `string` (YFM)                                                       | localized "Share" string | Heading above the buttons. When omitted, a localized default title is shown. |

### Common properties

Inherits: `anchor`, `visible`, `indent`, `qa`, `className`, `animated`, `theme`, `when`, `context`. See root README.

## Notes

The shared URL is derived from the `LocationContext` (hostname + pathname) provided by `PageConstructorProvider`. Click events are reported through the analytics handler under the `shareButton` event name.

## Themed values

This block has no themed-value properties.

## Storybook

[Share](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-share--docs)
