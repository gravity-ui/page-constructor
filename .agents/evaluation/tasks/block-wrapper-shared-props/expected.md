# Expected: block-wrapper-shared-props

## Input

- Prompt: `prompt.md` in this folder
- Repo state: `AGENTS.md` contains the **Pre-response gate (READ FIRST)** section
- Reference docs the agent is expected to consult: `.agents/docs/architecture.md`, `memory-bank/README.md` (+ `memory-bank/systemPatterns.md`), `.agents/docs/navigation.md`
- Reference source files: `src/components/BlockBase/BlockBase.tsx`, `src/components/BlockBase/BlockBase.scss`, `src/containers/PageConstructor/components/ConstructorBlock/ConstructorBlock.tsx`, `src/containers/PageConstructor/components/ConstructorItem/ConstructorItem.tsx`, `src/models/constructor-items/blocks.ts`, `src/models/customization.ts`, `styles/mixins.scss`
- Target audience: a developer of this repo who has not read the wrapper code yet

## Expected output

- Format: markdown
- Sections (in this order):
  1. `Consulted docs` — explicit bullet list of the three files from the gate
  2. `Wrapper chain` — top-to-bottom chain `PageConstructor → ConstructorRow → ConstructorBlocks → ConstructorBlock → BlockDecoration → BlockBase → ConstructorItem → block from blockMap`
  3. `Shared-props contract` — names `BlockBaseProps` at `src/models/constructor-items/blocks.ts:86` with fields `anchor`, `visible`, `resetPaddings` (deprecated), `indent: { top?, bottom? }`, `qa`; mentions `Block = BlockModels & BlockBaseProps` at `blocks.ts:643`
  4. `Routing` — describes `pick(data, ['anchor','visible','resetPaddings','indent'])` in `ConstructorBlock.tsx:24-35`; states that the block component itself does NOT receive `BlockBaseProps`
  5. `indent → spacing` — BEM modifiers `indentTop` / `indentBottom` / `reset-paddings` on `<Col>` in `BlockBase.tsx`; default `{ top: 'l', bottom: 'l' }`; `resetPaddings` → `{ top: '0', bottom: '0' }`; `@mixin indents` in `styles/mixins.scss` mapping to `$indentXS…$indentXL` tokens; mobile override via `--pc-first-block-mobile-indent`
  6. `Extension point` — all FOUR edits required to add a new shared prop: `BlockBaseProps`, `pick(...)` in `ConstructorBlock.tsx:25`, handling in `BlockBase.tsx`, `BlockDecorationProps` in `src/models/customization.ts`
- Tone: technical, no marketing, no apology / understanding fillers
- Length: 40–60 lines (file paths and the chain make this denser than 20 lines)
- Code excerpts: only if minimal and load-bearing; never paste whole files

## Disqualifiers (any one = FAIL)

- Section 1 missing or implicit (the gate is the thing under test)
- Invents non-existent abstractions (`withIndents` HOC, `useBlockWrapper` hook, `IndentProvider` context)
- Confuses `BlockBase` with `BlockDecoration` or claims they are the same layer
- Claims `indent` is applied via inline styles rather than BEM modifiers + SCSS mixin
- Section 6 lists fewer than four files

## Scoring rubric (5 points; pass = 5/5)

1. Section `Consulted docs` present with all three files
2. Section `Wrapper chain` complete and ordered
3. Section `Routing` describes `pick` + strip-and-forward correctly
4. Section `indent → spacing` covers BEM modifier → `@mixin indents` → token chain
5. Section `Extension point` lists all four files

Any disqualifier overrides the score.

## Optional follow-up prompts (variance check)

- "How do I add a new common prop for all blocks?" — must hit all four extension files
- "What's the difference between `resetPaddings` and `indent: {top:'0', bottom:'0'}`?" — checks careful reading of `BlockBase.tsx:20-21` and the `@deprecated` marker on `resetPaddings`
- "Where is `IndentValue` defined?" — checks that the agent traverses types via memory-bank / models rather than guessing
