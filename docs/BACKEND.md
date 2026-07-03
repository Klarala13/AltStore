# Backend Guide

## Stack and Runtime

- Framework: NestJS (Node.js)
- Language: TypeScript strict mode
- Data layer: Prisma
- Database: PostgreSQL (Supabase for MVP)
- Queue (phase-based): BullMQ + Redis

## Ownership

- Primary owner: `backend-agent`
- Coordinator reviews contract changes consumed by frontend/platform

## Main Paths

- API app: `apps/api/`
- Shared DB package: `packages/db/`
- Shared contracts/types: `packages/types/`
- Migrations/schema: `packages/db/` (Prisma)

## Architecture Rules

- Keep modules cohesive by domain
- Use DTO validation and typed exceptions
- Keep controller, service, and persistence responsibilities separated
- Use transactions for multi-entity writes
- No silent catch blocks

## Data and Compliance Rules

- Never store raw IPs (hash + rotation policy)
- Keep retention limits enforced in code paths/jobs
- Maintain GDPR erasure correctness when touching user/developer data
- Do not introduce schema changes without migration plan

## Backend Definition of Done

- Scope-limited changes inside backend/db paths
- API contract impact documented
- Lint + typecheck + backend tests pass
- Migration and rollback notes included when schema changes
- Performance-sensitive queries reviewed if endpoint is hot path

## Standard Validation Commands

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --filter api` (or repository equivalent)
- `pnpm build --filter api`
- `pnpm --filter db db:generate` (if schema changed)

## Backend Handoff Minimum

- What changed and where
- Contract changes (if any)
- Validation summary
- Risks and data migration considerations
- Rollback path
