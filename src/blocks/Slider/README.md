Слайдер поддерживает 2 типа контента - загружаемый и из конфига. Загружаемый добавляется через свойство `loadable`, а из конфига - через `children`

`type: "slider-block"`

`animated?: bool` - вкл/выкл анимации для блока (включена по умолчанию)

`dots?: bool` - признак нужно ли показывать точки навигации

`arrows? bool` - признак нужно ли показывать стрелки навигации

`title?: Title`: заголовок;

`description?: строка`:описание;

`randomOrder?: bool` - включает рандомный порядок слайдов;

`slidesToShow?: Record<'all' | 'sm' | 'md' | 'lg' | 'xl', число> | число` - сколько слайдов показывать на экранах разной ширины. Действует как переопределение значений по умолчанию. Переопределить значение можно для каждой ширины экрана. Также можно задать одно число - тогда количество слайдов будет всегда одинаковое. (кроме мобильных, там всегда 1)

Значения по умолчанию:

- `xl`: 3
- `lg`: 3
- `md`: 2
- `sm`: 1

`loadable: Loadable` - загружаемый контент, на данный момент поддерживаются источники данных:

- `events` - мероприятия
- `blog` - посты блога

`children: Block[]` - в слайдер можно добавить дочерние блоки, которые будут отображаться в виде его карточек. Так же в слайдер можно добавить компонент с вложенными чайлдами. И чтобы каждый nested child отобразить в отдельной карточке, у child должно быть поле items - это и есть nested child.

На данный момент поддерживаются следующие блоки:

- `Quote` - цитата
- [`BasicCard` - основная карточка](?path=/story/компоненты-карточки-basiccard--default&viewMode=docs)
- [`Banner` - баннер](?path=/story/блоки-banner--default&viewMode=docs)
- [`Partner` - карточка партнера](?path=/story/компоненты-карточки-partner--default&viewMode=docs)
- [`Price Detailed` - тарифы](?path=/story/компоненты-карточки-pricedetailed--marked-list&viewMode=docs)
- [`BackgroundCard` - карточка с бэкграундом](?path=/story/компоненты-карточки-backgroundcard--default&viewMode=docs)
- [`CardWithImage` - карточка с фотографией над заголовком](?path=/story/компоненты-карточки-cardwithimage--default&viewMode=docs)
- [`MediaCard` - карточка с картинкой](?path=/story/блоки-media--default&viewMode=docs)
- [`NewsCard` - карточка новостей](?path=/story/компоненты-карточки-newscard--default&viewMode=docs)
- [`TutorialCard` - карточка с иконкой](?path=/story/компоненты-карточки-tutorialcard--default&viewMode=docs)
