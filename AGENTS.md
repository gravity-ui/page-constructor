# @gravity-ui/page-constructor — Agent Context

## Root Context

**Package**: `@gravity-ui/page-constructor` v8.7.1  
**Purpose**: React library for rendering web pages from JSON/YAML data. A page is assembled from typed blocks placed in any order; each block declares its schema, types, and visual component.  
**Peer deps**: `react ^16–19`, `@gravity-ui/uikit ^7`, `@diplodoc/transform ^4`  
**Key exports**: main (CJS/ESM), `./editor`, `./server`, `./styles/*`, `./widget/*`, `./schema/*`

### Commands

| Task                  | Command                                          |
| --------------------- | ------------------------------------------------ |
| Dev / Storybook       | `npm run dev` (port 7009)                        |
| Build (all)           | `npm run build`                                  |
| Build client          | `npm run build:client` (gulp)                    |
| Build server          | `npm run build:server` (tsc → `server/index.js`) |
| Build widget          | `npm run build:widget` (webpack)                 |
| Build schema          | `npm run build:schema` (webpack)                 |
| Typecheck             | `npm run typecheck`                              |
| Lint (all)            | `npm run lint`                                   |
| Lint + fix            | `npm run lint:fix`                               |
| Unit tests            | `npm test`                                       |
| Unit tests (watch)    | `npm run test:watch`                             |
| Visual tests          | `npm run playwright`                             |
| Visual tests (update) | `npm run playwright:update`                      |
| Visual tests (docker) | `npm run playwright:docker`                      |

### Architecture invariants

- **Block-first**: every new page feature is a block (`src/blocks/`) or sub-block (`src/sub-blocks/`), not an ad-hoc component.
- **Themed values**: media, colors, and images accept `ThemedValue<T>` — `{ light: T; dark: T }` — resolved at runtime via `getThemedValue()`.
- **BEM + SCSS**: all class names use `@bem-react/classname` (`cn.ts`). Files follow `ComponentName/ComponentName.tsx` + `ComponentName.scss`.
- **Contexts over prop drilling**: runtime config (theme, locale, analytics, maps, SSR, image, forms, mobile, windowWidth) lives in `src/context/` and is injected via `PageConstructorProvider`.
- **Schema validation**: every block has a JSON Schema entry in `src/schema/` used by the editor and the standalone schema bundle.
- **No index.ts barrel re-exports** for new components — import directly from implementation files.

---

## Memory Bank

`memory-bank/` is the project knowledge base. **Read it before working on any block or component.** It captures what cannot be derived from code: reuse patterns, inter-block dependencies, change history, and known pitfalls.

### Root files

| File                         | Contents                                                                 |
| ---------------------------- | ------------------------------------------------------------------------ |
| `projectbrief.md`            | High-level library overview and key features                             |
| `systemPatterns.md`          | Architectural patterns, layer diagram, PageConstructor design principles |
| `techContext.md`             | Tech stack, build and test tooling                                       |
| `activeContext.md`           | Current development focus and recent significant code changes            |
| `progress.md`                | Feature completion status                                                |
| `productContext.md`          | Product context: why the library exists, who consumes it                 |
| `storybookComponents.md`     | Component catalog with Storybook story status and links to usage docs    |
| `cardComponentUpdates.md`    | Change history for card components                                       |
| `gravityIconsIntegration.md` | Details of `@gravity-ui/icons` integration                               |
| `textSizeUpdate.md`          | Documentation for the text size system (xs/s/sm/m/l)                     |

### `memory-bank/blockDeps/`

Dependency graphs for specific blocks — which components a block uses and where it is itself reused.

Current coverage: `banner.md`, `hero.md`

### `memory-bank/usage/`

Per-component usage documents: full usage graph across the codebase, application context, and common patterns.

Covered: `animateBlock`, `author`, `backgroundCard`, `backgroundImage`, `backgroundMedia`, `backLink`, `balancedMasonry`, `basicCard`, `brandFooter`, `button`, `content`, `contentList`, `control`, `divider`, `errorWrapper`, `fileLink`, `filterBlock`, `fullscreenImage`, `fullscreenMedia`, `fullWidthBackground`, `headerBlock`, `headerBreadcrumbs`, `heroBlock`, `hubspotForm`, `icon`, `image`, `imageCard`, `layoutItem`, `link`, `map`, `media`, `mediaCard`, `metaInfo`, `overflowScroller`, `priceCard`, `priceDetailed`, `quote`, `reactPlayer`, `table`, `title`, `toggleArrow`, `unpublishedLabel`, `videoBlock`, `yandexForm`, `yfmWrapper`

### When to consult

- **Before adding** a block/component — check `usage/` for an existing similar component to reuse instead of duplicating.
- **Before modifying** an existing component — read its `usage/<component>.md` to understand all consumers and avoid breaking dependent blocks.
- **Working on `Banner` or `Hero`** — read the corresponding file in `blockDeps/`.
- **Architecture questions** — `systemPatterns.md`.
- **Current dev state** — `activeContext.md`.

---

## Development Workflow

**Primary dev environment is Storybook** — there is no separate demo app. All visual development, block iteration, and manual testing happen inside Storybook.

```
npm run dev   # starts Storybook at http://localhost:7009
```

### Storybook structure

| Path                                | Role                                                                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `.storybook/main.ts`                | Webpack5 config, addon registration, story globs                                                                      |
| `.storybook/preview.ts`             | Global decorators, viewports, backgrounds, docs theme                                                                 |
| `.storybook/decorators/`            | `withLang`, `withMobile`, `withContextProvider`, `withPageConstructorProvider` — applied to every story automatically |
| `.storybook/stories/documentation/` | MDX docs: Blocks, Sub Blocks, Types, Indents                                                                          |
| `.storybook/addons/theme-addon/`    | Light/dark theme switcher (global toolbar)                                                                            |
| `.storybook/addons/yaml-addon/`     | Extra "YAML" tab in each story showing the block config source                                                        |
| `.storybook/theme/`                 | Storybook UI theme (light)                                                                                            |
| `src/**/__stories__/`               | Per-block/component story files (`*.stories.tsx`, `*.mdx`)                                                            |

### Global decorators (applied to all stories)

1. `withLang` — sets locale from the toolbar `lang` global
2. `withMobile` — sets `isMobile` from the `platform` global
3. `withContextProvider` — wraps with editor/internal contexts
4. `withPageConstructorProvider` — wraps with `PageConstructorProvider` (theme, locale, isMobile)

This means every story already has a fully configured `PageConstructorProvider` — you do **not** need to add it manually in individual stories.

### Story conventions

- Stories live in `src/<category>/<ComponentName>/__stories__/<ComponentName>.stories.tsx`
- Use `autodocs: true` — component docs are generated automatically from prop types
- `layout: 'fullscreen'` is the default — blocks render edge-to-edge
- The `yaml-addon` reads the story `args` to generate the YAML tab; keep `args` representative

---

## Project Navigation

### Entry points

| File                       | Role                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/index.ts`             | Public API — re-exports blocks, sub-blocks, components, models, utils, schema, hooks, navigation     |
| `src/server.ts`            | Server-side `contentTransformer` for YFM preprocessing                                               |
| `src/editor/index.ts`      | Optional editor UI (separate entry)                                                                  |
| `src/constructor-items.ts` | `blockMap`, `subBlockMap`, `navItemMap` — registry that maps `BlockType` strings to React components |

### `src/blocks/`

Full-width page sections rendered by `PageConstructor`. Each block is a directory: `BlockName/BlockName.tsx` + schema + stories.

| Block                | Description                    |
| -------------------- | ------------------------------ |
| `Banner`             | Promo banner with CTA          |
| `CardLayout`         | Grid of cards                  |
| `Companies`          | Logo grid                      |
| `ContentLayout`      | Text + media layout            |
| `ExtendedFeatures`   | Feature list with icons        |
| `FilterBlock`        | Filterable card set            |
| `FoldableList`       | Accordion list                 |
| `Form`               | Embedded form block            |
| `Header`             | Page/section header            |
| `HeaderSlider`       | Header with slider             |
| `Hero`               | Full-bleed hero section        |
| `Icons`              | Icon set display               |
| `Info`               | Info/stats block               |
| `Map`                | Embedded map                   |
| `Media`              | Standalone media (video/image) |
| `PromoFeaturesBlock` | Compact promo features         |
| `Questions`          | FAQ accordion                  |
| `Security`           | Security features block        |
| `Share`              | Social share buttons           |
| `Slider`             | Content slider (Swiper-based)  |
| `SliderOld`          | Legacy slider (react-slick)    |
| `Table`              | Data table                     |
| `Tabs`               | Tabbed content                 |

### `src/sub-blocks/`

Reusable card/content units composed inside blocks.

`BackgroundCard`, `BannerCard`, `BasicCard`, `Content`, `Divider`, `HubspotForm`, `ImageCard`, `LayoutItem`, `MediaCard`, `PriceCard`, `PriceDetailed`, `Quote`

### `src/components/`

Shared UI primitives used across blocks. Not page-level; imported directly (no barrel).

Notable: `Button`, `Buttons`, `Image`, `ImageBase`, `BackgroundMedia`, `Media`, `MediaBase`, `Link`, `Title`, `HTML`, `YFMWrapper`, `VideoBlock`, `ReactPlayer`, `AnimateBlock`, `BlockBase`, `CardBase`, `FullscreenMedia`, `HeaderBreadcrumbs`, `OverflowScroller`, `Table`, `MetaInfo`, `Author`

### `src/containers/`

| Path                                  | Role                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `PageConstructor/PageConstructor.tsx` | Main render engine — iterates `content.blocks`, resolves block types from `blockMap`, renders via `Grid`                |
| `PageConstructor/Provider.tsx`        | `PageConstructorProvider` — wraps all contexts (theme, locale, analytics, SSR, maps, forms, image, mobile, windowWidth) |
| `PageConstructor/components/`         | `ConstructorBlocks`, `ConstructorRow`, `ConstructorItem` — layout helpers                                               |
| `Loadable/Loadable.tsx`               | Async block loading wrapper                                                                                             |

### `src/context/`

Each subdirectory exports a `Context` + optional `Provider` + hook.

| Context                  | Purpose                                 |
| ------------------------ | --------------------------------------- |
| `analyticsContext`       | `sendEvents` callback for tracking      |
| `animateContext`         | Scroll-based animation toggle           |
| `blockIdContext`         | Current block identifier                |
| `formsContext`           | HubSpot / YandexForm config             |
| `imageContext`           | Image transformation (compress, resize) |
| `innerContext`           | Internal constructor state              |
| `localeContext`          | Language/locale                         |
| `locationContext`        | `pathname`, `history`                   |
| `mapsContext`            | Google/Yandex Maps API keys             |
| `mobileContext`          | `isMobile` flag                         |
| `projectSettingsContext` | Feature flags, background mode          |
| `ssrContext`             | SSR detection                           |
| `stylesContext`          | Custom CSS class overrides              |
| `theme`                  | `ThemeContext`, `useTheme()`            |
| `videoContext`           | Video player config                     |
| `windowWidthContext`     | Responsive breakpoint value             |

### `src/models/`

| File                 | Contents                                                                                |
| -------------------- | --------------------------------------------------------------------------------------- |
| `constructor.ts`     | `PageContent`, `ConstructorBlock`, `PageData`, `ShouldRenderBlock`, `FetchLoadableData` |
| `components.ts`      | Block prop interfaces                                                                   |
| `common.ts`          | `Animatable`, `ThemedValue`, `ThemedMediaProps`, `ClassNameProps`                       |
| `customization.ts`   | `CustomConfig`, `CustomItems`, `BlockDecorationProps`                                   |
| `guards.ts`          | Type guard functions                                                                    |
| `navigation.ts`      | `NavigationData`, `NavigationItemTypes`                                                 |
| `constructor-items/` | Per-block model files                                                                   |

### `src/grid/`

`Grid` / `Row` / `Col` / `Break` components — CSS grid wrapper used by `PageConstructor` to lay out block rows.

### `src/navigation/`

Standalone navigation system: `containers/Layout`, components, hooks, models, schema.  
Rendered by `PageConstructor` when `navigation` prop is passed.

### `src/editor/`

Optional live-editing overlay (separate package entry `./editor`).

| Path                         | Role                                         |
| ---------------------------- | -------------------------------------------- |
| `containers/Editor/`         | Root editor shell                            |
| `containers/Form/`           | Block property form                          |
| `components/ControlPanel`    | Toolbar (add/edit/delete block)              |
| `components/BlockForm`       | Per-block JSON form (Monaco + dynamic-forms) |
| `components/CodeEditor`      | Raw YAML/JSON editor (Monaco)                |
| `components/PageSettings`    | Global page settings form                    |
| `components/DeviceEmulation` | Mobile/desktop preview toggle                |
| `store/`                     | Editor state (Zustand or similar)            |

### `src/hooks/`

`useAnalytics`, `useDeviceValue`, `useFocus`, `useHeightCalculator`, `useImageSize`, `useMetrika`, `useMount`, `useWindowBreakpoint`

### `src/utils/`

`analytics.ts`, `blocks.ts`, `breakpoint.ts`, `cn.ts` (BEM helper), `common.ts`, `imageCompress.ts`, `microdata.ts`, `theme.ts`, `url.ts`, `svg.ts`, `icons.ts`

### `src/schema/`

JSON Schema definitions for every block and sub-block. Used by `build:schema` (standalone bundle at `schema/`) and by the editor for validation.

### `styles/`

Global SCSS entry points: `styles.scss` (main import for consumers), plus per-theme and utility files.

### `server/`

Built output only (do not edit). Source: `src/server.ts` → compiled by `build:server`.

### `widget/`

Standalone embeddable widget bundle (webpack). Source: `src/widget/`.

---

## Testing

### Unit (Jest)

- Config: `jest.config.js` + `tsconfig.test.json`
- Environment: `test-utils/custom-environment.ts`
- Setup: `test-utils/setup-tests.ts`, `test-utils/setup-tests-after.ts`
- Mocks: `test-utils/__mocks__/`
- Coverage: `src/blocks/**`, `src/components/**`, `src/containers/**` (excludes stories)
- Run: `npm test` | watch: `npm run test:watch`

### Visual / Component (Playwright)

- Config: `playwright/playwright.config.ts`
- Framework: `@playwright/experimental-ct-react` (Vite-based, not a browser test runner)
- Tests live alongside components as `*.visual.test.tsx` files
- Fixtures: `playwright/core/` (`mountFixture`, `expectScreenshotFixture`, `delays`)
- Snapshots: committed; update with `npm run playwright:update`
- Docker baseline: `npm run playwright:docker`

---

## Adding a new block — checklist

1. `src/blocks/NewBlock/NewBlock.tsx` — React component
2. `src/blocks/NewBlock/NewBlock.scss` — BEM styles
3. `src/blocks/NewBlock/schema.ts` — JSON Schema
4. `src/blocks/NewBlock/models.ts` — TypeScript interfaces
5. `src/blocks/NewBlock/__stories__/NewBlock.stories.tsx` — Storybook story
6. Register in `src/constructor-items.ts` under `blockMap`
7. Add `BlockType` enum value in `src/models/`
8. Export from `src/blocks/index.ts`

---

## Agent skills

Project-specific agent guides live in `.claude/skills/`. Each skill is a directory with a `SKILL.md` (entry + when to use) and an optional `references/` folder of plain-markdown deep-dives.

Claude Code auto-discovers these skills and triggers them by their description. Other agents (Cursor, Codex, etc.) can read the contents directly — the bodies and references are plain markdown with no Claude-specific runtime requirements.

Before scaffolding new entities or running project workflows, browse `.claude/skills/` to see if a relevant guide exists.
