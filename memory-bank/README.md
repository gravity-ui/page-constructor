# Memory Bank

Project knowledge base. **Read before working on any block or component.** Captures what cannot be derived from code: reuse patterns, inter-block dependencies, change history, known pitfalls.

## Root files

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

## `blockDeps/`

Dependency graphs for specific blocks — which components a block uses and where it is itself reused.

Current coverage: `banner.md`, `hero.md`

## `usage/`

Per-component usage documents: full usage graph across the codebase, application context, and common patterns.

Covered: `animateBlock`, `author`, `backgroundCard`, `backgroundImage`, `backgroundMedia`, `backLink`, `balancedMasonry`, `basicCard`, `brandFooter`, `button`, `content`, `contentList`, `control`, `divider`, `errorWrapper`, `fileLink`, `filterBlock`, `fullscreenImage`, `fullscreenMedia`, `fullWidthBackground`, `headerBlock`, `headerBreadcrumbs`, `heroBlock`, `hubspotForm`, `icon`, `image`, `imageCard`, `layoutItem`, `link`, `map`, `media`, `mediaCard`, `metaInfo`, `overflowScroller`, `priceCard`, `priceDetailed`, `quote`, `reactPlayer`, `table`, `title`, `toggleArrow`, `unpublishedLabel`, `videoBlock`, `videoButton`, `yandexForm`, `yfmWrapper`

## When to consult

- **Before adding** a block/component — check `usage/` for an existing similar component to reuse instead of duplicating.
- **Before modifying** an existing component — read its `usage/<component>.md` to understand all consumers and avoid breaking dependent blocks.
- **Working on `Banner` or `Hero`** — read the corresponding file in `blockDeps/`.
- **Architecture questions** — `systemPatterns.md`.
- **Current dev state** — `activeContext.md`.
