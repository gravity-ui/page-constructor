![PriceDetailed](https://img.shields.io/static/v1?label=Status&message=Deprecated&color=red) Use [PriceCard](?path=/docs/components-cards-pricecard--default) instead.

`type: 'price-detailed'`

`items: `[PriceItemProps](#PriceItemProps)[] - prices

`description?: object` - description settings

- `titleSize?: `[TextSize](#TextSize). (Default: `l`)
- `descriptionSize?: `[TextSize](#TextSize). (Default: `m`)
- `titleColor?: `[PriceDescriptionColor](#PriceDescriptionColor). (Default: `cornflower`)

`details?: object` - details settings

- `titleSize?: `[TextSize](#TextSize). (Default: `s`)
- `descriptionSize?: `[TextSize](#TextSize). (Default: `m`)

`priceType?: `[PriceDetailsType](#PriceDetailsType) - details view. (Default: `settings`)

`numberGroupItems?: 3 | 4 | 5` - if you want to group prices, you need to choose how many prices will be in group. (Default: `1`)

`isCombined?: boolean` - if you need to display prices in table. For example: Grants. (Default: `false`)

`useMixedView?: boolean` - if you need to extended details for desktop (>1081px), and extend-collapse for Tablet and Mobile (<1081px). (Default: `false`)

`foldable?: object` - settings for foldable details

- `title: string`
- `size?: `[TextSize](#TextSize). (Default: as 'descriptionSize' default `m`)
- `titleColor?: `[PriceDescriptionColor](#PriceDescriptionColor). (Default: `cornflower`)

`labelsDefaultText?: Record<`[PriceLabelColor](#PriceLabelColor)`, string>` - group colorful labels. For each color you need to add label name, it is labels for all prices.

## <a name="PriceDetailsSettingsProps">PriceDetailsSettingsProps</a>

`title: string`

`description: string`

## <a name="PriceDetailsListProps">PriceDetailsListProps</a>

`text: string`

## <a name="PriceDescriptionProps">PriceDescriptionProps</a>

`title: string`

`description: string`

`detailedTitle?: string`

`label?: object` — Custom label settings for current price

- `color: `[PriceLabelColor](#PriceLabelColor)
- `text?: string`
- `size?: `[TextSize](#TextSize). (Default: as 'descriptionSize' default `m`)

## <a name="PriceDetailsProps">PriceDetailsProps</a>

`items?: `[PriceDetailsSettingsProps](#PriceDetailsSettingsProps)[] | [PriceDetailsListProps](PriceDetailsListProps)[]

### <a name="TextSize">TextSize: 's' | 'm' | 'l' </a>

### <a name="PriceLabelColor">PriceLabelColor: 'blue' | 'green' | 'yellow' | 'purple' </a>

### <a name="PriceDescriptionColor">PriceDescriptionColor: 'cornflower' | 'black' </a>

### <a name="PriceDetailsType">PriceDetailsType: 'marked-list' | 'settings' </a>

### <a name="PriceItemProps">PriceItemProps:</a> [PriceDetailsProps](#PriceDetailsProps) & [PriceDescriptionProps](#PriceDescriptionProps)

Example, with all fields:

```yaml
- type: price-detailed
  priceType: 'settings'
  numberGroupItems: 5
  isCombined: true
  useMixedView: true
  description:
    titleSize: 'l'
    descriptionSize: 'm'
    titleColor: 'cornflower'
  details:
    titleSize: 's'
    descriptionSize: 'm'
  foldable:
    title: Show details
    size: 'm'
    titleColor: 'cornflower'
  labelsDefaultText:
    blue: 'Basic'
    green: 'Standard'
    yellow: 'Business'
    purple: 'Ultima'
  items:
    - title: ₽100
      detailedTitle: '/ month*'
      description: Small edits
      label:
        color: 'green'
        text: 'New label'
        size: 'm'
      items:
        - title: GitHub label
          description: editorial
```

```yaml
- type: price-detailed
  priceType: 'marked-list'
  description:
    titleColor: 'black'
  labelsDefaultText:
    blue: 'Basic'
    green: 'Standard'
    yellow: 'Business'
    purple: 'Ultima'
  items:
    - title: '100$'
      detailedTitle: '/ month*'
      description: The table shows the average period from creating a Pull request to publishing your text and the size of grant for each case.
      label:
        color: 'green'
        text: 'New label'
      items:
        - text: '0-5 people'
        - text: '6-100 people'
    - title: '₽000'
      detailedTitle: '/ month*'
      description: 'For medium companies!!!'
      label:
        color: 'green'
      items:
        - text: '0-5 people'
        - text: '6-100 people'
        - text: '100-200 people'
        - text: '200-500 people'
    - title: '₽000'
      detailedTitle: '/ month*'
      description: 'For medium companies!!!'
      label:
        color: 'purple'
      items:
        - text: '0-5 people'
        - text: '6-100 people'
        - text: '200-500 people'
    - title: '₽000'
      description: 'For medium companies!!!'
      label:
        color: 'yellow'
      items:
        - text: '0-5 people'
        - text: '6-100 people'
    - title: '₽000'
      description: 'For medium companies!!!'
      label:
        color: 'blue'
      items:
        - text: '0-5 people'
        - text: '6-100 people'
```
