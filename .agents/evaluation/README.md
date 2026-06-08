# Evaluation

Repeatable evaluation tasks + reference artifacts used to measure agent quality on this codebase. Use evals to spot-check that changes to `AGENTS.md`, skills, or models did not regress doc-grounded answers.

There is **no automated runner** — runs are manual by design. The cost of a generic harness is not yet justified by eval volume. Add a runner only when there are 3+ recurring tasks.

## Layout

```
.agents/evaluation/
├── tasks/
│   └── <task-name>/
│       ├── prompt.md       # the input given to the agent
│       └── expected.md     # reference / acceptance criteria (sections, disqualifiers, rubric)
└── runs/
    └── <YYYY-MM-DD>/       # captured agent outputs per task
        └── <task-name>.md
```

## Running an eval

When a user says **"run the `<task-name>` eval"** (or similar phrasing in any language), follow this workflow:

1. **Locate the task** — `ls .agents/evaluation/tasks/` to confirm the name; read `prompt.md` and `expected.md`. If the named task does not exist, say so and list what is available — never invent or guess a task.
2. **Use a fresh session** — if the current session has already discussed the answer surface, the eval measures memory, not the Pre-response gate. Ask the user to open a clean session (`/clear` in Claude Code, new chat in Cursor, etc.) and paste `prompt.md` there. If the user explicitly says "run it here", note in the saved run that context was not isolated.
3. **Answer the prompt verbatim** — do not look at `expected.md` first. Treat it like a real user request, honoring the Pre-response gate from `AGENTS.md`.
4. **Self-score against `expected.md`** — go through the `## Expected output` sections, the disqualifiers, and the scoring rubric. Report the score and any missed/violated items.
5. **Save the run** (optional but encouraged for regression tracking) — write the answer + score to `.agents/evaluation/runs/<YYYY-MM-DD>/<task-name>.md`. Include: model/skill version, gate compliance status, score, list of disqualifier hits, and a one-line delta vs. the previous run.

## When to add a task here

- A recurring agent workflow that needs quality tracking over time.
- A regression you found in a real session that you want to assert on future model/skill changes.

Do **not** dump every prompt here — only ones worth re-running. Eval inflation is the failure mode this folder is meant to prevent.

## Authoring a new task

Each task is a directory with two files:

- `prompt.md` — the exact input the agent will receive. Keep it minimal; do not pre-load hints from `expected.md`.
- `expected.md` — must contain `## Input`, `## Expected output` (with named sections, tone, length), `## Disqualifiers`, and a numbered `## Scoring rubric`. Optionally `## Optional follow-up prompts` for variance checks.

Reference example: `tasks/block-wrapper-shared-props/`.
