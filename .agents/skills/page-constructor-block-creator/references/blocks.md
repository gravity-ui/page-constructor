# Creating a new block

A **block** is a full-width page section (e.g. Banner, CardLayout, Hero). Blocks are the primary unit `PageConstructor` renders from a `content.blocks` array in YAML/JSON. Every block is registered globally so that any consumer can drop it into a page config by `type`.

## File layout

```
src/blocks/<BlockName>/
├── <BlockName>.tsx          ← React component (default + named export)
├── <BlockName>.scss         ← BEM styles, imported as side effect
├── schema.ts                ← JSON Schema for block + (optional) sub-block
└── __stories__/
    ├── <BlockName>.stories.tsx
    ├── data.json
    └── <BlockName>.mdx
```

`__tests__/` and `__snapshots__/` are also conventional but only added when you write tests — don't generate empty ones.

## File-by-file

### `<BlockName>.tsx`

Mirror the existing pattern. The component is small — most blocks compose other components/sub-blocks. Use the kebab-case schema type as the BEM block name:

```tsx
import {<BlockName>BlockProps} from '../../models';
import {block} from '../../utils';

import './<BlockName>.scss';

const b = block('<block-name>'); // kebab-case, e.g. 'banner-block'

export const <BlockName>Block = (props: <BlockName>BlockProps) => {
    const {className, ...rest} = props;
    return <div className={b(null, className)}>{/* ... */}</div>;
};

export default <BlockName>Block;
```

If the block is animatable, wrap the root in `<AnimateBlock animate={animated}>` (see `src/blocks/Banner/Banner.tsx`).

### `<BlockName>.scss`

BEM naming via the same kebab-case root. Use SCSS `&__element` and `&_modifier` selectors. Import design tokens from `styles/` rather than hardcoding values.

### `schema.ts`

Defines the JSON Schema entry consumed by the editor and the standalone schema bundle. Two named exports:

```ts
import {BaseProps, AnimatableProps, ThemeProps, withTheme} from '../../schema/validators/common';

export const <BlockName>BlockProps = {
    additionalProperties: false,
    required: ['title'],
    properties: {
        ...BaseProps,
        ...AnimatableProps,
        title: {type: 'string', contentType: 'text'},
        // ...other fields
        theme: ThemeProps,
    },
};

export const <BlockName>Block = {
    '<block-name>': <BlockName>BlockProps,
};
```

`<BlockName>Block` (the second export — note the lower-cased object key matches the schema `type` discriminator) is what `src/schema/validators/blocks.ts` re-exports and what `src/schema/constants.ts` spreads into `blockSchemas`.

### TypeScript model

Models live in `src/models/constructor-items/blocks.ts` (NOT in the block's own folder unless the block is unusually large like Tabs). Add:

```ts
export interface <BlockName>BlockProps extends Animatable /* + any other base */ {
    title: string;
    // ...
}

export type <BlockName>BlockModel = {
    type: BlockType.<BlockName>Block;
} & <BlockName>BlockProps;
```

And add the model to the `BlockModels` union at the bottom of the same file.

### `__stories__/<BlockName>.stories.tsx`

```tsx
import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {<BlockName>BlockModel, <BlockName>BlockProps} from '../../../models';
import <BlockName>Block from '../<BlockName>';

import data from './data.json';

export default {
    title: 'Blocks/<BlockName>', // see references/storybook-routing.md
    component: <BlockName>Block,
} as Meta;

const DefaultTemplate: StoryFn<<BlockName>BlockModel> = (args) => (
    <<BlockName>Block {...(blockTransform(args) as <BlockName>BlockProps)} />
);

export const Default = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

Default.args = data.default.content as <BlockName>BlockModel;
DarkTheme.args = data.darkTheme.content as <BlockName>BlockModel;
```

Keep imports in three groups: third-party (`@storybook/react`), project (`../../../models`, `../<BlockName>`), local data (`./data.json`). The `blockTransform` call is essential — without it, YFM (markdown) fields like titles and subtitles won't be transformed.

If the block doesn't support `theme`, drop the `DarkTheme` story.

### `__stories__/data.json`

Mock data is the **YAML config shape** (always includes `"type": "<block-name>"`):

```json
{
  "default": {
    "content": {
      "type": "<block-name>",
      "theme": "light",
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "subtitle": "Ut enim ad minim veniam, quis nostrud exercitation."
    }
  },
  "darkTheme": {
    "content": {
      "type": "<block-name>",
      "theme": "dark",
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "subtitle": "Ut enim ad minim veniam, quis nostrud exercitation."
    }
  }
}
```

Themed assets (images, colors, media) use the dual-form:

```json
"image": "/story-assets/img_8-12_light.png"           // default story
"image": {"light": "/story-assets/img_8-12_light.png",
          "dark":  "/story-assets/img_8-12_dark.png"} // darkTheme story
```

Reuse story assets from `.storybook/static/` (path `/story-assets/...`) when you can — don't add new images unless required.

### `__stories__/<BlockName>.mdx`

```mdx
import {Meta} from '@storybook/blocks';

import {StoryTemplate} from '../../../demo/StoryTemplate.mdx';
import * as <BlockName>Stories from './<BlockName>.stories.tsx';

<Meta of={<BlockName>Stories} />
<StoryTemplate>

## Parameters

`type: '<block-name>'`

`title: string` — Title

`subtitle?: string` — Subtitle

</StoryTemplate>
```

List every public prop with a one-line description. Don't dump the schema verbatim — write it for humans skimming the docs panel.

## Wiring checklist

After the files exist, register the block in five places. Skipping any one of these breaks a real flow.

| #   | File                                     | Change                                                                                                                                                        |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `src/models/constructor-items/blocks.ts` | Add `BlockType.<BlockName>Block = '<block-name>'` to the enum; add `<BlockName>BlockProps` and `<BlockName>BlockModel`; include model in `BlockModels` union  |
| 2   | `src/blocks/index.ts`                    | `export {default as <BlockName>Block} from './<BlockName>/<BlockName>';`                                                                                      |
| 3   | `src/constructor-items.ts`               | Import `<BlockName>Block`; add `[BlockType.<BlockName>Block]: <BlockName>Block` to `blockMap`                                                                 |
| 4   | `src/schema/validators/blocks.ts`        | `export * from '../../blocks/<BlockName>/schema';`                                                                                                            |
| 5   | `src/schema/constants.ts`                | Import `<BlockName>Block` from `./validators/blocks`; spread `...<BlockName>Block` into `blockSchemas`; add `'<block-name>'` to `constructorBlockSchemaNames` |

After all five, `npm run typecheck` should pass and the Storybook entry should appear at `Blocks/<BlockName>`.

## Common pitfalls

- **Forgetting `blockTransform`** in the story → titles/subtitles render as raw markdown.
- **Missing `type` in `data.json`** → `blockTransform` works, but if the block ever flows through code that branches on `type`, it'll silently misbehave.
- **Naming the BEM root after the React component** (`block('BannerBlock')`) instead of the kebab-case schema type (`block('banner-block')`) → CSS doesn't apply.
- **Putting models inside the block's own folder** instead of `src/models/constructor-items/blocks.ts` → consumers can't import from `'@gravity-ui/page-constructor'`.
- **Forgetting `constructorBlockSchemaNames`** in `src/schema/constants.ts` → the standalone schema bundle won't include the new block.
