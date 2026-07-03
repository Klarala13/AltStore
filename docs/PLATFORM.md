# Platform Guide

## Platform Scope

- CI/CD pipelines
- Build and release workflows
- Container/runtime configuration
- Environment variable wiring
- Observability and operational readiness

## Ownership

- Primary owner: `platform-agent`
- Coordinator validates release and runtime compatibility with frontend/backend outputs

## Main Paths

- CI config: `.github/` or `.gitlab/` (repo-specific)
- Container files: `Dockerfile*`, `docker/`, `compose*`
- Scripts: `scripts/`, `ops/`, or equivalent
- Environment examples/docs: `.env.example`, deployment docs

## Operational Rules

- Never commit secrets or tokens
- Keep env names consistent across web/api/build jobs
- Changes must include rollback instructions
- Prefer additive, reversible platform changes
- Document any required manual step clearly

## Security Rules

- Principle of least privilege for tokens/credentials
- No broad permission changes without explicit note
- Keep dependency and base image updates traceable

## Platform Definition of Done

- Scope-limited changes in platform files
- CI behavior validated (or dry-run validated)
- Build/deploy impact documented
- Rollback procedure included
- Monitoring/alert implications called out when applicable

## Standard Validation Commands

- `pnpm lint`
- `pnpm build`
- Pipeline validation command(s) available in repo
- Optional smoke command after deployment (if environment available)

## Platform Handoff Minimum

- What changed and where
- Validation summary
- Deployment impact and sequence
- Rollback instructions
- Follow-up operations tasks (if any)
