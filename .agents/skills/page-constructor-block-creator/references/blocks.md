# Creating a new block

A **block** is a full-width page section (e.g. Banner, CardLayout, Hero). Blocks are the primary unit `PageConstructor` renders from a `content.blocks` array in YAML/JSON. New blocks implement only a namespaced config. Existing blocks retain their old configs solely for backward compatibility; do not create a legacy alias for a new block. Read [forms.md](forms.md) before implementing the editor form.

## File layout

```
src/blocks/<BlockName>/
├── <BlockName>.tsx          ← React component (default + named export)
├── <BlockName>.scss         ← BEM styles, imported as side effect
├── form.ts                  ← Fields descriptors + defaultValue
├── icon.ts                  ← preview image data URI
├── index.ts                 ← namespaced config
└── __stories__/
    ├── <BlockName>.stories.tsx
    ├── data.json
    └── <BlockName>.mdx
```

`__tests__/` and `__snapshots__/` are also conventional but only added when you write tests — don't generate empty ones.

## File-by-file

### `<BlockName>.tsx`

Mirror the existing pattern. The component is small — most blocks compose other components/sub-blocks. Use the short kebab-case entity name as the BEM block name, e.g. `banner-block`, without the `@gravity-ui/page-constructor/` namespace:

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

### Legacy AJV schema (`schema.ts`, existing blocks only)

New blocks do not create `schema.ts` or register an AJV schema. The `schema` property in `index.ts` is editor metadata and still references `form.ts`, defaults and the preview icon.

When updating an existing block with an AJV schema, preserve the schema's exports, discriminator and legacy validation behavior. Keep it consistent with changes to that existing content contract. The following example applies only to such an existing schema:

```ts
import {BaseProps, AnimatableProps, ThemeProps, withTheme} from '../../gravity-blocks/schema/validators/common';

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
    '<existing-legacy-type>': <BlockName>BlockProps,
};
```

For that existing legacy block, the second export keeps its actual discriminator key. It is re-exported from `src/gravity-blocks/schema/validators/blocks.ts` and spread into `blockSchemas` in `src/gravity-blocks/schema/constants.ts`. Preserve these registrations; they are not required for a new block.

### TypeScript model

Models live in `src/models/constructor-items/blocks.ts` (NOT in the block's own folder unless the block is unusually large like Tabs). Add:

```ts
export interface <BlockName>BlockProps extends Animatable /* + any other base */ {
    title: string;
    className?: string; // accepted by every block via ClassNameProps — declare explicitly so destructuring types cleanly
    // ...
}

export type <BlockName>BlockModel = {
    type: '@gravity-ui/page-constructor/<block-name>';
} & <BlockName>BlockProps;
```

Add the model to the `BlockModels` union at the bottom of the same file and export the props/model through the applicable public model API. The new model uses the namespaced literal type; do not add a short legacy value to `BlockType` merely to make it look like an old block.

### `__stories__/<BlockName>.stories.tsx`

```tsx
import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {<BlockName>BlockModel, <BlockName>BlockProps} from '../../../models';
import <BlockName>Block from '../<BlockName>';

import {form} from '../form';

import data from './data.json';

export default {
    title: 'Blocks/<BlockName>', // all blocks live under `Blocks/`; sub-blocks and components use different roots — see references/storybook-routing.md
    component: <BlockName>Block,
    parameters: {inputs: form},
} as Meta;

const DefaultTemplate: StoryFn<<BlockName>BlockModel> = (args) => (
    <<BlockName>Block {...(blockTransform(args) as <BlockName>BlockProps)} />
);

export const Default = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

Default.args = data.default as <BlockName>BlockModel;
DarkTheme.args = data.darkTheme as <BlockName>BlockModel;
```

Keep imports in three groups: third-party (`@storybook/react`), project (`../../../models`, `../<BlockName>`), local data (`./data.json`). The `blockTransform` call is essential — without it, YFM (markdown) fields like titles and subtitles won't be transformed.

If the block doesn't support `theme`, drop the `DarkTheme` story.

### `__stories__/data.json`

Mock data is the **YAML config shape** (always includes `"type": "@gravity-ui/page-constructor/<block-name>"` for a new block). The `theme` field must match the variant: `default.theme = "light"`, `darkTheme.theme = "dark"`. Mirror the actual analogue data shape; Media uses flat variants, not a `content` wrapper. Mismatched values silently render the wrong theme in Storybook.

For wrapped variants, the discriminator and any content-theme prop belong inside `content`, and the story reads `data.default.content` / `data.darkTheme.content` (as Banner does). Media's Default uses a flat variant, while its DataLens story reads `data.dataLens.content`. Follow the particular story, not a blanket wrapper rule. The `theme` values above describe a component prop; themed assets resolved by `useTheme()` require the matching gravity `ThemeContext`. Inspect `src/gravity-blocks/context/GravityBlocksProvider.tsx` and the current story decorators before claiming dark-theme behavior.

```json
{
  "default": {
    "type": "@gravity-ui/page-constructor/<block-name>",
    "theme": "light",
    "title": "Lorem ipsum dolor sit amet",
    "subtitle": "Ut enim ad minim veniam"
  },
  "darkTheme": {
    "type": "@gravity-ui/page-constructor/<block-name>",
    "theme": "dark",
    "title": "Lorem ipsum dolor sit amet",
    "subtitle": "Ut enim ad minim veniam"
  }
}
```

Themed assets (images, colors, media) use the dual-form:

```json
"image": "/story-assets/img_8-12_light.png"           // default story
"image": {"light": "/story-assets/img_8-12_light.png",
          "dark":  "/story-assets/img_8-12_dark.png"} // darkTheme story
```

Reuse story assets from `.storybook/public/` (path `/story-assets/...`) when you can — don't add new images unless required.

### `__stories__/<BlockName>.mdx`

```mdx
import {Meta} from '@storybook/blocks';

import {StoryTemplate} from '../../../demo/StoryTemplate.mdx';
import * as <BlockName>Stories from './<BlockName>.stories.tsx';

<Meta of={<BlockName>Stories} />
<StoryTemplate>

## Parameters

`type: '@gravity-ui/page-constructor/<block-name>'`

`title: string` — Title

`subtitle?: string` — Subtitle

</StoryTemplate>
```

List every public prop with a one-line description. Don't dump the schema verbatim — write it for humans skimming the docs panel.

## Config entrypoints

`index.ts` exports the editor/runtime config, not the React component:

```ts
import type {BlockData} from '../../constructor-items';
import NoticeBlock from './Notice';
import {defaultValue, form} from './form';
import icon from './icon';

const config: BlockData = {
  type: '@gravity-ui/page-constructor/notice-block',
  component: NoticeBlock,
  schema: {
    name: 'Notice',
    group: '@gravity-ui/page-constructor/Blocks',
    inputs: form,
    default: defaultValue,
    previewImg: icon,
  },
};
export default config;
```

Only when maintaining an existing block that already has `index_deprecated.ts`, preserve its component, form, defaults and icon with
`type: 'notice-block'`, `group: '@deprecated'` and `hidden: true` in `schema`.
The short type above is illustrative; preserve the existing block's actual discriminator unchanged. Keep that existing pair as separate exports; avoid copying the form's contents. Do not generate `index_deprecated.ts` or an unnamespaced alias for a new block.

`icon.ts` default-exports a data URI. Media uses `svgToDataUri()` from
`src/utils/svg.ts`, which URL-encodes an SVG as
`data:image/svg+xml,...`. Mirror that helper; do not mislabel URL-encoded SVG as
base64. Do not paste the whole icon data into documentation or run reports.

## Wiring checklist

For a new block, register the namespaced configuration, public model and required text transforms. Do not create AJV wiring:

| #   | File                                          | Change                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `src/models/constructor-items/blocks.ts`      | Add/export `<BlockName>BlockProps` and `<BlockName>BlockModel` with the namespaced type; include the model in `BlockModels`. Do not add an old `BlockType` value.                                                                                                                                                                                                                                                                        |
| 2   | `src/blocks/index.ts`                         | Import the new config and append it once to `blocks`. No deprecated config or duplicate old type.                                                                                                                                                                                                                                                                                                                                        |
| 3   | `src/gravity-blocks/text-transform/config.ts` | Register required title/YFM parsers for the new namespaced discriminator. `blockTransform` alone does not add parsers for a new type.                                                                                                                                                                                                                                                                                                    |
| 4   | `memory-bank/` (4 files)                      | Create `memory-bank/usage/<blockName>.md` (Overview, Usage Graph, Component Details; template: `memory-bank/usage/basicCard.md`). Record known consumers, or note that there are none yet. Create `memory-bank/blockDeps/<blockNameLowercase>.md` (Mermaid graph of components/sub-blocks used; template: `memory-bank/blockDeps/banner.md`). Append entries to `memory-bank/activeContext.md` and `memory-bank/storybookComponents.md`. |

Verify the new namespaced type resolves to the component and appears once in the picker, with no old alias. Inspect `Blocks/<Name>` and the form panel in Storybook. Run required project checks; a present story source does not establish rendered UI or successful form interactions. For changes to an existing old block, also verify its legacy content remains compatible.

### Existing legacy AJV contracts only

When an existing block's content contract changes, maintain its existing schema and registrations:

| File                                             | Maintenance                                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `src/gravity-blocks/schema/validators/blocks.ts` | Preserve the schema re-export, e.g. `export * from '../../../blocks/<BlockName>/schema';`.                    |
| `src/gravity-blocks/schema/constants.ts`         | Preserve the existing import, spread into `blockSchemas`, and discriminator in `constructorBlockSchemaNames`. |

Validate accepted and rejected legacy content when changing these contracts. New blocks do not need these edits.

Existing legacy keys in `blockDataMap`/`BlockType` and `src/editor/data/templates/<legacy-type>.json` serve old contracts. Do not extend them solely to give a new block legacy support. When maintaining an existing old block, preserve its current/deprecated configs, old model/discriminator, schema registrations and editor templates; update only what that existing contract needs.

## Common pitfalls

- **Forgetting `blockTransform`** in the story → titles/subtitles render as raw markdown.
- **Missing `type` in `data.json`** → `blockTransform` works, but if the block ever flows through code that branches on `type`, it'll silently misbehave.
- **Naming the BEM root after the React component** (`block('BannerBlock')`) instead of the short kebab-case entity name (`block('banner-block')`, without the namespace) → CSS doesn't apply.
- **Putting models inside the block's own folder** instead of `src/models/constructor-items/blocks.ts` → consumers can't import from `'@gravity-ui/page-constructor'`.
- **Copying legacy AJV wiring into a new block** → adds unnecessary compatibility artifacts. New blocks use the editor config and `form.ts`; preserve AJV schemas and registrations only for existing legacy contracts.

- **Copying `index_deprecated.ts` from an old analogue into a new block** → introduces unsupported old-format compatibility. Copy only the namespaced config.
