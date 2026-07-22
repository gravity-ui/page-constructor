# Project navigation

Directory map of `src/` and built artefacts. Use this to locate the right place for a change; for _causal_ context on a specific area (component usage, block dependencies), prefer `memory-bank/`.

## Entry points

| File                       | Role                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/index.ts`             | Public API — re-exports blocks, sub-blocks, components, models, utils, schema, hooks, navigation     |
| `src/server.ts`            | Server-side `contentTransformer` for YFM preprocessing                                               |
| `src/editor/index.ts`      | Optional editor UI (separate entry)                                                                  |
| `src/constructor-items.ts` | `blockMap`, `subBlockMap`, `navItemMap` — registry that maps `BlockType` strings to React components |

## `src/blocks/`

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

## `src/sub-blocks/`

Reusable card/content units composed inside blocks.

`BackgroundCard`, `BannerCard`, `BasicCard`, `Content`, `Divider`, `HubspotForm`, `ImageCard`, `LayoutItem`, `MediaCard`, `PriceCard`, `PriceDetailed`, `Quote`

## `src/components/`

Shared UI primitives used across blocks. Not page-level; imported directly (no barrel).

Notable: `Button`, `Buttons`, `Image`, `ImageBase`, `BackgroundMedia`, `Media`, `MediaBase`, `Link`, `Title`, `HTML`, `YFMWrapper`, `VideoBlock`, `VideoButton` (internal shared play control), `ReactPlayer`, `AnimateBlock`, `BlockBase`, `CardBase`, `FullscreenMedia`, `HeaderBreadcrumbs`, `OverflowScroller`, `Table`, `MetaInfo`, `Author`

## `src/containers/`

| Path                                  | Role                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `PageConstructor/PageConstructor.tsx` | Main render engine — iterates `content.blocks`, resolves block types from `blockMap`, renders via `Grid`                |
| `PageConstructor/Provider.tsx`        | `PageConstructorProvider` — wraps all contexts (theme, locale, analytics, SSR, maps, forms, image, mobile, windowWidth) |
| `PageConstructor/components/`         | `ConstructorBlocks`, `ConstructorRow`, `ConstructorItem` — layout helpers                                               |
| `Loadable/Loadable.tsx`               | Async block loading wrapper                                                                                             |

## `src/context/`

Each subdirectory exports a `Context` + optional `Provider` + hook.

| Context                  | Purpose                                                                      |
| ------------------------ | ---------------------------------------------------------------------------- |
| `analyticsContext`       | `sendEvents` callback for tracking                                           |
| `animateContext`         | Scroll-based animation toggle                                                |
| `blockIdContext`         | Current block identifier                                                     |
| `formsContext`           | HubSpot / YandexForm config                                                  |
| `imageContext`           | Image transformation (compress, resize)                                      |
| `innerContext`           | Internal constructor state                                                   |
| `localeContext`          | Language/locale                                                              |
| `locationContext`        | `pathname`, `history`                                                        |
| `mapsContext`            | Google/Yandex Maps API keys                                                  |
| `mobileContext`          | `isMobile` flag                                                              |
| `projectSettingsContext` | Feature flags and project-wide defaults, including video button theme/colors |
| `ssrContext`             | SSR detection                                                                |
| `stylesContext`          | Custom CSS class overrides                                                   |
| `theme`                  | `ThemeContext`, `useTheme()`                                                 |
| `videoContext`           | Video player config                                                          |
| `windowWidthContext`     | Responsive breakpoint value                                                  |

## `src/models/`

| File                 | Contents                                                                                |
| -------------------- | --------------------------------------------------------------------------------------- |
| `constructor.ts`     | `PageContent`, `ConstructorBlock`, `PageData`, `ShouldRenderBlock`, `FetchLoadableData` |
| `components.ts`      | Block prop interfaces                                                                   |
| `common.ts`          | `Animatable`, `ThemedValue`, `ThemedMediaProps`, `ClassNameProps`                       |
| `customization.ts`   | `CustomConfig`, `CustomItems`, `BlockDecorationProps`                                   |
| `guards.ts`          | Type guard functions                                                                    |
| `navigation.ts`      | `NavigationData`, `NavigationItemTypes`                                                 |
| `constructor-items/` | Per-block model files                                                                   |

## `src/grid/`

`Grid` / `Row` / `Col` / `Break` components — CSS grid wrapper used by `PageConstructor` to lay out block rows.

## `src/navigation/`

Standalone navigation system: `containers/Layout`, components, hooks, models, schema.  
Rendered by `PageConstructor` when `navigation` prop is passed.

## `src/editor/`

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

## `src/hooks/`

`useAnalytics`, `useDeviceValue`, `useFocus`, `useHeightCalculator`, `useImageSize`, `useMetrika`, `useMount`, `useWindowBreakpoint`

## `src/utils/`

`analytics.ts`, `blocks.ts`, `breakpoint.ts`, `cn.ts` (BEM helper), `common.ts`, `imageCompress.ts`, `microdata.ts`, `theme.ts`, `url.ts`, `svg.ts`, `icons.ts`

## `src/schema/`

JSON Schema definitions for every block and sub-block. Used by `build:schema` (standalone bundle at `schema/`) and by the editor for validation.

## `styles/`

Global SCSS entry points: `styles.scss` (main import for consumers), plus per-theme and utility files.

## `server/`

Built output only (do not edit). Source: `src/server.ts` → compiled by `build:server`.

## `widget/`

Standalone embeddable widget bundle (webpack). Source: `src/widget/`.
