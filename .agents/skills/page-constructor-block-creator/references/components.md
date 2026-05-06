# Creating a new component

A **component** is a shared UI primitive (e.g. Button, Title, Image, BackgroundMedia). Components are not registered in any global map — blocks and sub-blocks just import them directly. They're the "library" half of `@gravity-ui/page-constructor`.

## Decide if you actually need a new component

Before writing one, check if `@gravity-ui/uikit` already has it (the project leans heavily on uikit). The project's CLAUDE.md is explicit: search the existing UI kit before creating new components. Common cases that are already handled:

- Buttons → `@gravity-ui/uikit` `Button` (the project's `Button` is a wrapper that adds analytics + locale-aware tld handling)
- Layout primitives → uikit `Flex`
- Loading states → uikit `Spin`

If a similar primitive already exists in `src/components/`, prefer extending it.

## File layout

```
src/components/<ComponentName>/
├── <ComponentName>.tsx
├── <ComponentName>.scss     ← only if styled
└── __stories__/
    ├── <ComponentName>.stories.tsx
    ├── data.json
    └── <ComponentName>.mdx
```

Optional extras some components have:

- `utils.ts` — helpers private to this component
- `i18n/` — locale strings (only if user-facing)
- `__tests__/`, `__snapshots__/` — when tests exist
- `README.md` — only when the user explicitly asks

## Component file

Components are usually a bit richer than blocks/sub-blocks because they have more variants. The minimum:

```tsx
import {<ComponentName>Props} from '../../models'; // or local types if not in models
import {block} from '../../utils';

import './<ComponentName>.scss';

const b = block('<component-name>'); // kebab-case BEM root

const <ComponentName> = (props: <ComponentName>Props) => {
    // ...
};

export default <ComponentName>;
```

If the props are component-private (not consumed across the public API), define them in the component file directly; otherwise declare them in `src/models/constructor-items/common.ts`.

## No global registration

Unlike blocks and sub-blocks, components are **not** added to any registry. Consumers and other internal entities import them directly:

```ts
import Button from '../../components/Button/Button';
```

The project's AGENTS.md is explicit: **no `index.ts` barrel re-exports for new components.** Don't create one.

## Storybook story

The story works the same way as for blocks/sub-blocks, but typically **without** `blockTransform` — components don't go through the YFM content transformer because they don't take YFM strings (the parent block does).

```tsx
import {Meta, StoryFn} from '@storybook/react';

import <ComponentName> from '../<ComponentName>';
import {<ComponentName>Props} from '../../../models';

import data from './data.json';

export default {
    title: 'Components/<...>/<ComponentName>', // see references/storybook-routing.md
    component: <ComponentName>,
} as Meta;

const DefaultTemplate: StoryFn<<ComponentName>Props> = (args) => <<ComponentName> {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = data.default as <ComponentName>Props;
```

If the component renders YFM content directly (rare — typically only `YFMWrapper`, `Title`, `Content`), keep `blockTransform`.

## `data.json`

Free-form. Components don't have a fixed YAML config shape, so structure `data.json` to back the stories you write. Keep it simple — usually just a flat `default` object plus per-story overrides:

```json
{
  "default": {"text": "Sample text"},
  "withIcon": {"text": "With icon", "icon": "..."}
}
```

## MDX

Same template as for blocks/sub-blocks. Document each prop in the `## Parameters` section.

## Wiring checklist

| #   | File             | Change                                                                                                            |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | (component file) | Define `<ComponentName>Props` interface (in component file or `src/models/constructor-items/common.ts` if shared) |
| 2   | Importers        | Direct import: `import <ComponentName> from '../../components/<ComponentName>/<ComponentName>';`                  |

That's it — no `blockMap`, no schema, no `BlockType`. Components are just code.

## Common pitfalls

- **Adding the component to a barrel `index.ts`.** AGENTS.md forbids this for new components.
- **Putting the story under `Components/<ComponentName>` when it should be under a subfolder** like `Links and buttons/` or `Pics, video, DataLens/`. Check `references/storybook-routing.md` and existing siblings.
- **Recreating something uikit already has.** Always look at `@gravity-ui/uikit` exports first.
- **Skipping the SCSS file** when the component renders DOM. Even tiny visual components have `.scss` files in this project for consistency and theme integration.
- **Defining `Props` in the component file when other internal code already needs them.** If `Props` are referenced from `models/`, move them to `src/models/constructor-items/common.ts`.
