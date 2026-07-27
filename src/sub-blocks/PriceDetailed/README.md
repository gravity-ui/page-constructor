# PriceDetailed

> ⚠️ **Deprecated.** This sub-block is deprecated and will be removed in a future major release. Prefer [`PriceCard`](../PriceCard/README.md) for pricing cards.

Renders a detailed pricing comparison table: each item has a title, a per-unit description, an optional label, and a list of details (either a marked list or a settings list). Supports combined or separate layout, foldable details, and per-color default label text.

## Sub-block type

`type: 'price-detailed'`

## Used in

Accepted as `children` by `CardLayout`, `Slider`, `SliderOld`.

## Example

```json
{
  "type": "price-detailed",
  "priceType": "settings",
  "description": {"titleSize": "l", "descriptionSize": "m", "titleColor": "cornflower"},
  "details": {"titleSize": "s", "descriptionSize": "m"},
  "items": [
    {
      "title": "Free",
      "detailedTitle": "",
      "description": "For use by individuals and small teams",
      "label": {"color": "blue", "text": "Free", "size": "s"},
      "items": [{"title": "up to 5 users", "description": "up to 5 users"}]
    }
  ]
}
```

## Properties

| Property                      | Type                                      | Default        | Description                                                                   |
| ----------------------------- | ----------------------------------------- | -------------- | ----------------------------------------------------------------------------- |
| `type` _required_             | `'price-detailed'`                        | —              | Sub-block discriminator.                                                      |
| `when`                        | `string`                                  | —              | Conditional rendering expression.                                             |
| `animated`                    | `boolean`                                 | —              | Enables scroll-triggered entrance animation.                                  |
| `items` _required_            | `PriceItem[]`                             | —              | Pricing columns/rows. See below.                                              |
| `description`                 | `object`                                  | —              | Sizing/color overrides for the description block.                             |
| `description.titleSize`       | `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`       | `'l'`          | Description title size.                                                       |
| `description.descriptionSize` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`       | `'m'`          | Description body size.                                                        |
| `description.titleColor`      | `'cornflower' \| 'black'`                 | `'cornflower'` | Description title color.                                                      |
| `details`                     | `object`                                  | —              | Sizing overrides for the details block.                                       |
| `details.titleSize`           | `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`       | `'s'`          | Details title size.                                                           |
| `details.descriptionSize`     | `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`       | `'m'`          | Details body size.                                                            |
| `priceType`                   | `'marked-list' \| 'settings'`             | `'settings'`   | Layout of each item's `items` list.                                           |
| `numberGroupItems`            | `3 \| 4 \| 5`                             | —              | Items per row in the combined layout.                                         |
| `isCombined`                  | `boolean`                                 | `false`        | Use the combined grid layout instead of separate columns.                     |
| `useMixedView`                | `boolean`                                 | `false`        | Mix list item views (extended details on desktop, collapse on tablet/mobile). |
| `foldable`                    | `{title*required, size?, titleColor?}`    | —              | Makes the details section collapsible with a toggle.                          |
| `labelsDefaultText`           | `{blue?, green?, yellow?, purple?, red?}` | —              | Default text used for each label color when an item label has no `text`.      |

### `PriceItem` object

| Property                 | Type                                           | Default | Description                                                                                                                      |
| ------------------------ | ---------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `title` _required_       | `string`                                       | —       | Plan title (e.g. `"Free"`, `"100$"`).                                                                                            |
| `description` _required_ | `string` (YFM)                                 | —       | Plan description.                                                                                                                |
| `detailedTitle`          | `string`                                       | —       | Suffix/qualifier shown next to the title (e.g. `"/ month*"`).                                                                    |
| `label`                  | `{color*required, text?, size?}`               | —       | Colored label badge. `color`: `'blue' \| 'green' \| 'yellow' \| 'purple' \| 'red'`. `size`: `'xs' \| 's' \| 'sm' \| 'm' \| 'l'`. |
| `items`                  | `PriceDetailsList[] \| PriceDetailsSettings[]` | —       | Detail list. With `priceType: 'marked-list'` each item requires `text`; with `'settings'` each requires `title` + `description`. |
| `analyticsEvents`        | `AnalyticsEvent \| AnalyticsEvent[]`           | —       | Analytics events.                                                                                                                |

## Themed values

This sub-block does not consume themed media; sizing/color controls above are explicit.

## Storybook

[PriceDetailed](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-cards-pricedetailed-deprecated--docs)
