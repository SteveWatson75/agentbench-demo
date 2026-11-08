# Architecture and workflow decisions

## Product decisions

- **No live LLM in the application.** AgentBench evaluates example responses supplied by
  the caller. The agentic demonstration is the development workflow, not the evaluator.
- **Deterministic rules only.** Rules are `exact`, `contains`, `regex`, or negated versions.
  No fuzzy or model-based judging in the first slice.
- **Simple React UI.** The UI displays pre-loaded sample cases and results. Interactivity
  (editing cases, adding responses) is deferred to later issues.

## Technical decisions

- **Vite + React + TypeScript.** Fast local dev, simple build, and straightforward Vitest
  integration.
- **Vitest with jsdom.** Keeps unit tests in the same project and runner as the dev server.
- **No separate backend.** The evaluator runs in the browser and in tests.
- **ES modules throughout.** `type: "module"` in `package.json`; `tsconfig` targets ES2020
  with `bundler` resolution.

## Workflow decisions

- **Reuse the Dr Watson router from `SteveWatson75/dr_watson_public`.** The agent workflows
  clone that public repo into the GitHub Actions runner and start its local API. This avoids
  duplicating routing, budgeting, and provider code in AgentBench.
- **Zero-paid-budget routing.** Agent runs set `LLM_MONTHLY_SOFT_LIMIT_USD=0` and
  `LLM_MONTHLY_HARD_LIMIT_USD=0`, so paid routes are blocked inside the runner.
- **OpenCode V2 action and configuration.** The installed OpenCode is v2.0.30, so the repo
  commits a V2 `opencode.json` and uses the pinned `anomalyco/opencode/github@v2.2.6` action.
- **Explicit authorization gates.**
  - Implementation is triggered only by the owner adding the `agent:implement` label.
  - Review is triggered only on non-draft PRs opened by the owner in the same repository.
  - Follow-up is triggered only by owner comments beginning with `/opencode` or `/oc`.
- **No automatic merge.** Every PR requires a human review and explicit merge.
- **Bounded concurrency.** Each issue/PR has its own concurrency group. Review cancels stale
  runs; implementation does not, to avoid losing partial work.
- **Repo-scoped PAT instead of the OpenCode GitHub App.** This matches the existing
  `dr_watson_public` setup and avoids requiring a separate App installation.
