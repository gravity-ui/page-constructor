Блок "Вопросы"

`type: 'questions-block'`

`title?: Title | string` - заголовок блока (слева)

`text?: string` - текст (с поддержкой yfm)

`additionalInfo?: string` - серый текст (с поддержкой yfm)

`links?: Link[]` - массив с объектами ссылок, см. раздел [Контент-блоки](?path=/story/information--common-types&viewMode=docs)

`buttons?: Button[]` - массив с объектами кнопок, см. раздел [Контент-блоки](?path=/story/information--common-types&viewMode=docs)

`items: QuestionItem[]`

- `title: string` - заголовок вопроса(справа)
- `text: string` - текст вопроса
- `link?: Link` - ссылка под текстом см. раздел [Link](http://localhost:7009/?path=/docs/компоненты-кнопки-и-ссылки-link--default)
- `listStyle?: 'dash' | 'disk'` - если текст содержит список, то он может быть либо с тире (dash), либо с точками (disk)
