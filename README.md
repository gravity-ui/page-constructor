# Page Constructor

## Install

```shell
npm install @gravity-ui/page-constructor
```

## Конструктор страниц

`page-constructor` это библиотека, которая позволяет отрисовывать веб-страницы или части страниц на основе данных в формате `json` (в дальнейшем будет добавлена поддержка `yaml` формата).

При создании страниц используется компонентный подход: страница составляется из набора готовых блоков, которые могут быть расположены в произвольном порядке. Каждому блоку соответсвует определенный тип и набор параметров во входных данных.

Формат входных данных и список доступных блоков можно посмотреть в [документации](http://localhost:7009/?path=/story/information--containers).

### Начало работы

Конструктор страниц импортируется в виде реакт-компонента. Для корректной работы его необходимо обернуть в `PageConstructorProvider`:

```jsx
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';

const Page: WithChildren<PageProps> = ({content}) => (
  <PageConstructorProvider>
    <PageConstructor content={content} />
  </PageConstructorProvider>
);
```

### Параметры

```typescript
interface PageConstructorProps {
    content: PageContent; //описание блоков в формате json
    shouldRenderBlock?: ShouldRenderBlock; // функция которая вызывается при отрисовке каждого блока и позволяет задавать условия его отображения
    custom?: Custom; //пользовательские блоки (см. раздел `Кастомизация`)
    renderMenu?: () => React.ReactNode; //функция, которая отрисовывает меню страницы с навигацией (планируется добавить отрисовку варианта меню по умолчанию)
}

interface PageConstructorProviderProps {
    isMobile?: boolean; //признак того, что код выполняется в режиме мобильного устройства
    locale?: LocaleContextProps; //информация о языке и домене (используется при генерации и оформлении ссылок)
    location?: Location; //api истории браузера или роутера, информация о url страницы
    metrika?: Metrika; //функции для отправки данных аналитики
    ssrConfig?: SSR; //содержит признак того, что код выполняется на стороне сервера
    theme?: 'light' | 'dark'; //тема, с которой будет отрисована страница
}

export interface PageContent extends Animatable {
    blocks: Block[];
    menu?: Menu;
    background?: MediaProps;
    footnotes?: string[];
}

interface Custom {
    blocks?: CustomItems;
    subBlocks?:CustomItems;
    headers?: CustomItems;
    loadable?: LoadableConfig;
}

type ShouldRenderBlock = (block: Block, blockKey: string) => Boolean;

interface Location = {
    history?: History;
    search?: string;
    hash?: string;
    pathname?: string;
    hostname?: string;
};

interface Locale = {
    lang?: Lang;
    tld?: string;
};

interface SSR = {
    isServer?: boolean;
}

interface Metrika = {
    metrika?: any;
    pixel?: any;
}

```

### Пользователькие блоки

Конструктор страниц поддерживает возможность работы с блоками, определенными пользователем в его приложении. Блоки представляют собой обычные реакт-компоненты.

Для того чтобы передать в конструктор свои блоки нужно:

1. Создать у себя в приложении блок

2. В коде создать объект, в котором ключом будет тип блока (строка), а значением импротированный компонент блока

3. Передать созданный объект в параметр `custom.blocks` или `custom.headers` комопнента `PageConstructor` (в `custom.headers` указываются блоки заголовков, которые должны рисоваться отдельно над общим контентом)

4. Теперь во входных данных (параметр `content`) можно использовать созданный блок, указав его тип и данные

Для того, чтобы при создании собственных блоков использовать миксины и стилевые переменные конструктора нужно в своем файле стилей добавить импорт:

```css
@import '~@gravity-ui/page-constructor/styles/styles.scss';
```

### Loadable блоки

Иногда нужно чтобы блок умел отрисовывать себя на основе данных, которые нужно загрузить, для этого используются loadable блоки.

Для того чтобы добавить пользовательские `loadable` блоки нужно передать в `PageConstructor` свойство `custom.loadable`, в котором ключами являются названия источников данных(строка) для компонента а значением объект

```typescript
export interface LoadableConfigItem {
  fetch: FetchLoadableData; // data loading method
  component: React.ComponentType; //blog to pass loaded data
}

type FetchLoadableData<TData = any> = (blockKey: string) => Promise<TData>;
```

### Сетка

Конструктор страниц использует сетку `bootstrap` и ее реализацию на основе реакт-компонентов, которую можно использовать в своем проекте (в том числе отдельно от конструтора).

Пример использования:

```jsx
import {Grid, Row, Col} from '@gravity-ui/page-constructor/';

const Page: WithChildren<PageProps> = ({children}) => (
  <Grid>
    <Row>
      <Col sizes={{lg: 4, sm: 6, all: 12}}>{children}</Col>
    </Row>
  </Grid>
);
```

### Блоки

Каждый из блоков представляет собой неделимый верхнеуровневый компонент, они лежат в папке `src/units/constructor/blocks`

### Саб-блоки

Саб-блоки это компоненты, которые могут использоваться в свойстве `children` блоков. В конфиге указывается список компонентов-детей из саб-блоков, при отрисовке отрендеренные саб-блоки будут переданы в блок как `children`.

### Как добавить новый блок в `page-constructor`

1. В директории `src/blocks` или `src/sub-blocks` создаем папку с кодом блока/саб-блока

2. Добавляем название блока или саб-блока в enum `BlockType` или `SubBlockType` и описываем его свойства в файле `src/models/blocks.ts` или `src/models/sub-blocks.ts` по аналогии с уже существующими

3. Добавляем экспорт блока в файле `src/blocks/index.ts` или саб-блока в файле `src/components/index.ts`

4. Добавляем новый компонент или блок в мэппинг в `src/constructor-items.ts`

5. Добавляем валидатор для нового блока, для этого нужно:

   - добавляем в папку блока/саб-блока файл `schema.ts`, где описываем валидатор параметров для данного компонента в формате [`json-schema`](http://json-schema.org/)
   - экспортируем его в файле `schema/validators/blocks.ts` или `schema/validators/sub-blocks.ts`
   - добавляем его в `enum` и `selectCases` в файле `schema/index.ts`

6. В директории блока добавляем файл `README.md` с описанием входных параметров

### Темы

`PageConstructor` поддерживает использование тем - для отдельных свойств блоков можно задавать разные значения в зависимости от выбранной в приложении темы.

Для того чтобы добавить тему к свойству блока нужно сделать следующее:

1. В файле `models/blocks.ts` определить тип нужного свойства блока с помощью дженерика `ThemeSupporting<T>`, где `T` - тип данного свойства

2. В файле с `react` компонентом блока нужно получить значение свойства с темой через `getThemedValue` и `ThemeValueContext` (примеры можно посмотреть в блоке `Banner.tsx`)

3. Добавить поддержку темы в валидатор свойства - в `schema.ts` файле блока обернуть данное свойство в `withTheme`

### i18n

Для того, чтобы используемая в проекте библиотека i18n работала корректно нужно выполнить инициализацию, где в `lang` устанавливается текущее значение локали в проекте, пример:

```typescript
import {configure, Lang} from '@gravity-ui/page-constructor';

configure({lang: Lang.En});
```

## Разработка

```bash
npm ci
npm run dev
```
