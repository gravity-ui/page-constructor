# @gravity-ui/page-constructor — Agent Context

## Root Context

**Package**: `@gravity-ui/page-constructor` v8.7.1  
**Purpose**: React library for rendering web pages from JSON/YAML data. A page is assembled from typed blocks placed in any order; each block declares its schema, types, and visual component.  
**Peer deps**: `react ^16–19`, `@gravity-ui/uikit ^7`, `@diplodoc/transform ^4`  
**Key exports**: main (CJS/ESM), `./editor`, `./server`, `./styles/*`, `./widget/*`, `./schema/*`

### Commands

| Task                  | Command                                          |
| --------------------- | ------------------------------------------------ |
| Dev / Storybook       | `npm run dev` (port 7009)                        |
| Build (all)           | `npm run build`                                  |
| Build client          | `npm run build:client` (gulp)                    |
| Build server          | `npm run build:server` (tsc → `server/index.js`) |
| Build widget          | `npm run build:widget` (webpack)                 |
| Build schema          | `npm run build:schema` (webpack)                 |
| Typecheck             | `npm run typecheck`                              |
| Lint (all)            | `npm run lint`                                   |
| Lint + fix            | `npm run lint:fix`                               |
| Unit tests            | `npm test`                                       |
| Unit tests (watch)    | `npm run test:watch`                             |
| Visual tests          | `npm run playwright`                             |
| Visual tests (update) | `npm run playwright:update`                      |
| Visual tests (docker) | `npm run playwright:docker`                      |

## Where to find info

| Need                                                        | Location                       |
| ----------------------------------------------------------- | ------------------------------ |
| Architecture invariants (**READ before** structural change) | `.agents/docs/architecture.md` |
| Storybook & dev workflow                                    | `.agents/docs/storybook.md`    |
| Project directory map                                       | `.agents/docs/navigation.md`   |
| Testing & validation (**RUN before** completing a task)     | `.agents/validation/README.md` |
| Reusable workflows (block creation, etc.)                   | `.agents/skills/`              |
| Project knowledge base (component usage, block deps)        | `memory-bank/README.md`        |
| Evaluation tasks                                            | `.agents/evaluation/README.md` |

### Architecture invariants

Block-first, themed values, BEM, contexts-over-props, schema-per-block, no barrels → see `.agents/docs/architecture.md` for the full list and the _why_ behind each rule. **READ before** any structural change.

---

## Memory Bank

`memory-bank/` is the project knowledge base — reuse patterns, block dependencies, change history. Index of files, coverage, and when-to-consult rules → `memory-bank/README.md`. **READ before** modifying an existing block/component.

---

## Development workflow

Storybook is the primary dev environment (`npm run dev` → http://localhost:7009). Decorators, story conventions, and the full Storybook structure → `.agents/docs/storybook.md`.

---

## Project navigation

Full directory map (entry points, blocks, sub-blocks, components, containers, contexts, models, hooks, utils, schema, styles, server, widget) → `.agents/docs/navigation.md`.

Quick pointers:

- New block? → use skill `.agents/skills/page-constructor-block-creator/`
- Find similar component before creating one → `memory-bank/usage/<component>.md`
- Block dependency graph → `memory-bank/blockDeps/`

---

## Testing & validation

Validation checks the agent **must run before completing a change** (typecheck, lint, unit tests, visual tests) → see `.agents/validation/README.md`.

---

## Agent skills

Project-specific agent guides live in **`.agents/skills/`** — this is the canonical, host-agnostic location. Each skill is a directory with a `SKILL.md` (entry + when to use) and an optional `references/` folder of plain-markdown deep-dives. The bodies and references are plain markdown with no host-specific runtime requirements.

Before scaffolding new entities or running project workflows, browse `.agents/skills/` to see if a relevant guide exists.

### Wiring skills into your agent host

Hosts that auto-discover skills (Claude Code, Cursor, Codex, etc.) usually expect them under a host-specific path (e.g. `.claude/skills/`). Those paths are **gitignored** — each developer wires up their own host locally. The simplest wiring is a symlink from the host path to `.agents/skills/`.

Example for Claude Code (run from the repo root):

```sh
mkdir -p .claude
ln -s ../.agents/skills .claude/skills
```

Other hosts follow the same pattern — just point the host's expected path at `.agents/skills/`. If your host doesn't support symlinks, copy the directory instead and refresh on updates.
