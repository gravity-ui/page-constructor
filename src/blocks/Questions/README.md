Questions block

`type: 'questions-block'`

`title?: Title | string` — Block title (on the left)

`text?: string` — Text (with YFM support)

`additionalInfo?: string` — Gray text (with YFM support)

`links?: Link[]` — An array with link objects (see [Content-blocks](?path=/story/information--common-types&viewMode=docs))

`buttons?: Button[]` — An array with button objects (see [Content-blocks](?path=/story/information--common-types&viewMode=docs))

`items: QuestionItem[]`

- `title: string` — Question title (on the right)
- `text: string` — Question text
- `link?: Link` — Link below the text (see [Link](http://localhost:7009/?path=/docs/components-links-and-buttons-link--default))
- `listStyle?: 'dash' | 'disk'` — If the text contains a list, it may be either with a dash (dash) or with dots (disk).
