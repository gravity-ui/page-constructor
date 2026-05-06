---
name: page-constructor-block-creator
description: Use this skill when the user asks to create a new block, sub-block, or component in the @gravity-ui/page-constructor project (or any repo whose layout matches `src/blocks/*`, `src/sub-blocks/*`, `src/components/*` with `__stories__` folders). Trigger on phrases like "create a new block", "add a component", "scaffold a sub-block", "I need a new hero variant", "add a card to the layout", or whenever the user wants to scaffold a page-constructor entity end-to-end. Generates the implementation files (`*.tsx`, `*.scss`, `schema.ts`, etc.) AND the `__stories__/` content (`*.stories.tsx`, `data.json`, `*.mdx`) with correct Storybook routing and mock data, plus full wiring (blockMap, BlockType/SubBlockType enum, exports, schema registration). Skip for purely non-scaffolding asks ("explain how Banner works", "fix a bug in BasicCard").
---

# page-constructor-block-creator

Scaffolds new **blocks**, **sub-blocks**, and **components** in `@gravity-ui/page-constructor`-style repos, including `__stories__/` (which is mandatory because development is done in Storybook). Produces implementation, styles, schema/types, Storybook story + MDX + mock data, and all wiring needed for the entity to be picked up by `PageConstructor` and rendered in Storybook.

## Why this matters

In this project, every block/sub-block/component has a fixed shape: directory layout, BEM-styled SCSS, a JSON Schema, a TypeScript model, and a `__stories__/` folder. Missing any of these means:

- the entity won't render in Storybook (the only dev environment),
- the editor's schema validation will fail,
- the type registry (`blockMap`, `BlockType`) won't pick it up,
- consumers won't be able to import it.

The hardest parts to get right by inspection are the **Storybook title routing** (different roots and subfolders for blocks vs. sub-blocks vs. component categories) and the **mock data shape** (which mirrors the YAML config a real page would use, not the React props directly). This skill bakes those rules in.

## Workflow

Follow this order strictly. Step 1 is non-negotiable: the project's user-level instructions require a plan + approval gate before any file edits.

### 1. Decide the entity kind and confirm the plan

Ask the user (or infer from context) which of the three kinds they want:

| Kind          | Directory                | Examples                  | Registered in                 |
| ------------- | ------------------------ | ------------------------- | ----------------------------- |
| **Block**     | `src/blocks/<Name>/`     | Banner, CardLayout, Form  | `blockMap`, `BlockType`       |
| **Sub-block** | `src/sub-blocks/<Name>/` | BasicCard, Quote, Divider | `subBlockMap`, `SubBlockType` |
| **Component** | `src/components/<Name>/` | Button, Title, Image      | nothing (imported directly)   |

Then **before writing files**:

1. Read AGENTS.md (root) if present — verify naming, BEM, schema, and registration conventions are still as expected.
2. Read 1–2 close analogues (e.g., for a banner-like block, read `src/blocks/Banner/`) to mirror style and structure.
3. Present a plan listing every file you intend to create + every file you intend to modify (registration sites). Wait for explicit approval.
4. After approval, create files **one at a time**. Pause briefly between files so the user can stop you mid-way.

### 2. Generate the entity

Pick the right reference for the kind being created:

- **Block** → read `references/blocks.md`
- **Sub-block** → read `references/sub-blocks.md`
- **Component** → read `references/components.md`

For all kinds, also consult `references/storybook-routing.md` to choose the correct Storybook `title` (the routing differs by category and is not always derivable from the filesystem path).

### 3. Wire it up

Each kind has a fixed wiring checklist (kept in its reference file). Don't skip steps — partial wiring leaves the entity invisible.

### 4. Verify

After scaffolding:

- Run `npm run typecheck` (fast, catches missing exports / type mismatches).
- Suggest `npm run dev` to open Storybook on port 7009 and check the new story renders.
- Don't claim completion until the type check passes and the Storybook entry exists at the predicted title path.

## Conventions you must preserve

These appear repeatedly across the codebase. Violating them produces mismatched files that don't match other entities of the same kind.

- **PascalCase directory and file names**: `BannerCard/BannerCard.tsx`, never `bannerCard/bannerCard.tsx`. Test with the existing `src/blocks/` layout.
- **Default + named export** of the React component (e.g. `export const BannerBlock = ...; export default BannerBlock;`). Index re-exports at `src/blocks/index.ts` use the default.
- **BEM via `block()` helper** from `src/utils`: `const b = block('banner-block');` — the BEM block name is the **kebab-case schema type**, NOT the React component name.
- **SCSS file imported as side effect** (`import './Banner.scss';`) — never CSS modules.
- **`ThemedValue<T>` for media/colors/images**: schema fields that accept light/dark variants must use `withTheme(...)` in the validator and resolve via `getThemedValue()` at render time. Mock data in `data.json` must show both: a flat string for `default` and an object `{ light, dark }` for `darkTheme`.
- **No barrel `index.ts` re-exports for new components.** Consumers import directly from `src/components/Foo/Foo`. (See AGENTS.md "Architecture invariants".)
- **i18n strings centralized** (when applicable) under `src/components/<Name>/i18n/` — but only if the component has user-facing strings, not for blocks whose strings come from the YAML config.

## Storybook conventions (critical)

- Stories **always** live in `<EntityDir>/__stories__/`.
- Three files: `<Name>.stories.tsx`, `data.json`, `<Name>.mdx`.
- Global decorators (`withLang`, `withMobile`, `withContextProvider`, `withPageConstructorProvider`) are auto-applied — do **not** wrap the story in `PageConstructorProvider` manually.
- Story args go through `blockTransform(args)` (single block) or `blockListTransform(...)` (list) — these run the YFM content transformer that the live `PageConstructor` runs at runtime. Skipping them means YFM markdown in titles/subtitles won't render.
- `data.json` always defines a `default` (light) variant and (when the entity supports `theme`) a `darkTheme` variant. The dark variant uses themed values for assets.
- The story `title` field uses `/`-separated routing — see `references/storybook-routing.md` for the rules per category.
- `*.mdx` is a documentation page that pulls in `<StoryTemplate>` from `src/demo/StoryTemplate.mdx` and lists the entity's parameters with one-line descriptions.

## Test data is YAML-shaped, not props-shaped

A subtle pitfall: the `data.json` for a block contains the **YAML config object** that consumers write in their page YAML, not the React props the component receives. The two are mostly identical, but the YAML form **always includes the `type` discriminator** (`"type": "banner-block"`) and may include themed-value objects that the runtime resolves to plain values before the component sees them. When in doubt, look at an existing block's `data.json` and copy the shape exactly.

## When in doubt

If the entity you're asked to create looks structurally similar to an existing one (e.g., a "promo card" looks like `BasicCard`; a "hero variant" looks like `Hero`), **read that existing entity end-to-end first** — including its `__stories__/` and any registration sites. Mirror it. Diverging from established structure for a single entity creates inconsistency that costs more later than it saves now.

## Reference files

- `references/blocks.md` — full block creation walkthrough + wiring checklist
- `references/sub-blocks.md` — sub-block walkthrough + wiring
- `references/components.md` — component walkthrough (no central registration)
- `references/storybook-routing.md` — Storybook `title` rules per category, with full mapping table
