# Development workflow — Storybook

**Primary dev environment is Storybook** — there is no separate demo app. All visual development, block iteration, and manual testing happen inside Storybook.

```
npm run dev   # starts Storybook at http://localhost:7009
```

## Storybook structure

| Path                                | Role                                                                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `.storybook/main.ts`                | Webpack5 config, addon registration, story globs                                                                      |
| `.storybook/preview.ts`             | Global decorators, viewports, backgrounds, docs theme                                                                 |
| `.storybook/decorators/`            | `withLang`, `withMobile`, `withContextProvider`, `withPageConstructorProvider` — applied to every story automatically |
| `.storybook/stories/documentation/` | MDX docs: Blocks, Sub Blocks, Types, Indents                                                                          |
| `.storybook/addons/theme-addon/`    | Light/dark theme switcher (global toolbar)                                                                            |
| `.storybook/addons/yaml-addon/`     | Extra "YAML" tab in each story showing the block config source                                                        |
| `.storybook/theme/`                 | Storybook UI theme (light)                                                                                            |
| `src/**/__stories__/`               | Per-block/component story files (`*.stories.tsx`, `*.mdx`)                                                            |

## Global decorators (applied to all stories)

1. `withLang` — sets locale from the toolbar `lang` global
2. `withMobile` — sets `isMobile` from the `platform` global
3. `withContextProvider` — wraps with editor/internal contexts
4. `withPageConstructorProvider` — wraps with `PageConstructorProvider` (theme, locale, isMobile)

This means every story already has a fully configured `PageConstructorProvider` — you do **not** need to add it manually in individual stories.

## Story conventions

- Stories live in `src/<category>/<ComponentName>/__stories__/<ComponentName>.stories.tsx`
- Use `autodocs: true` — component docs are generated automatically from prop types
- `layout: 'fullscreen'` is the default — blocks render edge-to-edge
- The `yaml-addon` reads the story `args` to generate the YAML tab; keep `args` representative
