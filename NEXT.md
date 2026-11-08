# Next steps

## Immediate

1. Configure the required GitHub Actions secrets (owner-only):
   - `OPENCODE_API_KEY`
   - `OPENCODE_GH_TOKEN`
2. Verify the `agent:implement` label exists.
3. Smoke-test the agent workflow on a throwaway issue.

## First feature to implement

A GitHub issue has been created for the first vertical slice:

> **Add an interactive response editor to the AgentBench UI**
>
> Acceptance criteria:
> - Render the existing sample cases in the React UI.
> - Add a textarea for each case so the user can edit the example response.
> - Re-run the evaluator on every change and update the displayed pass/fail results.
> - Keep the existing deterministic evaluator and tests unchanged.
> - All existing checks (`npm run typecheck`, `npm test`, `npm run build`) continue to pass.

To trigger implementation, add the `agent:implement` label to that issue.

## Later ideas (not authorized)

- Load and save evaluation cases from a JSON file.
- Add rule operators (`startsWith`, `length`, `jsonPath`).
- Export results as CSV or JSON.
- Add a CLI entry point.
- Add end-to-end Playwright tests for the React UI.
