# Evaluation

Repeatable evaluation tasks + reference artifacts used to measure agent quality on this codebase. Empty for now — populate when a recurring eval pattern emerges (e.g. "scaffold block X from spec Y, compare against reference output").

## Suggested layout (when content is added)

```
.agents/evaluation/
├── tasks/
│   └── <task-name>/
│       ├── prompt.md       # the input given to the agent
│       └── expected.md     # reference / acceptance criteria
└── runs/
    └── <YYYY-MM-DD>/       # captured agent outputs per task
```

## When to add a task here

- A recurring agent workflow that needs quality tracking over time.
- A regression you found in a real session that you want to assert on future model/skill changes.

Do **not** dump every prompt here — only ones worth re-running. Eval inflation is the failure mode this folder is meant to prevent.
