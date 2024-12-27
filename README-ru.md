# @gravity-ui/page-constructor &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/page-constructor)](https://www.npmjs.com/package/@gravity-ui/page-constructor) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/page-constructor/ci.yml?branch=main&label=CI)](https://github.com/gravity-ui/page-constructor/actions/workflows/ci.yml?query=branch:main) [![Release](https://img.shields.io/github/actions/workflow/status/gravity-ui/page-constructor/release.yml?branch=main&label=Release)](https://github.com/gravity-ui/page-constructor/actions/workflows/release.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.gravity-ui.com/page-constructor/)

## Page constructor

`Page-constructor` (конструктор страниц) — это библиотека, которая позволяет отрисовывать веб-страницы или их части на основе данных в формате `JSON` (в дальнейшем будет добавлена поддержка формата `YAML`).

При создании страниц используется компонентный подход: страница составляется из набора готовых блоков, которые могут быть расположены в произвольном порядке. Каждому блоку соответствует определенный тип и набор параметров во входных данных.

Формат входных данных и список доступных блоков можно посмотреть в [документации](https://preview.gravity-ui.com/page-constructor/?path=/docs/documentation-blocks--docs).

## Установка

```shell
npm install @gravity-ui/page-constructor
```

## Необходимые зависимости

Для начала работы с пакетом в проекте необходимо предварительно установить следующие зависимости: `@diplodoc/transform`, `@gravity-ui/uikit`, `react`. Подробную информацию можно найти в разделе `peerDependencies` файла `package.json`.

### Начало работы

Конструктор страниц импортируется в виде React-компонента. Для корректной работы его необходимо обернуть в `PageConstructorProvider`:

```jsx
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';

const Page: React.PropsWithChildren<PageProps> = ({content}) => (
  <PageConstructorProvider>
    <PageConstructor content={content} />
  </PageConstructorProvider>
);
```

### Параметры

```typescript
interface PageConstructorProps {
  content: PageContent; //Blocks data in JSON format.
  shouldRenderBlock?: ShouldRenderBlock; // A function that is invoked when rendering each block and  lets you set conditions for its display.
  custom?: Custom; //Custom blocks (see `Customization`).
  renderMenu?: () => React.ReactNode; //A function that renders the page menu with navigation (we plan to add rendering for the default menu version).
  navigation?: NavigationData; // Navigation data for using navigation component in JSON format
}

interface PageConstructorProviderProps {
  isMobile?: boolean; //A flag indicating that the code is executed in mobile mode.
  locale?: LocaleContextProps; //Info about the language and domain (used when generating and formatting links).
  location?: Location; //API of the browser or router history, the page URL.
  analytics?: AnalyticsContextProps; // function to handle analytics event

  ssrConfig?: SSR; //A flag indicating that the code is run on the server size.
  theme?: 'light' | 'dark'; //Theme to render the page with.
  mapsContext?: MapsContextType; //Params for map: apikey, type, scriptSrc, nonce
}

export interface PageContent extends Animatable {
  blocks: Block[];
  menu?: Menu;
  background?: MediaProps;
}

interface Custom {
  blocks?: CustomItems;
  subBlocks?: CustomItems;
  headers?: CustomItems;
  loadable?: LoadableConfig;
}

type ShouldRenderBlock = (block: Block, blockKey: string) => Boolean;

interface Location {
  history?: History;
  search?: string;
  hash?: string;
  pathname?: string;
  hostname?: string;
}

interface Locale {
  lang?: Lang;
  tld?: string;
}

interface SSR {
  isServer?: boolean;
}

interface NavigationData {
  logo: NavigationLogo;
  header: HeaderData;
}

interface NavigationLogo {
  icon: ImageProps;
  text?: string;
  url?: string;
}

interface HeaderData {
  leftItems: NavigationItem[];
  rightItems?: NavigationItem[];
}

interface NavigationLogo {
  icon: ImageProps;
  text?: string;
  url?: string;
}
```

### Серверные утилиты

Пакет включает набор серверных утилит для преобразования контента.

```ts
const {fullTransform} = require('@gravity-ui/page-constructor/server');

const {html} = fullTransform(content, {
  lang,
  extractTitle: true,
  allowHTML: true,
  path: __dirname,
  plugins,
});
```

Для преобразования Yandex Flavored Markdown в HTML используется пакет `diplodoc/transfrom`, который входит в peer-зависимости.

Эти утилиты можно также использовать в кастомных компонентах или других частях проекта.

```ts
const {
  typografToText,
  typografToHTML,
  yfmTransformer,
} = require('@gravity-ui/page-constructor/server');

const post = {
  title: typografToText(title, lang),
  content: typografToHTML(content, lang),
  description: yfmTransformer(lang, description, {plugins}),
};
```

Список других доступных утилит можно найти в [этом разделе](https://github.com/gravity-ui/page-constructor/tree/main/src/text-transform).

### Пользователькие блоки

Конструктор страниц поддерживает возможность работы с блоками, определенными пользователем в его приложении. Блоки представляют собой обычные React-компоненты.

Для того чтобы передать в конструктор свои блоки, нужно:

1. Создать у себя в приложении блок.

2. В коде создать объект, в котором ключом будет тип блока (строка), а значением – импортированный компонент блока.

3. Передать созданный объект в параметр `custom.blocks`, `custom.headers` или `custom.subBlocks` компонента `PageConstructor` (в `custom.headers` указываются блоки заголовков, которые должны рендериться отдельно над общим контентом).

4. Теперь во входных данных (параметр `content`) можно использовать созданный блок, указав его тип и данные.

Для того чтобы при создании собственных блоков использовать миксины и стилевые переменные конструктора, нужно в своем файле стилей добавить импорт:

```css
@import '~@gravity-ui/page-constructor/styles/styles.scss';
```

### Динамически загружаемые блоки

Иногда нужно, чтобы блок рендерился на основе загружаемых данных. В таких случаях применяются динамически загружаемые (`loadable`) блоки.

Для того чтобы добавить пользовательские `loadable` блоки, нужно передать в `PageConstructor` свойство `custom.loadable`, в котором ключами являются названия источников данных (строка) для компонента, а значением — объект.

```typescript
export interface LoadableConfigItem {
  fetch: FetchLoadableData; // data loading method
  component: React.ComponentType; //blog to pass loaded data
}

type FetchLoadableData<TData = any> = (blockKey: string) => Promise<TData>;
```

### Сетка

`PageConstructor` использует сетку `bootstrap` и ее реализацию на основе React-компонентов, которую можно использовать в проекте (в том числе отдельно от конструктора).

Пример использования:

```jsx
import {Grid, Row, Col} from '@gravity-ui/page-constructor';

const Page: React.FC<PageProps> = ({children}) => (
  <Grid>
    <Row>
      <Col sizes={{lg: 4, sm: 6, all: 12}}>{children}</Col>
    </Row>
  </Grid>
);
```

### Навигация

Элемент навигации по страницам также может быть реализован отдельно от конструктора:

```jsx
import {Navigation} from '@gravity-ui/page-constructor';

const Page: React.FC<PageProps> = ({data, logo}) => <Navigation data={data} logo={logo} />;
```

### Блоки

Каждый из блоков представляет собой неделимый верхнеуровневый компонент. Все блоки хранятся в директории `src/units/constructor/blocks`.

### Саб-блоки

Саб-блоки — это компоненты, которые могут использоваться в свойстве `children` основного блока. В конфигурации указывается список дочерних компонентов из саб-блоков, которые после рендеринга будут переданы в блок как `children`.

### Как добавить новый блок в `page-constructor`

1. В директории `src/blocks` или `src/sub-blocks` создайте папку с кодом блока или саб-блока.

2. Добавьте название блока или саб-блока в перечисление `BlockType` или `SubBlockType` и опишите его свойства в файле `src/models/constructor-items/blocks.ts` или `src/models/constructor-items/sub-blocks.ts` по аналогии с уже существующими.

3. Добавьте экспорт блока в файле `src/blocks/index.ts` или саб-блока в файле `src/sub-blocks/index.ts`.

4. Добавьте новый компонент или блок в маппинг в файле `src/constructor-items.ts`.

5. Добавьте валидатор для нового блока:

   - Добавьте файл `schema.ts` в директорию блока или саб-блока. В этом файле опишите валидатор параметров для данного компонента в формате [`json-schema`](http://json-schema.org/).
   - Экспортируйте его в файл `schema/validators/blocks.ts` или `schema/validators/sub-blocks.ts`.
   - Добавьте его в `enum` или `selectCases` в файле `schema/index.ts`.

6. В директории блока добавьте файл `README.md` с описанием входных параметров.
7. В директории блока добавьте демо-Storybook в папку `__stories__`. Весь демо-контент для компонента `Story` помещается в файл `data.json` в соответствующей директории. Компонент `Story` должен принимать тип свойств блока, иначе в Storybook будут отображаться некорректные данные.
8. Добавьте шаблон данных блока в папку `src/editor/data/templates/`. Имя файла должно соответствовать типу блока.
9. При необходимости добавьте иконку превью блока в папку `src/editor/data/templates/`. Имя файла должно соответствовать типу блока.

### Темы

`PageConstructor` поддерживает использование тем: для отдельных свойств блоков можно задавать разные значения в зависимости от выбранной в приложении темы.

Для добавления темы в свойство блока:

1. В файле `models/blocks.ts` определите тип нужного свойства блока через обобщение `ThemeSupporting<T>`, где `T` — тип данного свойства.

2. В файле с React-компонентом блока получите значение свойства с темой через хук `getThemedValue` и `useTheme` (примеры можно посмотреть в блоке `MediaBlock.tsx`).

3. Добавьте поддержку темы в валидатор свойства: в файле `schema.ts` блока оберните данное свойство в `withTheme`.

### i18n

Библиотека `page-constructor` основана на UIKit и работает с ее экземпляром `i18n`. Для настройки интернационализации используйте `configure` из UIKit:

```typescript
import {configure} from '@gravity-ui/uikit';

configure({
  lang: 'ru',
});
```

### Карты

Для использования карт необходимо указать тип карты, `scriptSrc` и `apiKey` в поле `mapContext` в `PageConstructorProvider`.

Для режима разработки переменные окружения можно определить в файле `.env.development` в корне проекта.
Например, `STORYBOOK_GMAP_API_KEY` содержит значение `apiKey` Google Maps.

### Аналитика

#### Инициализация

Для начала работы с аналитикой передайте обработчик в конструктор. Такой обработчик создается на стороне проекта. Он принимает объекты событий `default` и `custom` и будет срабатывать по клику на кнопки, ссылки, элементы навигации и контролы. Так как для обработки всех событий используется один обработчик, при его создании важно учитывать особенности обработки разных типов событий. Для построения сложной логики предусмотрены предопределенные поля.

Для автоматического запуска настроенных событий передайте `autoEvents: true` в конструктор.

```ts
function sendEvents(events: MyEventType []) {
  ...
}

<PageConstructorProvider
    ...

    analytics={{sendEvents, autoEvents: true}}

    ...
/>
```

У объекта события есть только одно обязательное поле — `name`. Также он включает предопределенные поля для управления сложной логикой. Например, `counter.include` позволяет отправлять событие в конкретный счетчик, если в проекте используются несколько аналитических систем.

```ts
type AnalyticsEvent<T = {}> = T & {
  name: string;
  type?: string;
  counters?: AnalyticsCounters;
  context?: string;
};
```

Тип события для проекта можно настроить.

```ts
type MyEventType = AnalyticsEvent<{
  [key: string]?: string; // only a 'string' type is supported
}>;
```

#### Селектор счетчика

Событие можно привязать к конкретной аналитической системе.

```ts
type AnalyticsCounters = {
  include?: string[]; // array of analytics counter ids that will be applied
  exclude?: string[]; // array of analytics counter ids that will not be applied
};
```

#### Параметр `context`

Используйте параметр `context` для определения точки вызова события.

Используйте предложенный ниже селектор или создайте логику под нужды проекта.

```ts
// analyticsHandler.ts
if (isCounterAllowed(counterName, counters)) {
  analyticsCounter.reachGoal(counterName, name, parameters);
}
```

#### Зарезервированные типы событий

Ряд предопределенных типов событий применяется для обозначения автоматически настроенных событий. Их можно использовать, например, для фильтрации событий по умолчанию.

```ts
enum PredefinedEventTypes {
  Default = 'default-event', // default events which fire on every button click
  Play = 'play', // React player event
  Stop = 'stop', // React player event
}
```

## Разработка

```bash
npm ci
npm run dev
```

### Работа с Vite

```ts
import react from '@vitejs/plugin-react-swc';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
  plugins: [
    react(),
    dynamicImport({
      filter: (id) => id.includes('/node_modules/@gravity-ui/page-constructor'),
    }),
  ],
});
```

Для работы с Vite необходимо установить плагин `vite-plugin-dynamic-import` и настроить конфигурацию для поддержки динамических импортов.

## Процесс релиза

В стандартной практике используются два основных вида коммитов:

1. `Fix` — тип коммита для исправления багов в базе кода (соответствует `PATCH` в семантическом версионировании).
2. `Feat` — тип коммита для добавления новых функций в базу кода (соответствует `MINOR` в семантическом версионировании).
3. `BREAKING CHANGE`— тип коммита с подвалом «BREAKING CHANGE:» или знаком «!» после типа/области; указывает на критические изменения в API (соответствует `MAJOR` в семантическом версионировании). Может быть частью любого типа коммита.
4. Для ручной настройки версии релизного пакета укажите `Release-As: <version>` в сообщении коммита, например:

```bash
git commit -m 'chore: bump release

Release-As: 1.2.3'
```

Всю необходимую информацию можно найти [здесь](https://www.conventionalcommits.org/en/v1.0.0/).

После того как пулл-реквест (PR) будет одобрен владельцами кода и пройдет все проверки, выполните следующие шаги:

1. Проверьте наличие PR для релиза от робота (например, `chore(main): release 0.0.0`) с изменениями другого контрибьютора. Если такой PR есть, выясните, почему он не был слит. Если контрибьютор согласен на релиз общей версии, переходите к следующему шагу. Если нет, попросите его выпустить свою версию, а затем переходите к следующему шагу.
2. Объедините свои изменения в один коммит (`squash`) и выполните слияние (`merge`) PR. Важно, чтобы новая версия была выпущена с помощью Github-Actions.
3. Подождите, пока робот создаст пулл-реквест с новой версией пакета и внесет информацию об изменениях в `CHANGELOG.md`. Следите за процессом на вкладке [**Actions**](https://github.com/gravity-ui/page-constructor/actions).
4. Проверьте внесенные изменения в `CHANGELOG.md` и одобрите PR робота.
5. Выполните `squash` и `merge` вашего PR. Следите за процессом релиза на вкладке [**Actions**](https://github.com/gravity-ui/page-constructor/actions).

### Релиз альфа-версий

Если необходимо выпустить альфа-версию пакета из ветки, это можно сделать вручную:

1. Перейдите на вкладку **Actions**.
2. В меню слева выберите рабочий процесс **Release alpha version**.
3. Справа появится кнопка **Run workflow** с возможностью выбрать ветку.
4. Рядом будет доступно поле для ручного ввода версии. При первом релизе альфа-версии из ветки это поле можно оставить пустым. Последующие релизы потребуют указания новой версии вручную, так как мы не изменяем `package.json` на случай, если ветка скоро будет удалена. Убедитесь, что в версии используется префикс `alpha`, иначе возникнет ошибка.
5. Нажмите на кнопку **Run workflow** и дождитесь завершения процесса. Выпускать новые версии можно по мере необходимости, но не слишком часто. В остальных случаях используйте [`npm pack`](https://docs.npmjs.com/cli/v7/commands/npm-pack).

### Релиз бета-версий новой мажорной версии

Для релиза новой стабильной мажорной версии, скорее всего, потребуется сначала выпустить несколько бета-версий. Для этого выполните следующие действия:

1. Создайте или обновите ветку `beta`.
2. Добавьте необходимые изменения в эту ветку.
3. При готовности к выпуску новой бета-версии выполните ручной релиз. Для этого создайте пустой коммит или в подвале последнего коммита добавьте следующее сообщение:

   ```bash
   git commit -m 'fix: last commit

   Release-As: 3.0.0-beta.0' --allow-empty
   ```

4. После релиза робот создаст новый PR в ветку `beta`, который будет включать обновленный `CHANGELOG.md` и новую версию пакета.
5. Этот процесс можно повторять неограниченное количество раз. При готовности к выпуску стабильной мажорной версии без бета-метки создайте PR из ветки `beta` в ветку `main`. Следует учесть, что версия пакета будет содержать бета-метку. Система автоматически определит и изменит версию на соответствующую. Например, версия `3.0.0-beta.0` будет преобразована в `3.0.0`.

### Процесс релиза предыдущих мажорных версий

Если необходимо выпустить новую версию предыдущей мажорной версии после коммита в `main`, выполните следующие шаги:

1. Обновите ветку, которая относится к предыдущей мажорной версии:
   1. `version-1.x.x/fixes` — для версии 1.x.x.
   2. `version-2.x.x` — для версии 2.x.x.
2. Создайте новую ветку от соответствующей ветки предыдущей мажорной версии.
3. Выборочно перенесите (`cherry-pick`) свой коммит из ветки `main` в созданную ветку.
4. Создайте PR и после одобрения слейте его в ветку предыдущей мажорной версии.
5. Объедините свои изменения в один коммит (`squash`) и выполните слияние (`merge`) PR. Важно, чтобы новая версия была выпущена с помощью Github-Actions.
6. Подождите, пока робот создаст пулл-реквест с новой версией пакета и внесет информацию об изменениях в `CHANGELOG.md`. Следите за процессом на вкладке [**Actions**](https://github.com/gravity-ui/page-constructor/actions).
7. Проверьте внесенные изменения в `CHANGELOG.md` и одобрите PR робота.
8. Выполните `squash` и `merge` вашего PR. Следите за процессом релиза на вкладке [**Actions**](https://github.com/gravity-ui/page-constructor/actions).

## Редактор конструктора страниц

Пользовательский интерфейс редактора позволяет управлять содержимым страницы с функцией предпросмотра в реальном времени.

Пример использования:

```tsx
import {Editor} from '@gravity-ui/page-constructor/editor';

interface MyAppEditorProps {
  initialContent: PageContent;
  transformContent: ContentTransformer;
  onChange: (content: PageContent) => void;
}

export const MyAppEditor = ({initialContent, onChange, transformContent}: MyAppEditorProps) => (
  <Editor content={initialContent} onChange={onChange} transformContent={transformContent} />
);
```

## Тесты

Полный комплект документации можно найти по [этой ссылке](./test-utils/docs/README.md).
