# Frontend Guide

## Stack and Runtime

- Framework: Next.js 15 (App Router)
- Language: TypeScript strict mode
- Styling: Tailwind CSS (Apple-inspired minimal system)
- Rendering model: Server Components by default, Client Components only when needed

## Ownership

- Primary owner: `frontend-agent`
- Coordinator reviews cross-domain impacts (API contracts, env usage, release dependencies)

## Main Paths

- App code: `apps/web/`
- Components: `apps/web/src/components/` (or equivalent app path)
- Routes: `apps/web/src/app/` (App Router)
- Shared frontend types: `packages/types/`

## Architecture Rules

- Prefer async Server Components for data-heavy pages
- Add `"use client"` only for hooks, browser APIs, or event handlers
- Keep UI and data mapping separated when logic grows
- Avoid domain logic inside presentational components
- No direct secret usage in client components

## Design System Rules

- Minimal visual language: whitespace, neutral palette, subtle interactions
- No decorative gradients or heavy shadows by default
- Keep typography hierarchy consistent with AGENTS tokens
- Mobile-first spacing and layout decisions

## Frontend Definition of Done

- Scope-limited changes inside frontend paths
- No unintended backend/platform edits
- Lint + typecheck + frontend tests pass
- Responsive behavior validated on mobile and desktop
- Visual impact documented in PR (screenshots for user-facing changes)

## Standard Validation Commands

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --filter web` (or repository equivalent)
- `pnpm build --filter web`

## Frontend Handoff Minimum

- What changed and where
- What did not change
- Validation summary
- Known UX/performance risks
- Any API or env dependency for coordinator
