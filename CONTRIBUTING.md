# Contributing

AgentBench is a small demonstration project. Contributions are welcome, but the primary goal
is to keep the workflow clear and the codebase easy to verify.

## Local development

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run typecheck` and `npm test` to verify the setup.
4. Run `npm run dev` to start the Vite dev server.

## Making changes

- Keep changes focused on a single issue.
- Add or update tests for new evaluator behavior.
- Run `npm run typecheck`, `npm test`, and `npm run build` before opening a PR.
- Follow the existing TypeScript and React style.
- Do not commit secrets or sensitive configuration.

## Agent-assisted changes

- Capture the work in a GitHub issue with acceptance criteria.
- The owner authorizes implementation by adding the `agent:implement` label.
- Agents open draft PRs; humans review and merge.
- See `AGENTS.md` for the agent's full instructions.

## Pull requests

Open a draft PR from your branch. Include:

- The issue it closes (`Closes #N`).
- A short summary of what changed and why.
- Confirmation that `npm run typecheck`, `npm test`, and `npm run build` pass.
- Any manual QA steps needed.

A maintainer will review and merge.
