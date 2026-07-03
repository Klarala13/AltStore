# Multi-Agent Workflow

## Goal

Run frontend, platform, and backend work in parallel with clear scope boundaries and predictable integration.

## Roles

- `coordinator-agent`: task decomposition, sequencing, integration decisions
- `frontend-agent`: web UI/routes/components
- `backend-agent`: API/domain/db
- `platform-agent`: CI/CD/runtime/deploy config

## End-to-End Flow

### 1) Intake

- Coordinator receives request
- Break request into domain tasks using AGENTS task template
- Mark dependencies between tasks explicitly

### 2) Parallel Execution

- One task per branch per agent
- Agents stay within declared scope paths
- Agents report blockers early with concrete dependency

### 3) Handoff

- Each agent delivers handoff using AGENTS handoff template
- Handoff must include verification summary and rollback notes

### 4) Integration

Default merge order unless coordinator overrides:

1. backend
2. frontend
3. platform

Coordinator verifies:

- contract compatibility
- build/test stability
- release readiness

### 5) Release Readiness

- Final smoke checks
- Risk review and rollback plan check
- Merge/release notes captured

## Branch and PR Rules

- One task -> one branch -> one PR
- Keep PR scope narrow and domain-specific
- PR description must include:
  - objective
  - scope
  - validation run
  - risks
  - rollback

## Blocker Handling

- If blocked by another domain, stop scope creep
- Add blocker in handoff and reference required task/PR
- Coordinator reorders work or creates follow-up integration task

## Documentation Contract

Before parallel work starts, keep these docs current:

- `AGENTS.md`
- `docs/FRONTEND.md`
- `docs/BACKEND.md`
- `docs/PLATFORM.md`
- `docs/WORKFLOW.md`
