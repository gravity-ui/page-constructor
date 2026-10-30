# Creating a new sub-block

A **sub-block** is a reusable card or content unit composed inside a block (e.g. BasicCard, Quote, Divider). Sub-blocks are renderable entities (so they have schemas + Storybook stories) but they're not page-level — they appear nested inside `card-layout-block`, `extended-features-block`, etc.

## How sub-blocks differ from blocks

|                  | Block                                   | Sub-block                                        |
| ---------------- | --------------------------------------- | ------------------------------------------------ |
| Lives in         | `src/blocks/`                           | `src/sub-blocks/`                                |
| Registered in    | `blocks` (namespaced config)            | `blocks` (namespaced config)                     |
| Editor form      | `schema.inputs: form`                   | `schema.inputs: form`                            |
| Storybook root   | `Blocks/<Name>`                         | `Components/Cards/<Name>` (mostly — see routing) |
| Story complexity | usually 2 stories (Default + DarkTheme) | often 5–8 stories showing variants in lists      |

The block configuration/form contract also applies to sub-blocks. Read [forms.md](forms.md) and the config entrypoints in [blocks.md](blocks.md). Use group `@gravity-ui/page-constructor/Cards` for cards, following BackgroundCard; new sub-blocks have only the namespaced config. Preserve a hidden `@deprecated` config only when it already exists for an old sub-block. Existing config entrypoints may use `.tsx`.

## File layout

```
src/sub-blocks/<SubBlockName>/
├── <SubBlockName>.tsx
├── <SubBlockName>.scss
├── form.ts
├── icon.ts
├── index.ts                # config; existing cards may use index.tsx
└── __stories__/
    ├── <SubBlockName>.stories.tsx
    ├── data.json
    └── <SubBlockName>.mdx
```

## Component (`<SubBlockName>.tsx`)

```tsx
import {<SubBlockName>Props} from '../../models';
import {block} from '../../utils';

import './<SubBlockName>.scss';

const b = block('<sub-block-name>'); // kebab-case, e.g. 'basic-card'

const <SubBlockName> = (props: <SubBlockName>Props) => {
    // ...
};

export default <SubBlockName>;
```

Sub-block components often use `default` export only. New sub-blocks export their config from the directory entrypoint; the public `src/sub-blocks/index.ts` re-export must import the implementation directly. Preserve existing exceptions such as `HubspotForm`, whose `index.tsx` exports a React component. Check sibling sub-blocks for the precise pattern. Many sub-block components use `CardBase` or `BlockBase` from `src/components/` to get card chrome, hover effects, and links — prefer composing those over rolling your own.

## Legacy AJV schema (`schema.ts`, existing sub-blocks only)

New sub-blocks do not create `schema.ts` or register an AJV schema. Their config's `schema.inputs` still references `form`.

When maintaining an existing sub-block with an AJV schema, preserve its discriminator, exports and validation behavior. The following schematic example applies only to an existing legacy schema:

```ts
export const <SubBlockName>Props = {
    additionalProperties: false,
    required: ['title'],
    properties: {
        ...BaseProps,
        title: {type: 'string', contentType: 'text'},
        // ...
    },
};

export const <SubBlockName> = {
    '<existing-legacy-type>': <SubBlockName>Props,
};
```

## Model

Add to `src/models/constructor-items/sub-blocks.ts`:

```ts
export interface <SubBlockName>Props /* extends ... */ {
    title: string;
    // ...
}

export interface <SubBlockName>Model extends <SubBlockName>Props {
    type: '@gravity-ui/page-constructor/<sub-block-name>';
}
```

Include the model in the `SubBlockModels` union and export it through the applicable public model API with its namespaced literal type. Do not create a legacy `SubBlockType` value merely to mirror an old sub-block.

## Storybook story

Set `parameters.inputs: form` in story metadata to expose the form panel.

Sub-block stories typically demonstrate **multiple variants** (sizes, borders, with/without icon, etc.) because the entity is composable. Look at `src/sub-blocks/BasicCard/__stories__/BasicCard.stories.tsx` for the canonical pattern with `DefaultTemplate`, `ListTemplate`, and `VariousTemplate`. Reuse those template ideas; don't reinvent.

Two key utilities for sub-block stories:

- `blockTransform(args)` — single sub-block (same as for blocks).
- `blockListTransform(Object.values(args))` — when the story args are an array of sub-blocks, use this to transform them all.

Always destructure `type` out of the transformed result before spreading into the React component (the React props don't have `type`):

```tsx
const {type, ...props} = blockTransform(args);
return <<SubBlockName> {...(props as <SubBlockName>Props)} />;
```

Story `title` follows the routing rules — for cards it's `Components/Cards/<Name>`. See `references/storybook-routing.md`.

## `data.json`

Sub-block `data.json` files are usually larger and richer than block ones, because they back many stories. Structure by story name when possible. The schematic fragments below may be merged by a story, as in BasicCard; the complete object passed to `blockTransform` must include the new namespaced `type`. Keep story-only variant helpers separate from persisted props:

```json
{
  "default": { "title": "...", "text": "..." },
  "withIcon": { "icons": [...], "title": "..." },
  "withBorder": { "title": "..." },
  "sizes": [...],
  "url": "https://example.com"
}
```

Look at a real sub-block's `data.json` (BasicCard's is the most thorough) before designing yours.

## MDX

Same template as blocks — `Meta` + `StoryTemplate` + a `## Parameters` section listing props.

## Wiring checklist

| #   | File or consumer                              | Change                                                                                                                                                                                                                                                                                                                                                    |
| --- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `src/models/constructor-items/sub-blocks.ts`  | Add/export `<SubBlockName>Props` and `<SubBlockName>Model` with the namespaced type; include the model in `SubBlockModels`. Do not add an old `SubBlockType` value.                                                                                                                                                                                       |
| 2   | `src/sub-blocks/index.ts`                     | Add the public component export from the implementation: `export {default as <SubBlockName>} from './<SubBlockName>/<SubBlockName>';`. Preserve existing exports.                                                                                                                                                                                         |
| 3   | `src/blocks/index.ts`                         | Import the new namespaced sub-block config and append it once to `blocks`, the common editor catalog.                                                                                                                                                                                                                                                     |
| 4   | `src/gravity-blocks/text-transform/config.ts` | Add required title/YFM parsers for the namespaced discriminator.                                                                                                                                                                                                                                                                                          |
| 5   | Parent block/list                             | Verify namespaced children work through the actual new registry and the parent's types; do not add an old alias to satisfy a legacy-only path.                                                                                                                                                                                                            |
| 6   | `memory-bank/` (3 files)                      | Create `memory-bank/usage/<subBlockCamelCase>.md` (Overview, Usage Graph, Component Details; template: `memory-bank/usage/basicCard.md`). Record known consumers, or note that there are none yet. Append entries to `memory-bank/activeContext.md` and `memory-bank/storybookComponents.md`. No `blockDeps/` file — those are only for top-level blocks. |

For a new sub-block, do not add a legacy alias, deprecated config, old `SubBlockType` value or `blockDataMap` legacy key for backward compatibility. Preserve the existing contracts when updating an old sub-block.

Check the new type resolves to its component and appears once in the picker. Test the form on its own and within the consuming parent block/list. For existing old sub-blocks, separately verify preserved legacy compatibility.

### Existing legacy AJV contracts only

New sub-blocks do not need AJV registration. When changing an existing legacy contract, maintain its existing schema and registrations:

| File                                                          | Maintenance                                                                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `src/gravity-blocks/schema/validators/sub-blocks.ts`          | Preserve the schema re-export, e.g. `export * from '../../../sub-blocks/<SubBlockName>/schema';`.                      |
| `src/gravity-blocks/schema/constants.ts` — card consumers     | Preserve the existing schema import/spread into `cardSchemas` and its discriminator in `constructorCardSchemaNames`.   |
| `src/gravity-blocks/schema/constants.ts` — children consumers | Preserve the existing schema import/spread into `blockSchemas` and its discriminator in `constructorBlockSchemaNames`. |

For these existing schemas, choose the AJV registry by the consuming schema, not the `src/sub-blocks/` directory: `ChildrenCardsProps` refers to `definitions/cards`, while `ChildrenProps` refers to `definitions/children` in `src/gravity-blocks/schema/validators/common.ts`. CardLayout uses `ChildrenCardsProps`; Divider is an existing sub-block registered in `blockSchemas`. Preserve the existing schema and discriminator in every bucket used by its legacy consumers. Verify new children through the current renderer/editor path; do not extend a legacy parent's AJV schema solely to support a new sub-block.

## Common pitfalls

- **Putting the sub-block under `Blocks/` in Storybook.** Default routing is `Components/Cards/<Name>`. Non-card sub-blocks (like `Content`, `Divider`, `HubspotForm`) sit at `Components/<Name>`. See `references/storybook-routing.md`.
- **Forgetting `blockListTransform` for list templates** — sub-blocks shown in a row need each item transformed, not just one.
- **Giving a new sub-block a legacy enum type instead of its namespaced literal type.** Existing old models retain their `SubBlockType` contracts.
- **Changing an existing legacy sub-block's AJV registration incorrectly** — follow the consuming schema's reference to `definitions/cards` or `definitions/children` and preserve its actual discriminator. New sub-blocks do not need AJV registration.
