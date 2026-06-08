# Storybook title routing

The `title` field in `default export = { title: '...' } as Meta` controls where the story appears in Storybook's left sidebar. The routing is **not** a direct mirror of the filesystem — it uses semantic categories and doesn't always match the directory name.

Get this right before writing the story file. Wrong routing means the user can't find the new entity in the sidebar.

## Rules per kind

### Blocks (`src/blocks/<Name>/`)

Always:

```
Blocks/<Name>
```

Examples observed in repo:

- `Blocks/Banner`
- `Blocks/CardLayout`
- `Blocks/Form`
- `Blocks/SliderOld (deprecated)` — when deprecating an old block, append ` (deprecated)` to the title (not the directory).

The `<Name>` matches the React component / directory PascalCase name, not the kebab-case schema type.

### Sub-blocks (`src/sub-blocks/<Name>/`)

Most sub-blocks are **cards** (visually framed content units) and go under `Components/Cards/`:

```
Components/Cards/<Name>
```

Examples:

- `Components/Cards/BasicCard`
- `Components/Cards/BackgroundCard`
- `Components/Cards/ImageCard`
- `Components/Cards/LayoutItem`
- `Components/Cards/MediaCard`
- `Components/Cards/PriceCard`
- `Components/Cards/PriceDetailed (deprecated)`
- `Components/Cards/Quote`

A handful of non-card sub-blocks go directly under `Components/`:

| Sub-block     | Title                    |
| ------------- | ------------------------ |
| `Content`     | `Components/Content`     |
| `Divider`     | `Components/Divider`     |
| `HubspotForm` | `Components/HubspotForm` |

**Heuristic:** if the sub-block visually renders as a bounded card (border, shadow, hover effect), use `Components/Cards/`. If it's a presentational unit without card chrome (a horizontal rule, a content list, a form embed), use `Components/<Name>` directly.

When unsure, ask — getting this wrong creates a sidebar entry the team has to manually move later.

### Components (`src/components/<Name>/`)

Components are split across **three sub-categories** in the sidebar based on theme:

| Category        | Title prefix                              | Members                                                                                                                                                                                                                                  |
| --------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default         | `Components/<Name>`                       | `AnimateBlock`, `Author`, `BalancedMasonry`, `BrandFooter`, `ContentList`, `ErrorWrapper`, `FullWidthBackground`, `Map`, `MetaInfo`, `OverflowScroller`, `Table`, `Title`, `ToggleArrow`, `UnpublishedLabel`, `YandexForm`, `YFMWrapper` |
| Links & buttons | `Components/Links and buttons/<Name>`     | `BackLink`, `Button`, `Control`, `FileLink`, `HeaderBreadcrumbs`, `Link`                                                                                                                                                                 |
| Media           | `Components/Pics, video, DataLens/<Name>` | `BackgroundImage`, `BackgroundMedia`, `FullscreenImage`, `FullscreenMedia`, `Image`, `Media`, `ReactPlayer`, `VideoBlock`                                                                                                                |

**Heuristic:**

- Anything that's a clickable navigation primitive → `Components/Links and buttons/`
- Anything that displays media (images, video, embeds, fullscreen viewers) → `Components/Pics, video, DataLens/`
- Everything else → `Components/<Name>`

If your new component clearly fits one of the existing buckets, use it. If it's a new kind, default to `Components/<Name>` and ask the user whether it should sit in a new sub-category.

## Quick lookup table

When you know the directory, look up the title:

| Source path                           | Title                                  |
| ------------------------------------- | -------------------------------------- |
| `src/blocks/<X>/`                     | `Blocks/<X>`                           |
| `src/sub-blocks/<X>/` (card-like)     | `Components/Cards/<X>`                 |
| `src/sub-blocks/<X>/` (non-card)      | `Components/<X>`                       |
| `src/components/<X>/` (links/buttons) | `Components/Links and buttons/<X>`     |
| `src/components/<X>/` (media)         | `Components/Pics, video, DataLens/<X>` |
| `src/components/<X>/` (other)         | `Components/<X>`                       |

## Verifying after creation

After writing the story, search existing titles to make sure you didn't pick a path that conflicts or sits in the wrong category:

```sh
grep -h "title:" src/blocks/*/__stories__/*.stories.tsx \
                src/sub-blocks/*/__stories__/*.stories.tsx \
                src/components/*/__stories__/*.stories.tsx | sort -u
```

The new title should slot in alphabetically next to similar entities. If it sticks out (e.g., `Components/MyButton` next to `Components/Links and buttons/Button`), reconsider the routing.
