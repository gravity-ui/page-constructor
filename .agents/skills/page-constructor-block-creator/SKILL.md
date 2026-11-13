---
name: page-constructor-block-creator
description: Use this skill when the user asks to create a new block, sub-block, or component in the @gravity-ui/page-constructor project (or any repo whose layout matches `src/blocks/*`, `src/sub-blocks/*`, `src/components/*` with `__stories__` folders). Trigger on phrases like "create a new block", "add a component", "scaffold a sub-block", "I need a new hero variant", "add a card to the layout", or whenever the user wants to scaffold a page-constructor entity end-to-end or add its editor form. Generates the implementation files (`*.tsx`, `*.scss`, `form.ts`, `icon.ts`, config entrypoint, etc.) AND the `__stories__/` content (`*.stories.tsx`, `data.json`, `*.mdx`) with correct Storybook routing and mock data, plus full wiring (blocks catalog, public models/exports, required transforms). Skip for purely non-scaffolding asks ("explain how Banner works", "fix a bug in BasicCard").
---

# page-constructor-block-creator

Scaffolds new **blocks**, **sub-blocks**, and **components** in `@gravity-ui/page-constructor`-style repos, including `__stories__/` (which is mandatory because development is done in Storybook). Produces implementation, styles, types, Storybook story + MDX + mock data, and all wiring needed for the entity to be picked up by `PageConstructor` and rendered in Storybook. Blocks and sub-blocks also include an editor form, preview icon, and a namespaced config entrypoint. New blocks and sub-blocks implement only the new configuration. Preserve legacy configs only for existing blocks that already support old content; do not create a legacy alias for a new entity.

Keep this skill in the project; do not install or copy it into global or host-specific directories.

## Why this matters

In this project, every block/sub-block/component has a fixed shape: directory layout, BEM-styled SCSS where needed, a TypeScript model, and a `__stories__/` folder. Blocks and sub-blocks also have editor forms and config entrypoints. New entities do not need `schema.ts` or AJV registration. Existing AJV schemas remain for backward compatibility with legacy content and consumers. Each artifact serves a separate consumer:

- stories expose the entity in Storybook, the primary dev environment;
- existing AJV schemas enable legacy content validation and the standalone schema bundle;
- `schema.inputs` supplies the editor-v2 form; editor-v2 does not directly run AJV validation;
- config registration and public models/exports make the entity available to renderers and typed consumers.

The hardest parts to get right by inspection are the **Storybook title routing** (different roots and subfolders for blocks vs. sub-blocks vs. component categories) and, for blocks/sub-blocks, the **mock data shape** (which mirrors the YAML config a real page would use). Plain component stories use the component's props. This skill explains both contracts.

## Workflow

Follow this order strictly. Follow current user/project instructions for any required approval; do not infer an extra approval gate.

### 1. Decide the entity kind and outline the plan

Ask the user (or infer from context) which of the three kinds they want:

| Kind          | Directory                | Examples                  | Registered in                |
| ------------- | ------------------------ | ------------------------- | ---------------------------- |
| **Block**     | `src/blocks/<Name>/`     | Banner, CardLayout, Form  | `blocks` (namespaced config) |
| **Sub-block** | `src/sub-blocks/<Name>/` | BasicCard, Quote, Divider | `blocks` (namespaced config) |
| **Component** | `src/components/<Name>/` | Button, Title, Image      | nothing (imported directly)  |

For an editor form on an existing block, preserve its directory, types and registrations; extend the existing config instead of scaffolding a duplicate entity. Read [references/forms.md](references/forms.md) and the current form/config first.

Then **before writing files**:

1. Read AGENTS.md (root) if present — verify naming, BEM, schema, and registration conventions are still as expected. Before source exploration, read `.agents/docs/architecture.md`, `memory-bank/README.md`, relevant usage/dependency docs, and `.agents/docs/navigation.md`. For cross-cutting decisions read `memory-bank/systemPatterns.md`; for stories read `.agents/docs/storybook.md`. List the consulted docs in the response.
2. Read 1–2 close analogues (e.g., for a banner-like block, read `src/blocks/Banner/`) to mirror style and structure. Include implementation, form, config, icon, AJV schema, model, stories and registration. Existing analogues may contain legacy files, including `schema.ts` and `index_deprecated.ts`; do not copy their AJV schemas or compatibility wiring into a new entity. `src/blocks/Media/` is the complete block/form example; `src/sub-blocks/BackgroundCard/` shows a card config.
3. Present a plan listing every file you intend to create + every file you intend to modify (registration sites). Continue with authorized local work unless explicit approval or material requirements are missing.
4. Create the files according to the plan and the applicable user/project instructions.

### 2. Generate the entity

Pick the right reference for the kind being created:

- **Block** → read `references/blocks.md`
- **Sub-block** → read `references/sub-blocks.md`
- **Component** → read `references/components.md`

For every block/sub-block editor form, also read [references/forms.md](references/forms.md).

For all kinds, also consult `references/storybook-routing.md` to choose the correct Storybook `title` (the routing differs by category and is not always derivable from the filesystem path).

Blocks/sub-blocks use the following structure; some existing card configs use `.tsx`:

```text
<Name>/
  <Name>.tsx             # React implementation
  <Name>.scss            # BEM styles
  form.ts                # Fields descriptors + defaultValue
  icon.ts                # preview image data URI
  index.ts               # @gravity-ui/page-constructor/<type> config
  __stories__/
    <Name>.stories.tsx
    data.json
    <Name>.mdx
```

`index.ts` exports a config, not the React component. Its `schema.inputs` references `form`, `schema.default` references `defaultValue`, and `schema.previewImg` references the icon. This `schema` property is editor metadata, not an AJV JSON schema, and remains required for new configs. New entities do not create `schema.ts`, AJV registrations or `index_deprecated.ts`. Preserve existing old aliases and AJV schemas when maintaining old blocks. Write a new form as valid `Fields` descriptors, using Media as the main example. Banner and BackgroundCard currently generate descriptors from their existing AJV schemas; preserve such existing form dependencies without creating a new AJV schema solely for form generation. A namespaced content discriminator does not require a new package export in `package.json`.

### 3. Wire it up

Each kind has a fixed wiring checklist (kept in its reference file). Don't skip steps — partial wiring leaves the entity invisible.

In this checkout:

- `src/blocks/index.ts` exports the `blocks` array, including editor-supported sub-blocks. Add only the namespaced config for a new entity. Existing current/deprecated config pairs stay registered for backward compatibility.
- `src/constructor-items.ts` uses `blockDataMap` for existing legacy-key-to-config lookup. Do not add a legacy key or old BlockType/SubBlockType enum value for a new entity. `blockMap` and `subBlockMap` are deprecated empty objects; do not populate them.
- `PageConstructor` resolves the configs supplied through its `blocks` prop and `PageConstructorProvider`. Check the actual consumer includes the exported catalog or the new config; importing the catalog alone does not register it globally.
- Existing AJV registries are in `src/gravity-blocks/schema/`, not `src/schema/`. Preserve their schemas, discriminator keys and registrations for legacy compatibility. Do not add AJV wiring, an old alias or an old editor template for a new entity.

Recheck these sources before wiring: branches can move them. If overview docs describe old maps/paths, keep their architectural invariants and use verified source paths. Report material discrepancies rather than creating parallel registries.

### 4. Verify

After scaffolding, read `.agents/validation/README.md` and run its required checks:

- Run `npm run typecheck` (fast, catches missing exports / type mismatches) and `npm run lint`. Logic changes need unit tests, markup/SCSS needs visual checks, and AJV changes need `npm run build:schema`.
- Use `npm run dev` to open Storybook on port 7009 and check the new story renders. Inspect form defaults, edits, conditional switches, array add/delete, themes and the namespaced type. A new entity must have no legacy alias or deprecated picker entry. When updating an existing block, separately verify its preserved legacy type and hidden deprecated entry.
- Don't claim completion until the required checks pass and the Storybook entry exists at the predicted title path. Report check results and unverified behavior explicitly; typecheck alone does not prove UI behavior.

### 5. Document in `memory-bank/`

`memory-bank/` is the project's discovery index — future agents search it to find reuse candidates. Document each new entity there so future agents can discover its purpose and consumers. See `memory-bank/README.md` for the index and conventions.

Required for every kind (block / sub-block / component):

1. **Create `memory-bank/usage/<entityCamelCaseName>.md`** — mirror the format of an existing usage doc (template: `memory-bank/usage/basicCard.md`). Sections: Overview, Usage Graph (Mermaid), Component Details. Fill the Usage Graph with known consumers, including a parent wired up in the same task. If there are no consumers yet, explicitly note `(no consumers yet)` instead of inventing relationships.
2. **Append a one-line entry to `memory-bank/activeContext.md`** under recent changes — e.g. `Added <Name> <kind>: <one-line purpose>`.
3. **Add the new Storybook entry to `memory-bank/storybookComponents.md`** — slot it under the correct category (Blocks / Components / Cards) with its title path.

Block-specific (in addition to the three above):

4. **Create `memory-bank/blockDeps/<blockNameLowercase>.md`** — Mermaid Dependency Graph listing the components and sub-blocks the new block uses. Template: `memory-bank/blockDeps/banner.md`. This one is filled in immediately because dependencies are known at creation time.

Per-kind wiring checklists in `references/*.md` include these memory-bank steps as the final row — don't skip them.

## Conventions you must preserve

These appear repeatedly across the codebase. Violating them produces mismatched files that don't match other entities of the same kind.

- **PascalCase directory and file names**: `BannerCard/BannerCard.tsx`, never `bannerCard/bannerCard.tsx`. Test with the existing `src/blocks/` layout.
- **Default + named export** of the React component (e.g. `export const BannerBlock = ...; export default BannerBlock;`). Mirror the analogue's exports; sub-block implementations may use default export only. Block directory entrypoints export configs, so stories and component consumers import the implementation directly.
- **BEM via `block()` helper** from `src/utils`: `const b = block('banner-block');` — the BEM block name is the **short kebab-case entity name**, e.g. `banner-block`, without the namespace, NOT the React component name.
- **SCSS file imported as side effect** (`import './Banner.scss';`) — never CSS modules.
- **`ThemedValue<T>` / `ThemeSupporting<T>` for media/colors/images**: resolve light/dark variants via `getThemedValue()` at render time and keep themed paths in the form. When maintaining an existing legacy AJV schema, preserve its `withTheme(...)` validation for themed fields. Mock data must demonstrate light/dark assets in the shape the prop actually accepts. Show plain and `{ light, dark }` values when both are supported; object-only media props must retain their required structure.
- **No barrel `index.ts` re-exports for new components.** Consumers import directly from `src/components/Foo/Foo`. This rule applies to **`src/components/` only** — block config entrypoints are required and new entities register only their namespaced config in the `src/blocks/index.ts` array. Existing legacy configs remain for backward compatibility. Preserve existing `src/sub-blocks/index.ts` public exports from implementation files. (See AGENTS.md "Architecture invariants".)
- **i18n strings centralized** (when applicable) under `src/components/<Name>/i18n/` — but only if the component has user-facing strings, not for blocks whose strings come from the YAML config.

- **Contexts over prop drilling**: runtime cross-cutting configuration belongs in contexts/providers.

## Storybook conventions (critical)

- Stories **always** live in `<EntityDir>/__stories__/`.
- Three files: `<Name>.stories.tsx`, `data.json`, `<Name>.mdx`.
- Global decorators (`withLang`, `withMobile`, `withContextProvider`, `withPageConstructorProvider`) are auto-applied; avoid duplicating them. Inspect the current decorators before relying on runtime contexts. UIKit's `ThemeProvider`, the gravity `ThemeContext`, and a block's `theme` prop have different roles. Verify the context consumed by `useTheme()` is supplied for each theme story.
- Block/sub-block story args go through `blockTransform(args)` (single block) or `blockListTransform(...)` (list) — these run the server-side `contentTransformer` exported by `src/server.ts`. `PageConstructor` renders the supplied content; source YFM must be transformed before rendering. Skipping them means YFM markdown in titles/subtitles won't render. Plain component stories usually receive props directly; see `references/components.md`.
- `data.json` always defines a `default` (light) variant and (when the entity supports `theme`) a `darkTheme` variant. The dark variant uses themed values for assets.
- Expose `parameters.inputs: form` in block/sub-block story metadata for the editor form panel.
- The story `title` field uses `/`-separated routing — see `references/storybook-routing.md` for the rules per category.
- `*.mdx` is a documentation page that pulls in `<StoryTemplate>` from `src/demo/StoryTemplate.mdx` and lists the entity's parameters with one-line descriptions.

## Test data is YAML-shaped, not props-shaped

A subtle pitfall: the `data.json` for a block contains the **YAML config object** that consumers write in their page YAML, not the React props the component receives. The two are mostly identical, but the YAML form **always includes the `type` discriminator** (`"type": "@gravity-ui/page-constructor/banner-block"` for a new block) and may include themed-value objects that components resolve with `getThemedValue()` and their active theme at render time. When in doubt, look at an existing block's `data.json` and copy the shape exactly. Do not require a `.content` wrapper: follow the analogue's actual variant shape.

## When in doubt

If the entity you're asked to create looks structurally similar to an existing one (e.g., a "promo card" looks like `BasicCard`; a "hero variant" looks like `Hero`), **read that existing entity end-to-end first** — including its `__stories__/` and any registration sites. Mirror it. Diverging from established structure for a single entity creates inconsistency that costs more later than it saves now.

## Reference files

- `references/blocks.md` — full block creation walkthrough + wiring checklist
- `references/sub-blocks.md` — sub-block walkthrough + wiring
- `references/components.md` — component walkthrough (no central registration)
- `references/storybook-routing.md` — Storybook `title` rules per category, with full mapping table

- [references/forms.md](references/forms.md) — editor Fields, paths, repeatable groups, conditions, defaults and themes
- Skill evaluation lives at the project path `.agents/evaluation/tasks/block-creator/` (`prompt.md` and `expected.md`), using `.agents/evaluation/README.md`. Consult it only when evaluating this skill; keep evaluation criteria out of block-creation runs.
