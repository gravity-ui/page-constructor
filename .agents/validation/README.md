# Testing & validation

Checks the agent **must run before declaring a change complete**. Treat this as the gate, not a suggestion.

## When to run what

| Change scope                                                             | Required commands           |
| ------------------------------------------------------------------------ | --------------------------- |
| Any TS/TSX edit                                                          | `npm run typecheck`         |
| Any source edit                                                          | `npm run lint`              |
| Logic changes (blocks, sub-blocks, components, containers, utils, hooks) | `npm test`                  |
| Visual changes (markup, SCSS, layout)                                    | `npm run playwright`        |
| Cross-platform visual baseline (CI parity)                               | `npm run playwright:docker` |
| Schema changes                                                           | `npm run build:schema`      |

Run the narrowest applicable set, but **always include `typecheck` + `lint`** before reporting completion.

## Unit (Jest)

- Config: `jest.config.js` + `tsconfig.test.json`
- Environment: `test-utils/custom-environment.ts`
- Setup: `test-utils/setup-tests.ts`, `test-utils/setup-tests-after.ts`
- Mocks: `test-utils/__mocks__/`
- Coverage: `src/blocks/**`, `src/components/**`, `src/containers/**` (excludes stories)
- Run: `npm test` | watch: `npm run test:watch`

## Visual / Component (Playwright)

- Config: `playwright/playwright.config.ts`
- Framework: `@playwright/experimental-ct-react` (Vite-based, not a browser test runner)
- Tests live alongside components as `*.visual.test.tsx` files
- Fixtures: `playwright/core/` (`mountFixture`, `expectScreenshotFixture`, `delays`)
- Snapshots: committed; update with `npm run playwright:update`
- Docker baseline: `npm run playwright:docker` — use this to match CI rendering when local snapshots diverge

## Reporting results

When summarising a completed change, state which commands were run and their result (pass / fail / not applicable). Do **not** claim "tests pass" without naming the command(s).
