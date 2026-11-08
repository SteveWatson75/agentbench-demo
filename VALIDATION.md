# Validation checklist

## Local validation (must pass before any PR)

```sh
npm install
npm run typecheck
npm test
npm run build
```

## CI validation

GitHub Actions runs the same checks on every push to `main` and on every pull request.

## Agent workflow validation

Agent workflows are triggered only by explicit owner actions:

| Workflow | Trigger | Gate |
| --- | --- | --- |
| `agent-implement.yml` | Issue labeled `agent:implement` | Owner only |
| `agent-review.yml` | PR opened/synchronized/reopened/ready for review | Owner PR, same repo, non-draft |
| `agent-followup.yml` | Issue or PR review comment | Owner only, `/opencode` or `/oc` prefix |

## Manual workflow smoke test (after secrets are configured)

1. Create a trivial test issue with acceptance criteria.
2. Add the `agent:implement` label.
3. Confirm the implementation workflow starts, opens a draft PR, and CI passes.
4. Mark the PR ready for review and confirm the review workflow posts a review comment.
5. Post `/opencode close this test PR without merging` and confirm the agent responds or acts.
6. Close/delete the test PR.

## Checks before claiming the workflow works

- [ ] `OPENCODE_API_KEY` Actions secret is set.
- [ ] `OPENCODE_GH_TOKEN` fine-grained PAT Actions secret is set.
- [ ] PAT has read/write access to Contents, Issues, and Pull requests (no workflow scope).
- [ ] `agent:implement` label exists.
- [ ] OpenCode Console **Use balance** is off.
- [ ] GitHub Actions overage is hard-stopped.
- [ ] A real agent run completes successfully from label to PR to review.

Do not mark a workflow as verified until a run has completed successfully on GitHub.
