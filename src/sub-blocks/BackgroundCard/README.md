`type: "background-card"`

`url: string` — URL that opens when clicking the card

`background?: ImageObjectProps` — Card background image

`paddingBottom?: 's' | 'm' | 'l' | 'xl'` — Space between the text and the bottom of the card.

`backgroundColor?: string` — Background color

`border?: 'line' | 'shadow' | 'none'` — Border style. Note: when `backgroundColor` or non-default `theme` is set, `border` is automatically reset to `'none'` unless `forceBorder` is enabled.

`forceBorder?: boolean` — When `true`, the `border` value is applied as-is even if `backgroundColor` or a non-default `theme` is set. Default: `false`.

`title?: Title | string` — Card title

`text?: string` — Card description (with YFM support)

`additionalInfo?: string` — Gray text (with YFM support)

`links?: Link[]` — An array with link objects (see [Content blocks](?path=/docs/documentation-types--docs))

`buttons?: Button[]` — An array with button objects (see [Content blocks](?path=/docs/documentation-types--docs))

`colSizes?: Object` — more info [Content blocks](?path=/docs/documentation-types--docs#colsizes).
