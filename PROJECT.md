# Project: AgentBench

AgentBench is a minimal, public demonstration of spec-driven, agentic software development.
It is not a production benchmark. It exists to exercise a repeatable workflow:

1. Capture a feature as a GitHub issue with explicit acceptance criteria.
2. Authorize the agent by adding the `agent:implement` label.
3. The agent checks out the repo, reads the spec, implements the change, runs checks,
   and opens a draft pull request.
4. CI runs on the PR.
5. A separate bounded agent reviews the PR.
6. The owner may request follow-up changes via `/opencode ...` comments.
7. A human reviews and merges.

## Product

A lightweight TypeScript application that evaluates example agent responses against
deterministic rules.

Initial features:

- Define evaluation cases with an input, expected outcome and evaluation rules.
- Run deterministic evaluations against supplied example responses.
- Return pass/fail results with explanations.
- Provide a simple React interface for displaying results.

No live LLM is integrated into the application. The agentic demonstration is the
development workflow itself.

## Actors

- **Developer**: defines evaluation cases and examines results.
- **Reviewer**: verifies implementation against the specification.
- **Owner**: authorizes agent runs, reviews PRs, and merges.

## Repository

- Public: `https://github.com/SteveWatson75/agentbench-demo`
- Default branch: `main`
- Language/framework: TypeScript, React, Vite, Vitest
