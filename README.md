# AgentBench

A lightweight TypeScript application that evaluates example agent responses against
deterministic rules. This repository demonstrates spec-driven, agentic software development:
issues become acceptance criteria, owner-authorized agents implement them, and humans review
and merge.

## What it does

- Define evaluation cases with an input, expected outcome and evaluation rules.
- Run deterministic evaluations against supplied example responses.
- Return pass/fail results with explanations.
- Display results in a simple React interface.

No live LLM is integrated into the application. The agentic demonstration is the workflow.

## Local setup

```sh
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

## Running checks

```sh
npm run typecheck
npm test
npm run build
```

## Agent workflow

1. Open an issue using the **Feature or improvement** template.
2. When the issue is ready, the owner adds the `agent:implement` label.
3. The agent opens a draft PR that references the issue.
4. CI runs typecheck, tests, and build.
5. A separate bounded agent reviews the PR.
6. The owner may request follow-ups with `/opencode ...` or `/oc ...` comments.
7. A human reviews and merges; agents never merge automatically.

See `AGENTS.md`, `DECISIONS.md`, `VALIDATION.md`, and `PROJECT.md` for details.

## Project documents

- `PROJECT.md` — product overview, actors, and goals.
- `AGENTS.md` — instructions for agents working in this repository.
- `DECISIONS.md` — architecture and workflow decisions.
- `VALIDATION.md` — validation checklist and workflow smoke-test steps.
- `NEXT.md` — immediate next steps and authorized first feature.
