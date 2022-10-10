# @gravity-ui/page-constructor &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/page-constructor)](https://www.npmjs.com/package/@gravity-ui/page-constructor) [![CI](https://img.shields.io/github/workflow/status/gravity-ui/page-constructor/CI/main?label=CI&logo=github)](https://github.com/gravity-ui/page-constructor/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.yandexcloud.dev/page-constructor/)

## Install

```shell
npm install @gravity-ui/page-constructor
```

## Page constructor

`Page-constructor` is a library for rendering web pages or their parts based on `JSON` data (support for `YAML` format is to be added later).

When creating pages, component-based approach is used: a page is built using a set of ready-made blocks that can be placed in any order. Each block has a certain type and set of input data parameters.

For the format of input data and list of available blocks, see the [documentation](https://preview.yandexcloud.dev/page-constructor/?path=/story/information--blocks).

### Getting started

The page constructor is imported as a React component. To make sure it runs properly, wrap it in `PageConstructorProvider`:

```jsx
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';

const Page: WithChildren<PageProps> = ({content}) => (
  <PageConstructorProvider>
    <PageConstructor content={content} />
  </PageConstructorProvider>
);
```

### Parameters

```typescript
interface PageConstructorProps {
    content: PageContent; //Blocks data in JSON format.
    shouldRenderBlock?: ShouldRenderBlock; // A function that is invoked when rendering each block and  lets you set conditions for its display.
    custom?: Custom; //Custom blocks (see `Customization`).
    renderMenu?: () => React.ReactNode; //A function that renders the page menu with navigation (we plan to add rendering for the default menu version).
}

interface PageConstructorProviderProps {
    isMobile?: boolean; //A flag indicating that the code is executed in mobile mode.
    locale?: LocaleContextProps; //Info about the language and domain (used when generating and formatting links).
    location?: Location; //API of the browser or router history, the page URL.
    metrika?: Metrika; //Functions for sending analytics
    ssrConfig?: SSR; //A flag indicating that the code is run on the server size.
    theme?: 'light' | 'dark'; //Theme to render the page with.
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

### Custom blocks

The page constructor lets you use blocks that are user-defined in their app. Blocks are regular React components.

To pass custom blocks to the constructor:

1. Create a block in your app.

2. In your code, create an object with the block type (string) as a key and an imported block component as a value.

3. Pass the object you created to the `custom.blocks`, `custom.headers` or `custom.subBlocks` parameter of the `PageConstructor` component (`custom.headers` specifies the block headers to be rendered separately above general content).

4. Now you can use the created block in input data (the `content` parameter) by specifying its type and data.

To use mixins and constructor style variables when creating custom blocks, add import in your file:

```css
@import '~@gravity-ui/page-constructor/styles/styles.scss';
```

### Loadable blocks

It's sometimes necessary that a block renders itself based on data to be loaded. In this case, loadable blocks are used.

To add custom `loadable` blocks, pass to the `PageConstructor` the `custom.loadable` property with data source names (string) for the component as a key and an object as a value.

```typescript
export interface LoadableConfigItem {
  fetch: FetchLoadableData; // data loading method
  component: React.ComponentType; //blog to pass loaded data
}

type FetchLoadableData<TData = any> = (blockKey: string) => Promise<TData>;
```

### Grid

The page constructor uses the `bootstrap` grid and its implementation based on React components that you can use in your own project (including separately from the constructor).

Usage example:

```jsx
import {Grid, Row, Col} from '@gravity-ui/page-constructor/';

const Page: React.FC<PageProps> = ({children}) => (
  <Grid>
    <Row>
      <Col sizes={{lg: 4, sm: 6, all: 12}}>{children}</Col>
    </Row>
  </Grid>
);
```

### Blocks

Each block is an atomic top-level component. They're stored in the `src/units/constructor/blocks` directory.

### Sub-blocks

Sub-blocks are components that can be used in the block `children` property. In a config, a list of child components from sub-blocks is specified. Once rendered, these sub-blocks are passed to the block as `children`.

### How to add a new block to the `page-constructor`

1. In the `src/blocks` or `src/sub-blocks` directory, create a folder with the block or sub-block code.

2. Add the block or sub-block name to enum `BlockType` or`SubBlockType` and describe its properties in the `src/models/blocks.ts` or `src/models/sub-blocks.ts` file in a similar way to the existing ones.

3. Add export for the block in the `src/blocks/index.ts` file and for the sub-block in the `src/sub-blocks/index.ts` file.

4. Add a new component or block to mapping in `src/constructor-items.ts`.

5. Add a validator for the new block:

   - Add a `schema.ts` file to the block or sub-block directory. In this file, describe a parameter validator for the component in [`json-schema`](http://json-schema.org/) format.
   - Export it in the `schema/validators/blocks.ts` or `schema/validators/sub-blocks.ts` file.
   - Add it to `enum` or `selectCases` in the `schema/index.ts` file.

6. In the block directory, add the `README.md` file with a description of input parameters.
7. In the block directory add storybook demo in `__stories__` folder. (All demo content for story should be placed in `data.json` at story dir)

### Themes

The `PageConstructor` lets you use themes: you can set different values for individual block properties depending on the theme selected in the app.

To add a theme to a block property:

1. In the `models/blocks.ts` file, define the type of the respective block property using the `ThemeSupporting<T>` generic, where `T` is the type of the property.

2. In the file with the block's `react` component, get the value of the property with the theme via `getThemedValue` and `ThemeValueContext` (see examples in the `Banner.tsx` block).

3. Add theme support to the property validator: in the block's `schema.ts` file, wrap this property in `withTheme`.

### i18n

To make sure the i18n library used in your project runs properly, perform its initialization and set the project's current locale value in `lang`. For example:

```typescript
import {configure, Lang} from '@gravity-ui/page-constructor';

configure({lang: Lang.En});
```

## Development

```bash
npm ci
npm run dev
```
