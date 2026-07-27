# PriceCard

Renders a pricing card: a title, a price (with optional period and details), a description, a checklist of features, and optional buttons and links. Typically placed in a grid to compare plans.

## Sub-block type

`type: 'price-card'`

## Used in

Accepted as `children` by `CardLayout`, `Slider`, `SliderOld`; also usable as a card payload in `FilterBlock` items.

## Example

```json
{
  "type": "price-card",
  "title": "Lorem ipsum",
  "price": "299.99 $",
  "pricePeriod": "month",
  "priceDetails": "plan details",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "list": [
    "Ut enim ad minim veniam [quis nostrud](https://example.com) exercitation.",
    "Ut enim ad minim veniam [quis nostrud](https://example.com) exercitation."
  ],
  "buttons": [
    {"text": "Choose plan", "url": "https://example.com", "width": "max", "theme": "action"}
  ],
  "theme": "light",
  "backgroundColor": "#CCDAFF"
}
```

## Properties

| Property           | Type                             | Default | Description                                                                  |
| ------------------ | -------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `type` _required_  | `'price-card'`                   | —       | Sub-block discriminator.                                                     |
| `when`             | `string`                         | —       | Conditional rendering expression.                                            |
| `border`           | `'line' \| 'shadow' \| 'none'`   | —       | Card border style.                                                           |
| `theme`            | `'default' \| 'dark' \| 'light'` | —       | Content color theme.                                                         |
| `title` _required_ | `string` (YFM)                   | —       | Plan name rendered as YFM.                                                   |
| `price` _required_ | `string`                         | —       | Price value (e.g. `"299.99 $"`).                                             |
| `pricePeriod`      | `string`                         | —       | Billing period shown after the price (e.g. `"month"`).                       |
| `priceDetails`     | `string`                         | —       | Small print under the price.                                                 |
| `description`      | `string`                         | —       | Short plan description.                                                      |
| `list`             | `string[]`                       | —       | Feature list; each item rendered with a check icon (YFM/Markdown supported). |
| `buttons`          | `ButtonProps[]`                  | —       | CTA buttons (each requires `text` + `url`).                                  |
| `links`            | `LinkProps[]`                    | —       | Secondary links (each requires `text` + `url`).                              |
| `backgroundColor`  | `string`                         | —       | Custom card background color.                                                |
| `controlPosition`  | `'content' \| 'footer'`          | —       | Where buttons/links render within the card.                                  |

## Themed values

`backgroundColor` and color-bearing fields resolve themed values (`T | {light: T, dark: T}`) at runtime via the active theme.

## Storybook

[PriceCard](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-cards-pricecard--docs)
