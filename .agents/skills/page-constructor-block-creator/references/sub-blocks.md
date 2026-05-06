# Creating a new sub-block

A **sub-block** is a reusable card or content unit composed inside a block (e.g. BasicCard, Quote, Divider). Sub-blocks are renderable entities (so they have schemas + Storybook stories) but they're not page-level — they appear nested inside `card-layout-block`, `extended-features-block`, etc.

## How sub-blocks differ from blocks

|                  | Block                                          | Sub-block                                        |
| ---------------- | ---------------------------------------------- | ------------------------------------------------ |
| Lives in         | `src/blocks/`                                  | `src/sub-blocks/`                                |
| Registered in    | `blockMap` + `BlockType`                       | `subBlockMap` + `SubBlockType`                   |
| Schema entry     | `blockSchemas` + `constructorBlockSchemaNames` | `cardSchemas` + `constructorCardSchemaNames`     |
| Storybook root   | `Blocks/<Name>`                                | `Components/Cards/<Name>` (mostly — see routing) |
| Story complexity | usually 2 stories (Default + DarkTheme)        | often 5–8 stories showing variants in lists      |

Otherwise the file shape is identical: `<Name>.tsx`, `<Name>.scss`, `schema.ts`, `__stories__/`.

## File layout

```
src/sub-blocks/<SubBlockName>/
├── <SubBlockName>.tsx
├── <SubBlockName>.scss
├── schema.ts
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

Sub-blocks often use `default` export only (the index re-export pulls the default). Check sibling sub-blocks for the precise pattern. Many sub-block components use `CardBase` or `BlockBase` from `src/components/` to get card chrome, hover effects, and links — prefer composing those over rolling your own.

## Schema (`schema.ts`)

Same shape as a block schema, but the registered key matches `SubBlockType`:

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
    '<sub-block-name>': <SubBlockName>Props,
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
    type: SubBlockType.<SubBlockName>;
}
```

And include the model in the `SubBlockModels` union.

## Storybook story

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

Sub-block `data.json` files are usually larger and richer than block ones, because they back many stories. Structure by story name when possible:

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

| #   | File                                         | Change                                                                                                                                                          |
| --- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `src/models/constructor-items/sub-blocks.ts` | Add `SubBlockType.<SubBlockName> = '<sub-block-name>'`; add `<SubBlockName>Props` and `<SubBlockName>Model`; include in `SubBlockModels` union                  |
| 2   | `src/sub-blocks/index.ts`                    | `export {default as <SubBlockName>} from './<SubBlockName>/<SubBlockName>';`                                                                                    |
| 3   | `src/constructor-items.ts`                   | Import `<SubBlockName>`; add `[SubBlockType.<SubBlockName>]: <SubBlockName>` to `subBlockMap`                                                                   |
| 4   | `src/schema/validators/sub-blocks.ts`        | `export * from '../../sub-blocks/<SubBlockName>/schema';`                                                                                                       |
| 5   | `src/schema/constants.ts`                    | Import `<SubBlockName>` from `./validators/sub-blocks`; spread `...<SubBlockName>` into `cardSchemas`; add `'<sub-block-name>'` to `constructorCardSchemaNames` |

## Common pitfalls

- **Putting the sub-block under `Blocks/` in Storybook.** Default routing is `Components/Cards/<Name>`. Non-card sub-blocks (like `Content`, `Divider`, `HubspotForm`) sit at `Components/<Name>`. See `references/storybook-routing.md`.
- **Forgetting `blockListTransform` for list templates** — sub-blocks shown in a row need each item transformed, not just one.
- **Using `BlockType` instead of `SubBlockType` in the model `type` field.**
- **Skipping `cardSchemas`** in `src/schema/constants.ts` — sub-blocks have their own schema bucket separate from blocks.
