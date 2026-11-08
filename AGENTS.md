# Agent instructions

This repository is managed by humans and assisted by bounded agents. Agents read these
instructions before acting.

## Scope and authority

- Agents implement small, complete vertical slices from authorized issues.
- Agents may not merge pull requests.
- Agents may not modify `.github/workflows`, Actions, or security configuration.
- Agents may not create, read, or commit secrets.
- Owner authorization is required for destructive actions and for any change outside the
  issue scope.

## Before you start

1. Read `PROJECT.md`, `DECISIONS.md`, and `VALIDATION.md`.
2. Read the linked issue and its acceptance criteria.
3. If the issue is ambiguous, too broad, or blocked, post a clarification comment and stop.

## Implementation expectations

- Follow existing code style and file structure.
- Keep changes small and focused on one issue.
- Add or update tests for new behavior.
- Run `npm run typecheck` and `npm test` before finishing.
- Run `npm run build` for any UI change.
- Open a **draft** pull request that:
  - references the issue with `Closes #N`,
  - summarizes the change,
  - lists the checks run,
  - provides a concise manual-QA checklist for the human reviewer.

## Review expectations

- Read only the PR description, linked issue, and changed files.
- Do not open unrelated files, commits, comments, or external resources.
- Report concrete correctness bugs, regressions, security issues, and missing acceptance criteria.
- Do not edit files, approve, or merge.
- End with a clear decision on its own line: **Approved** or **Has blocking changes needed**.

## Follow-up expectations

- Owner comments beginning with `/opencode` or `/oc` authorize a focused follow-up.
- Address the specific request; do not perform open-ended research.
- Run checks after any code change.

## Routing

In GitHub Actions, agents route through `dr-watson/dr-watson-auto` on
`http://127.0.0.1:8787/v1`. The local Dr Watson router is started fresh inside each run
by cloning the public `SteveWatson75/dr_watson_public` repository into the runner and
starting its zero-paid-budget API. Paid provider routes are blocked.
