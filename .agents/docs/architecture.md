# Architecture invariants

Rules every change must preserve. Violating any of these breaks downstream consumers (editor, schema bundle, theme switching) silently.

- **Block-first**: every new page feature is a block (`src/blocks/`) or sub-block (`src/sub-blocks/`), not an ad-hoc component. Page composition is data-driven via `blockMap`; ad-hoc components cannot be placed by consumers.
- **Themed values**: media, colors, and images accept `ThemedValue<T>` — `{ light: T; dark: T }` — resolved at runtime via `getThemedValue()`. The library supports light/dark theme switching at runtime, so hardcoded single-variant values silently break in the opposite theme.
- **BEM + SCSS**: all class names use `@bem-react/classname` (`cn.ts`). Files follow `ComponentName/ComponentName.tsx` + `ComponentName.scss`.
- **Contexts over prop drilling**: runtime config (theme, locale, analytics, maps, SSR, image, forms, mobile, windowWidth) lives in `src/context/` and is injected via `PageConstructorProvider`. New cross-cutting config must go through a context, not props.
- **Schema validation**: every block has a JSON Schema entry in `src/schema/` used by the editor and the standalone schema bundle. The editor uses it to generate the block form; the standalone bundle (`build:schema`) ships it to external editor consumers — both fail silently for a block missing its schema entry.
- **No index.ts barrel re-exports** for new components — import directly from implementation files. Barrels defeat tree-shaking and obscure ownership.
