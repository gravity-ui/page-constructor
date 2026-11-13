# Expected: block-creator

## Input

- Prompt: `prompt.md` in this directory.
- Context: the current project and the `.agents/skills/page-constructor-block-creator/` skill.
- Run: use a fresh session and a disposable working copy with dependencies installed; read `expected.md` after completing the task.
- Project docs: `.agents/docs/architecture.md`, `memory-bank/README.md`, relevant usage/dependency docs, `.agents/docs/navigation.md`, and `.agents/docs/storybook.md`.

## Expected output

- A working Promo block is created with a title, subtitle, background image, a single CTA button, and light/dark theme support.
- The implementation and styles are in `src/blocks/Promo/`; public props/model are exposed through the model API, and the new model is included in `BlockModels`. BEM uses a short name without a namespace.
- `form.ts` contains `Fields` descriptors and initial data; `icon.ts` provides a preview.
- `index.ts` exports a single `@gravity-ui/page-constructor/promo-block` configuration registered in `src/blocks/index.ts`. The form, initial data, and icon are wired into the configuration.
- No `schema.ts` or AJV registrations are created for the new block; `schema` in `index.ts` remains editor metadata. Text transformations are added where needed.
- The light and dark stories actually select the correct assets: the theme context used by the component is verified; a `theme` prop alone is insufficient evidence.
- Storybook includes `Blocks/Promo` with `Default` and `DarkTheme`, meaningful mock data, MDX, a direct import of the implementation, and `parameters.inputs: form`.
- The `memory-bank/` entries are updated; the usage graph lists actual consumers or explicitly states that there are none.
- The final response lists the docs read, changes made, and actual results of applicable checks from `.agents/validation/README.md`, including Storybook and the form. Blockers and unverified behavior are stated explicitly.

## Disqualifiers (any one = FAIL)

- Only a plan is provided instead of an implementation.
- An `index_deprecated.ts`, an old-style type, a legacy enum/map/template, or an old schema alias is created for the new block.
- A legacy AJV schema or AJV registrations are created for the new block, or the `schema` field containing editor metadata is removed from the configuration.
- Checks are claimed to have passed without actually being run.

## Scoring rubric (5 points; pass = 5/5)

1. The Pre-response gate is followed, and the project docs read are listed.
2. The requested fields, styles with a short BEM name, public models included in `BlockModels`, and only the new configuration are implemented.
3. The form, initial data, and icon are wired up and verified in the UI.
4. Catalog registration and any required transformation registrations are completed without adding AJV; the memory bank is updated.
5. Both stories actually render; results of applicable project checks are reported.

Any disqualifier means FAIL regardless of the score. Missing evidence is marked as unverified, not pass. A plan or the presence of story source code does not prove that the UI works.
