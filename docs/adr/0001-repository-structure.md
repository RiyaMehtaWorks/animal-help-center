# ADR-0001: Repository structure

- Status: Accepted
- Date: 2026-10-15

## Context

- Team: 1 developer
- Stage: idea, no code or users yet
- Languages: TypeScript (MERN) for frontend + backend, Python for the RAG service
- Target: working demo in 2 months

## Options considered

1. Monorepo (one repo): a change touching RAG + backend ships in 1 branch / 1 PR, with no gap between the two sides.
2. Polyrepo (separate repos): the same change needs 2 PRs merged in order (RAG first, then backend), leaving a window where the two sides disagree.

## Decision

We will use one repository (monorepo) with three folders: `frontend/`, `backend/`, `rag/`.

## Consequences

- Easier: changes that touch RAG and backend at the same time go in one PR instead of a chain of PRs; easy to split later into separate repos if folders stay separated.
- Harder: keeping everything cleanly separated.
- Rule we follow: parts talk only through APIs, never by importing each other's files.
- We will revisit this decision if: more than one person joins and works separately on these parts, or one component needs far more updates and releases than the rest of the app.
