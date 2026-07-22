# Divider

A spacing/separator element that adds vertical space between sibling items, optionally drawing a horizontal line. Useful for tuning rhythm inside a layout.

## Sub-block type

`type: 'divider'`

## Used in

Registered both as a sub-block and as a standalone block; appears in the page `blocks` array.

## Example

```json
{
  "type": "divider",
  "size": "m"
}
```

With a horizontal line:

```json
{
  "type": "divider",
  "size": "l",
  "border": true
}
```

## Properties

| Property          | Type                                                                   | Default | Description                                                       |
| ----------------- | ---------------------------------------------------------------------- | ------- | ----------------------------------------------------------------- |
| `type` _required_ | `'divider'`                                                            | —       | Sub-block discriminator.                                          |
| `when`            | `string`                                                               | —       | Conditional rendering expression.                                 |
| `size`            | `'0' \| 'xxs' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'xxl' \| 'xxxl'` | `'m'`   | Vertical height of the divider. `'0'` collapses spacing entirely. |
| `border`          | `boolean`                                                              | —       | When `true`, draws a horizontal line across the full width.       |

## Themed values

None — `Divider` has no themed properties.

## Storybook

[Divider](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-divider--docs)
