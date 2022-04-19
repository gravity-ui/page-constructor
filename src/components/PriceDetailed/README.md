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

`label?: object` - custom label settings for current price

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
    title: Показать детали
    size: 'm'
    titleColor: 'cornflower'
  labelsDefaultText:
    blue: 'Базовый'
    green: 'Стандарт'
    yellow: 'Бизнес'
    purple: 'Ультима'
  items:
    - title: 100 ₽
      detailedTitle: '/ месяц*'
      description: Небольшие редакторские правки
      label:
        color: 'green'
        text: 'New label'
        size: 'm'
      items:
        - title: Метка на GitHub
          description: editorial
```

Example, with labels. - https://cloud-preprod.yandex.ru/services/e2e-test?versionId=10114#slider-nested-children:

```yaml
- type: price-detailed
  priceType: 'marked-list'
  description:
    titleColor: 'black'
  labelsDefaultText:
    blue: 'Базовый'
    green: 'Стандарт'
    yellow: 'Бизнес'
    purple: 'Ультима'
  items:
    - title: '258 ₽'
      detailedTitle: '/ месяц*'
      description: В таблице мы привели среднее время от создания пул-реквеста до публикации вашего текста, а также размер гранта для каждого случая.
      label:
        color: 'green'
        text: 'New label'
      items:
        - text: '0-5 человек'
        - text: '6-100 человек'
    - title: '000 ₽'
      detailedTitle: '/ месяц*'
      description: 'Для средних компаний!!!'
      label:
        color: 'green'
      items:
        - text: '0-5 человек'
        - text: '6-100 человек'
        - text: '100-200 человек'
        - text: '200-500 человек'
    - title: '000 ₽'
      detailedTitle: '/ месяц*'
      description: 'Для средних компаний!!!'
      label:
        color: 'purple'
      items:
        - text: '0-5 человек'
        - text: '6-100 человек'
        - text: '200-500 человек'
    - title: '000 ₽'
      description: 'Для средних компаний!!!'
      label:
        color: 'yellow'
      items:
        - text: '0-5 человек'
        - text: '6-100 человек'
    - title: '000 ₽'
      description: 'Для средних компаний!!!'
      label:
        color: 'blue'
      items:
        - text: '0-5 человек'
        - text: '6-100 человек'
```

![](https://storage.cloud-preprod.yandex.net/cloud-www-assets/wiki/Price%20Detailed.jpg)

Example, combined (Grants) - https://cloud-preprod.yandex.ru/services/e2e-test?versionId=10114#simple-block-grants-price-detailed-5:

```yaml
  - type: 'simple-block'
    ...
    children:
    - type: price-detailed
      priceType: 'settings'
      numberGroupItems: 5
      isCombined: true
      useMixedView: true
      foldable:
        title: Показать детали
      items:
      - title: 100 ₽
        description: Небольшие редакторские правки
        items:
        - title: Метка на GitHub
          description: editorial
        - title: Рассмотрим
          description: За 3 рабочих дня
      - title: 300–1000 ₽
        description: Смысловые дополнения, исправления, улучшения текстов
        items:
        - title: Метка на GitHub
          description: improvement
      - title: 500–2000 ₽
        description: Новые примеры использования API, CLI и Terraform; примеры кода
        items:
        - title: Баллы
          description: 5–20
      - title: 1000–3000 ₽
        description: Новые инструкции; существенные обновления опубликованных практических руководств или концепций
        items:
        - title: Метка на GitHub
          description: major-update
      - title: 5000–10 000 ₽
        description: Новое практическое руководство
        items:
        - title: Метка на GitHub
          description: new-solution
        - title: Рассмотрим
          description: За 20 рабочих дней
        - title: Опубликуем
          description: За месяц
        - title: Баллы
          description: 50–100
```

![](https://storage.cloud-preprod.yandex.net/cloud-www-assets/wiki/Price%20Detailed%20-%201.jpg)
