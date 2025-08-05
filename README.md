# @gravity-ui/page-constructor &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/page-constructor)](https://www.npmjs.com/package/@gravity-ui/page-constructor) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/page-constructor/ci.yml?branch=main&label=CI)](https://github.com/gravity-ui/page-constructor/actions/workflows/ci.yml?query=branch:main) [![Release](https://img.shields.io/github/actions/workflow/status/gravity-ui/page-constructor/release.yml?branch=main&label=Release)](https://github.com/gravity-ui/page-constructor/actions/workflows/release.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.gravity-ui.com/page-constructor/)

## Page constructor

`Page-constructor` is a library for rendering web pages or their parts based on `JSON` data (support for `YAML` format is to be added later).

When creating pages, component-based approach is used: a page is built using a set of ready-made blocks that can be placed in any order. Each block has a certain type and set of input data parameters.

For the format of input data and list of available blocks, see the [documentation](https://preview.gravity-ui.com/page-constructor/?path=/docs/documentation-blocks--docs).

## Install

```shell
npm install @gravity-ui/page-constructor
```

## Quick start

First, we need a React project and some kind of server. For example, you can create a React project using Vite and an Express server, or you can create Next.js application - it will have a client and server side at once.

Install the required dependencies:

```shell
npm install @gravity-ui/page-constructor @diplodoc/transform @gravity-ui/uikit
```

Insert the `Page Constructor` to the page. To work correctly, it must be wrapped in a `PageConstructorProvider`:

```tsx
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';
import '@gravity-ui/page-constructor/styles/styles.scss';

const App = () => {
  const content = {
    blocks: [
      {
        type: 'header-block',
        title: 'Hello world',
        background: {color: '#f0f0f0'},
        description:
          '**Congratulations!** Have you built a [page-constructor](https://github.com/gravity-ui/page-constructor) into your website',
      },
    ],
  };

  return (
    <PageConstructorProvider>
      <PageConstructor content={content} />
    </PageConstructorProvider>
  );
};

export default App;
```

This was the simplest example of a connection. In order for YFM markup to work, you need to process content on the server and receive it on the client.

If your server is a separate application, then you need to install page-constructor:

```shell
npm install @gravity-ui/page-constructor
```

To process YFM in all base blocks, call the `contentTransformer` and pass the content and options there:

```ts
const express = require('express');
const app = express();
const {contentTransformer} = require('@gravity-ui/page-constructor/server');

const content = {
  blocks: [
    {
      type: 'header-block',
      title: 'Hello world',
      background: {color: '#f0f0f0'},
      description:
        '**Congratulations!** Have you built a [page-constructor](https://github.com/gravity-ui/page-constructor) into your website',
    },
  ],
};

app.get('/content', (req, res) => {
  res.send({content: contentTransformer({content, options: {lang: 'en'}})});
});

app.listen(3000);
```

On the client, add an endpoint call to receive content:

```tsx
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';
import '@gravity-ui/page-constructor/styles/styles.scss';
import {useEffect, useState} from 'react';

const App = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/content').then((r) => r.json());
      setContent(response.content);
    })();
  }, []);

  return (
    <PageConstructorProvider>
      <PageConstructor content={content} />
    </PageConstructorProvider>
  );
};

export default App;
```

### Ready-made template

To start a new project, you can use the [ready-made template on Next.js ](https://github.com/gravity-ui/page-constructor-website-template) which we have prepared.

### Static site builder

[Page Constructor Builder](https://github.com/gravity-ui/page-constructor-builder) - command-line utility for building static pages from YAML configurations using the @gravity-ui/page-constructor

## Documentation

### Parameters

```typescript
interface PageConstructorProps {
  content: PageContent; // Blocks data in JSON format.
  shouldRenderBlock?: ShouldRenderBlock; // A function that is invoked when rendering each block and  lets you set conditions for its display.
  custom?: Custom; // Custom blocks (see `Customization`).
  renderMenu?: () => React.ReactNode; // A function that renders the page menu with navigation (we plan to add rendering for the default menu version).
  navigation?: NavigationData; // Navigation data for using navigation component in JSON format
  isBranded?: boolean; // If true, adds a footer that links to https://gravity-ui.com/. Try BrandFooter component for more customization.
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

### Server utils

The package provides a set of server utilities for transforming your content.

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

Under the hood, a package is used to transform Yandex Flavored Markdown into HTML - `diplodoc/transfrom`, so it is also in peer dependencies

You can also use useful utilities in the places you need, for example in your custom components

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

You can find more utilities in this [section](https://github.com/gravity-ui/page-constructor/tree/main/src/text-transform)

### Detailed Documentation on Server Utilities and Transformers

For a comprehensive guide on using server utilities, including detailed explanations and advanced use cases, visit the [additional chapter on server utils usage](./docs/data-preparation.md).

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

To use default font, add import in your file:

```css
@import '~@gravity-ui/page-constructor/styles/fonts.scss';
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
import {Grid, Row, Col} from '@gravity-ui/page-constructor';

const Page = ({children}: PropsWithChildren<PageProps>) => (
  <Grid>
    <Row>
      <Col sizes={{lg: 4, sm: 6, all: 12}}>{children}</Col>
    </Row>
  </Grid>
);
```

### Navigation

Page navigation can also be used separately from the constructor:

```jsx
import {Navigation} from '@gravity-ui/page-constructor';

const Page= ({data, logo}: React.PropsWithChildren<PageProps>) => <Navigation data={data} logo={logo} />;
```

### Blocks

Each block is an atomic top-level component. They're stored in the `src/units/constructor/blocks` directory.

### Sub-blocks

Sub-blocks are components that can be used in the block `children` property. In a config, a list of child components from sub-blocks is specified. Once rendered, these sub-blocks are passed to the block as `children`.

### How to add a new block to the `page-constructor`

1. In the `src/blocks` or `src/sub-blocks` directory, create a folder with the block or sub-block code.

2. Add the block or sub-block name to enum `BlockType` or`SubBlockType` and describe its properties in the `src/models/constructor-items/blocks.ts` or `src/models/constructor-items/sub-blocks.ts` file in a similar way to the existing ones.

3. Add export for the block in the `src/blocks/index.ts` file and for the sub-block in the `src/sub-blocks/index.ts` file.

4. Add a new component or block to mapping in `src/constructor-items.ts`.

5. Add a validator for the new block:

   - Add a `schema.ts` file to the block or sub-block directory. In this file, describe a parameter validator for the component in [`json-schema`](http://json-schema.org/) format.
   - Export it in the `schema/validators/blocks.ts` or `schema/validators/sub-blocks.ts` file.
   - Add it to `enum` or `selectCases` in the `schema/index.ts` file.

6. In the block directory, add the `README.md` file with a description of input parameters.
7. In the block directory add storybook demo in `__stories__` folder. All demo content for story should be placed in `data.json` at story dir. The generic `Story` must accept the type of block props, otherwise incorrect block props will be displayed in Storybook.
8. Add block data template to `src/editor/data/templates/` folder, file name should match block type
9. (optional) Add block preview icon to `src/editor/data/previews/` folder, file name should match block type

### Themes

The `PageConstructor` lets you use themes: you can set different values for individual block properties depending on the theme selected in the app.

To add a theme to a block property:

1. In the `models/blocks.ts` file, define the type of the respective block property using the `ThemeSupporting<T>` generic, where `T` is the type of the property.

2. In the file with the block's `react` component, get the value of the property with the theme via `getThemedValue` and `useTheme` hook (see examples in the `MediaBlock.tsx` block).

3. Add theme support to the property validator: in the block's `schema.ts` file, wrap this property in `withTheme`.

### i18n

The `page-constructor` is a `uikit-based` library, and we use an instance of `i18n` from uikit. To set up internationalization, you just need to use the `configure` from uikit:

```typescript
import {configure} from '@gravity-ui/uikit';

configure({
  lang: 'ru',
});
```

### Maps

To use maps, put the map type, scriptSrc and apiKey in field `mapContext` in `PageConstructorProvider`.

You can define environment variables for dev-mode in .env.development file within project root.
`STORYBOOK_GMAP_API_KEY` - apiKey for google maps

### Analytics

#### Init

To start using any analytics, pass a handler to the constructor. The handler must be created on a project side. The handler will receive the `default` and `custom` event objects. The passed handler will be fired on a button, link, navigation, and control clicks. As one handler is used for all events treatment, pay attention to how to treat different events while creating the handler. There are predefined fields that serve to help you to build complex logic.

Pass `autoEvents: true` to constructor to fire automatically configured events.

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

An event object has only one required field - `name`. It also has predefined fields, which serve to help manage complex logic. For example, `counter.include` can help to send event in a particular counter if several analytics systems are used in a project.

```ts
type AnalyticsEvent<T = {}> = T & {
  name: string;
  type?: string;
  counters?: AnalyticsCounters;
  context?: string;
};
```

It is possible to configure an event type needed for a project.

```ts
type MyEventType = AnalyticsEvent<{
  [key: string]?: string; // only a 'string' type is supported
}>;
```

#### Counter selector

It is possible to configure an event to which an analytics system to sent.

```ts
type AnalyticsCounters = {
  include?: string[]; // array of analytics counter ids that will be applied
  exclude?: string[]; // array of analytics counter ids that will not be applied
};
```

#### context parameter

Pass `context` value to define place in a project where an event is fired.

Use selector below or create logic that serves project needs.

```ts
// analyticsHandler.ts
if (isCounterAllowed(counterName, counters)) {
  analyticsCounter.reachGoal(counterName, name, parameters);
}
```

#### Reserved event types

Several predefined event types are used to mark automatically configured events. Use the types to filter default events, for example.

```ts
enum PredefinedEventTypes {
  Default = 'default-event', // default events which fire on every button click
  Play = 'play', // React player event
  Stop = 'stop', // React player event
}
```

## Development

```bash
npm ci
npm run dev
```

#### Note about Vite

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

For Vite, you need to install the `vite-plugin-dynamic-import` plugin and configure the config so that dynamic imports work

## Release flow

In usual cases we use two types of commits:

1. fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
2. feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
3. BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. To set release package version manually you need to add `Release-As: <version>` to your commit message e.g.

```bash
git commit -m 'chore: bump release

Release-As: 1.2.3'
```

You can see all information [here](https://www.conventionalcommits.org/en/v1.0.0/).

When you receive the approval of your pull-request from the code owners and pass all the checks, please do the following:

1. You should check if there is a release pull-request from robot with changes from another contributor (it looks like `chore(main): release 0.0.0`). If it exists, you should check why it is not merged. If the contributor agrees to release a shared version, follow the next step. If not, ask him to release his version, then follow the next step.
2. Squash and merge your PR (It is important to release a new version with Github-Actions)
3. Wait until robot creates a PR with a new version of the package and information about your changes in CHANGELOG.md. You can see the process on [the Actions tab](https://github.com/gravity-ui/page-constructor/actions).
4. Check your changes in CHANGELOG.md and approve robot's PR.
5. Squash and merge PR. You can see release process on [the Actions tab](https://github.com/gravity-ui/page-constructor/actions).

### Alpha versions release

If you want to release alpha version of the package from your branch you can do it manually:

1. Go to tab Actions
2. Select workflow "Release alpha version" on the left page's side
3. You can see on the right side the button "Run workflow". Here you can choose the branch.
4. You can also see field with manually version. If you release alpha in your branch for the first time, do not set anything here. After first release you have to set the new version manually because we don't change package.json in case that the branch can expire very soon. Use the prefix `alpha` in you manual version otherwise you will get error.
5. Push "Run workflow" and wait until the action will finish. You can release versions as many as you want but do not abuse it and release versions if you really need it. In other cases use [npm pack](https://docs.npmjs.com/cli/v7/commands/npm-pack).

### Beta-major versions release

If you want to release a new major version, you will probably need for a beta versions before a stable one, please do the following:

1. Create or update the branch `beta`.
2. Add there your changes.
3. When you ready for a new beta version, release it manually with an empty commit (or you can add this commit message with footer to the last commit):

```bash
git commit -m 'fix: last commit

Release-As: 3.0.0-beta.0' --allow-empty
```

4. Release please robot will create a new PR to the branch `beta` with updated CHANGELOG.md and bump version of the package
5. You can repeat it as many as you want. When you ready to release the latest major version without beta tag, you have to create PR from branch `beta` to branch `main`. Notice that it is normal that your package version will be with beta tag. Robot knows that and change it properly. `3.0.0-beta.0` will become `3.0.0`

### Release flow for previous major-versions

If you want to release a new version in previous major after commit it to the main, please do the following:

1. Update necessary branch, the previous major release branch names are:
   1. `version-1.x.x/fixes` - for major 1.x.x
   2. `version-2.x.x` - for major 2.x.x
2. Checkout a new branch from the previous major release branch
3. Cherry-pick your commit from the branch `main`
4. Create PR, get an approval and merge into the previous major release branch
5. Squash and merge your PR (It is important to release a new version with Github-Actions)
6. Wait until robot creates a PR with a new version of the package and information about your changes in CHANGELOG.md. You can see the process on [the Actions tab](https://github.com/gravity-ui/page-constructor/actions).
7. Check your changes in CHANGELOG.md and approve robot's PR.
8. Squash and merge PR. You can see release process on [the Actions tab](https://github.com/gravity-ui/page-constructor/actions).

## Page constructor editor

Editor provides user interface for page content management with realtime preview.

How to use:

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

## Memory Bank

This project includes a comprehensive **Memory Bank** - a collection of Markdown documentation files that provide detailed information about the project's architecture, components, and usage patterns. The Memory Bank is particularly useful when working with AI agents, as it contains structured information about:

- **Project Overview**: Core requirements, goals, and context
- **Component Documentation**: Detailed usage guides for all components
- **System Architecture**: Technical patterns and design decisions
- **Development Progress**: Current status and implementation details

### Using the Memory Bank

The Memory Bank is located in the `memory-bank/` directory and consists of regular Markdown files that can be read like any other documentation:

- `projectbrief.md` - Foundation document with core requirements
- `productContext.md` - Project purpose and user experience goals
- `systemPatterns.md` - Architecture and technical decisions
- `techContext.md` - Technologies, setup, and constraints
- `activeContext.md` - Current work focus and recent changes
- `progress.md` - Implementation status and known issues
- `usage/` - Component-specific usage documentation
- `storybookComponents.md` - Storybook integration details

### For AI Agents

When working with AI agents on this project, the Memory Bank serves as a comprehensive knowledge base that helps agents understand:

- Project structure and patterns
- Component APIs and usage examples
- Development workflows and best practices
- Current implementation status and next steps

AI agents can read these files to quickly get up to speed with the project context and make more informed decisions about code changes and implementations.

## Tests

Comprehensive documentation is available at the provided [link](./test-utils/docs/README.md).
