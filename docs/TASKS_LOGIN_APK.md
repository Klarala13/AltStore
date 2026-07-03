# Task Pack - Login/Social Auth + APK Upload/Download

Date: 2026-07-03
Coordinator: multi-agent kickoff

## Objective

Deliver two product capabilities:

1. Login/signup flow with email and social providers
2. APK upload and download flow end-to-end

## Execution Model

- Parallel where possible
- One task per branch and PR
- Integration order follows dependency chain

---

## Task AUTH-BE-01

## Target Agent
backend-agent

## Objective
Complete backend auth surface for email registration/login and social login handoff.

## Scope In
- `apps/api/src/auth/**`
- `apps/api/src/developers/**` (only if needed for account linking)
- `packages/types/**` (only shared auth contract updates)

## Scope Out
- Frontend UI and App Router pages
- CI/CD and deployment config

## Acceptance Criteria
- `POST /auth/register` creates developer account with hashed password
- `POST /auth/login` returns access token for valid credentials
- Social login callback/handoff endpoint exists (or explicit backend contract) for Google/GitHub/Apple identities
- Existing email account conflict/linking behavior is deterministic and documented
- Typed errors for invalid credentials, conflicts, and unsupported provider states

## Validation
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --filter api`

## Dependencies
- None

---

## Task AUTH-FE-01

## Target Agent
frontend-agent

## Objective
Implement complete login/register UX with email and social provider buttons wired to working flows.

## Scope In
- `apps/web/src/components/AuthForm.tsx`
- `apps/web/src/components/HeaderAuth.tsx`
- `apps/web/src/lib/auth.ts`
- `apps/web/src/app/login/**`
- `apps/web/src/app/register/**`
- `apps/web/src/app/api/auth/**` (if auth route handlers are in web app)

## Scope Out
- NestJS business logic outside auth contract consumption
- Platform and deployment files

## Acceptance Criteria
- Email signup works from UI and signs user in or redirects predictably
- Email login works and persists session correctly
- Google login works when env vars are present
- GitHub and Apple buttons either:
  - are fully wired and operational, or
  - are intentionally gated with clear UI messaging and no broken CTA
- Auth errors are user-readable and non-technical

## Validation
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --filter web`
- `pnpm build --filter web`

## Dependencies
- AUTH-BE-01 (for finalized social auth backend contract)

---

## Task AUTH-PLAT-01

## Target Agent
platform-agent

## Objective
Define and wire auth-related environment configuration for local/dev/staging/prod.

## Scope In
- `.env.example`
- `apps/web/.env.example` (if present)
- `apps/api/.env.example`
- CI variable documentation and auth provider setup notes

## Scope Out
- Product UI and backend logic refactors

## Acceptance Criteria
- Required env vars documented for NextAuth and each provider
- Callback/base URL guidance documented for each environment
- Missing social provider vars fail gracefully (no hard crash)
- Setup steps are reproducible by another engineer

## Validation
- `pnpm lint`
- `pnpm build`

## Dependencies
- None

---

## Task APK-BE-01

## Target Agent
backend-agent

## Objective
Finalize APK upload and download backend flow (auth, storage, status, signed link generation).

## Scope In
- `apps/api/src/versions/**`
- `apps/api/src/downloads/**`
- `apps/api/src/storage/**`
- `apps/api/src/security/**` (scan queue integration only)
- `packages/db/**` (only if schema updates are required)

## Scope Out
- Frontend UI components and pages
- Pipeline/deploy infrastructure

## Acceptance Criteria
- Authenticated developer can upload APK for owned app
- File validation (size + APK signature) enforced server-side
- Version record persists and transitions through expected status
- Download request only serves approved + active app versions
- Signed URL + QR payload returned with expected TTL behavior

## Validation
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --filter api`

## Dependencies
- None

---

## Task APK-FE-01

## Target Agent
frontend-agent

## Objective
Connect upload and download UX to real backend endpoints.

## Scope In
- `apps/web/src/components/DownloadActions.tsx`
- developer upload UI route(s) under `apps/web/src/app/developers/**`
- web API route handlers used as BFF proxy under `apps/web/src/app/api/**`

## Scope Out
- NestJS core upload/download logic
- CI/CD and environment setup files

## Acceptance Criteria
- Developer can upload APK via UI with clear success/error states
- End-user can request download link and QR from UI
- Loading, error, and disabled states handled for all actions
- UI does not expose internal tokens/secrets client-side

## Validation
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --filter web`
- `pnpm build --filter web`

## Dependencies
- APK-BE-01

---

## Task APK-PLAT-01

## Target Agent
platform-agent

## Objective
Set up runtime config for storage, scanning, and download URL behavior.

## Scope In
- `apps/api/.env.example`
- root env docs
- deployment/runtime docs for R2 and VirusTotal variables

## Scope Out
- App logic changes

## Acceptance Criteria
- Required env vars for R2, scan service, and salts are documented
- Secure defaults and rotation notes exist for sensitive vars
- Local/dev bootstrap is documented end-to-end

## Validation
- `pnpm build`

## Dependencies
- None

---

## Integration Order

1. AUTH-BE-01 + APK-BE-01
2. AUTH-FE-01 + APK-FE-01
3. AUTH-PLAT-01 + APK-PLAT-01

## Coordinator Checks

- Session token shape is consistent between API and web
- Social provider behavior is explicit when provider credentials are missing
- Upload/download endpoints match frontend request payloads exactly
- No secrets are exposed in client bundles
