# Page Constructor &middot; [![build status](<https://teamcity.yandex-team.ru/app/rest/builds/buildType:(DataUI_Instruments_Common_BuildAndDeploy)/statusIcon.svg>)](https://teamcity.yandex-team.ru/viewType.html?buildTypeId=DataUI_Instruments_Common_BuildAndDeploy) [![npm version](https://badger.yandex-team.ru/npm/@yandex-data-ui/page-constructor/version.svg)](https://npm.yandex-team.ru/@yandex-data-ui/page-constructor) [![dependencies health](https://badger.yandex-team.ru/oko/repo/data-ui/page-constructor/health.svg)](https://oko.yandex-team.ru/repo/data-ui/common) [![distribution health](https://badger.yandex-team.ru/oko/pkg/@yandex-data-ui/common/health.svg)](https://oko.yandex-team.ru/pkg/@yandex-data-ui/common) [![maintainer](https://badger.yandex-team.ru/custom/[Maintainer]/[vladvlad][f5a522]/badge.svg)](https://staff.yandex-team.ru/vladvlad)

[comment]: <> (//TODO: Поменять ссылыку на иконку)
Конструктор страниц.

## Конструктор страниц

`page-constructor` это библиотека, которая позволяет отрисовывать веб-страницы или части страниц на основе данных в формате `json` (в дальнейшем будет добавлена поддержка `yaml` формата).

При создании страниц используется компонентный подход: страница составляется из набора готовых блоков, которые могут быть расположены в произвольном порядке. Каждому блоку соответсвует определенный тип и набор параметров во входных данных.

Формат входных данных и список доступных блоков можно посмотреть в [документации](https://github.yandex-team.ru/data-ui/cloud-backoffice/wiki/Страницы).

### Начало работы

Конструктор страниц импортируется в виде реакт-компонента:

```jsx
import {PageConstructor} from '@yandex-data-ui/page-constructor';

const Page: React.FC<PageProps> = ({content}) => (
    <PageConstructor content={content}/>
);
```

### Параметры

```typescript
interface PageConstructorProps {
    content: PageContent; //описание блоков в формате json
    shouldRenderBlock?: ShouldRenderBlock; // функция которая вызывается при отрисовке каждого блока и позволяет задавать условия его отображения
    custom?: Custom; //пользовательские блоки (см. раздел `Кастомизация`)
    metrika?: Metrika; //функции для оптправки данных аналитики
    ssrConfig?: SSR; //содержит признак того, что код выполнякется на стороне сервера
    location?: Location; //api истории браузера или роутера, информация о url страницы
    locale?: LocaleContextProps; //информация о языке и домене (используется при генерации и оформлении ссылок)
    isMobile?: boolean; //признак
    renderMenu?: () => React.ReactNode; //функция, которая отрисовывает меню страницы с навигагацией (планируется добавить отрисовку варианта меню по умолчанию)
}

export interface PageContent extends Animatable {
    blocks: Block[];
    menu?: Menu;
    background?: MediaProps;
    footnotes?: string[];
}

interface Custom {
    blocks?: CustomBlock;
    headers?: CustomBlock;
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

4. Теперь во вхожных данных (параметр `content`) можно использовать созданный блок, указав его тип и данные

Для того, чтобы при создании собственных блоков использовать миксины и стилевые переменные конструктора нужно в своем файле стилей добавить импорт:

```css
@import '~@yandex-data-ui/page-constructor/styles/styles.scss';
```

### Loadable блоки

Иногда нужно чтобы блок умел отрисовывать себя на основе данных, которые нужно загрузить, для этого используются loadable блоки.

Для того чтобы добавить пользовательские `loadable` блоки нужно передать в `PageConstructor` свойство `custom.loadable`, в котором ключами являются названия источников данных(строка) для компонента а значением объект

```typescript
export interface LoadableConfigItem {
    fetch: FetchLoadableData; // функция загрузки данных
    component: React.ComponentType; //блок, в который нужно передать загруженные данные
}

type FetchLoadableData<TData = any> = (blockKey: string) => Promise<TData>;
```

### Сетка

Конструктор страниц использует сетку `bootstrap` и ее реализацию на основе реакт-компонентов, которую можно использовать в своем проекте (в том числе отдельно от конструтора).

Пример использования

```jsx

import {Grid, Row, Col} from '@yandex-data-ui/page-constructor/'

const Page: React.FC<PageProps> = ({children}) => (
    <Grid>
        <Row>
            <Col sizes={{lg: 4, sm: 6, all: 12}}>
                {children}
            </Col>
        </Row>
    </Grid>
);

```


### Блоки

На данный момент есть 2 типа блоков:

- v1 - deprecated блоки старого образца, рассчитанные на вложенность и атомарность, они лежат в папке `src/units/constructor/components`. В эту папку сейчас добавляем только вспомогательные компонеты или блоки, используемые внутри составных блоков v2 (например карточки слайдера)

- v2 - новые блоки каждый из которых представляет неделимый верхнеуровневый компонент, они лежат в папке `src/units/constructor/blocks`

Более подробно о блоках можно в [документации](https://github.yandex-team.ru/data-ui/cloud-backoffice/wiki/Страницы).

### Как добавить новый блок в `page-constructor`:

1. В директории `src/blocks` или `src/components` создаем папку с кодом блока/компонета

2. Добавляем название блока в enum `BlockType`, описываем его свойства и добавляем блок в тип `BlockV2Raw` в файле `units/constructor/models.ts`

3. Добавляем экспорт блока в файле `src/blocks/index.ts` или компонента в файле `src/components/index.ts`

4. Добавляем новый компонент или блок в мэппинг в `src/componentMap.ts`

5. Добавляем в [`cloud-backoffice`](https://github.yandex-team.ru/data-ui/cloud-backoffice) валидатор для нового блока, для этого нужно:

   - добавялем файл блока/карточки в `src/ui/schema/pages/v2/` по примеру с остальными блоками
   - экспортируем его в индекс-файле с карточками/блоками
   - добавляем его в `enum` и `selectCases` в файле `src/ui/schema/pages/index.ts`
   - открываем нужную страницу в бэкофисе, добавляем блок в код страницы, проверяем, что валидация работает

6. Добавляем описание блока на [страницу документации](https://github.yandex-team.ru/data-ui/cloud-backoffice/wiki/Страницы)

## Разработка

```
npm install
npm run dev
```
