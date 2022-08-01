`type: "card-layout-block"`

`title?: Title | string` - заголовок

`description?: string` - текст

`colSizes?: Object` - размеры одной карточки в колонках на разных размерах экрана, значение от 1 до 12 колонок, где 12 колонок означает, что одна карточка занимает всю ширину экрана

- `all: число` - на всех экранах
- `sm: число` - на экранах шире 577px
- `md: число` - на экранах шире 769px
- `lg: число` - на экранах шире 1081px
- `xl: число` - на экранах шире 1185px

`children:[]` - сюда можно добавить массив любых карточек, которые у нас есть

На данный момент поддерживаются следующие блоки:

- [`BasicCard` - основная карточка](?path=/story/компоненты-карточки-basiccard--default&viewMode=docs)
- [`Partner` - карточка партнера](?path=/story/компоненты-карточки-partner--default&viewMode=docs)
- [`Price Detailed` - тарифы](?path=/story/компоненты-карточки-pricedetailed--marked-list&viewMode=docs)
- [`BackgroundCard` - карточка с бэкграундом](?path=/story/компоненты-карточки-backgroundcard--default&viewMode=docs)
- [`CardWithImage` - карточка с фотографией над заголовком](?path=/story/компоненты-карточки-cardwithimage--default&viewMode=docs)
- [`NewsCard` - карточка новостей](?path=/story/компоненты-карточки-newscard--default&viewMode=docs)
- [`TutorialCard` - карточка с иконкой](?path=/story/компоненты-карточки-tutorialcard--default&viewMode=docs)
