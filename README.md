# AltStore

European Alternative App Marketplace — DMA-compliant platform for distributing Android (and iOS in future phases) applications in the EU.

---

## Overview

AltStore is a marketplace that allows developers to distribute their apps outside the official stores, in compliance with the EU Digital Markets Act (DMA) and GDPR. It provides automated APK scanning via VirusTotal, secure signed download URLs, and a clean, minimalist interface inspired by apple.com.

---

## Tech Stack

| Layer           | Technology                                 |
| --------------- | ------------------------------------------ |
| Frontend        | Next.js 15 (App Router) + Tailwind CSS     |
| Backend         | NestJS (Node.js)                           |
| ORM             | Prisma                                     |
| Database        | Supabase (PostgreSQL) — MVP                |
| Storage         | Cloudflare R2 — Phase 2                    |
| Security        | VirusTotal API v3 — Phase 2                |
| Auth            | NextAuth.js (consumers) + JWT (developers) |
| Deploy          | Vercel (frontend) + Railway (backend)      |
| Package Manager | pnpm (workspaces)                          |
| Build           | Turborepo                                  |

---

## Project Structure

```
altstore/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── db/           # Prisma schema + generated client
│   └── types/        # Shared TypeScript types
├── AGENTS.md         # AI development guidelines
├── turbo.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev              # Start all services
pnpm dev --filter web # Next.js only (port 3000)
pnpm dev --filter api # NestJS only (port 3001)
```

### Database

```bash
pnpm --filter db db:generate   # Generate Prisma client
pnpm --filter db db:migrate    # Run migrations
pnpm --filter db db:push       # Push schema (prototyping)
pnpm --filter db db:studio     # Prisma Studio UI
```

### Code Quality

```bash
pnpm lint        # ESLint
pnpm format      # Prettier
pnpm typecheck   # tsc --noEmit
pnpm test        # Unit tests
pnpm build       # Build all packages
```

---

## Environment Variables

Copy `.env.example` to `.env.local` in each app and fill in the values.

**apps/web/.env.local**

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
API_URL=http://localhost:3001
INTERNAL_API_KEY=
```

**apps/api/.env**

```
DATABASE_URL=
JWT_SECRET=
INTERNAL_API_KEY=
# Phase 2 — add when setting up Cloudflare R2
# CF_ACCOUNT_ID=
# R2_ACCESS_KEY=
# R2_SECRET_KEY=
# R2_BUCKET=
# Phase 2 — add when setting up VirusTotal
# VT_API_KEY=
```

---

## Roadmap

### Phase 1 (Weeks 1–2) — Infrastructure MVP

- [x] Monorepo setup (Turborepo + pnpm)
- [ ] Supabase project + Prisma migration
- [ ] NextAuth.js (Google OAuth + email)
- [ ] Homepage: app grid with mock data
- [ ] App detail page with mock data
- [ ] Deploy: Vercel + Railway

### Phase 2 (Weeks 3–4) — Backend & Storage

- [ ] Developers module (registration, verification)
- [ ] Apps module (CRUD, moderation)
- [ ] Versions module (APK upload + validation)
- [ ] VirusTotal integration (BullMQ + Redis)
- [ ] Cloudflare R2 signed URLs (5-min TTL)
- [ ] QR code generation for downloads
- [ ] Developer dashboard + admin panel

### Phase 3 (Weeks 5–6) — UX & SEO

- [ ] Full-text search (PostgreSQL `pg_trgm`)
- [ ] Category/platform filters with URL params
- [ ] Static category routes with ISR
- [ ] Schema.org JSON-LD + dynamic sitemap
- [ ] Screenshot gallery (Embla Carousel)
- [ ] Version history with size diffs
- [ ] Ratings and comments system

### Phase 4 (Weeks 7–8) — Legal, Security & iOS Prep

- [ ] Privacy policy + GDPR erasure endpoint
- [ ] Cookie banner (Consent Mode v2)
- [ ] Terms of service (DMA requirement)
- [ ] Audit logs in SecurityLog
- [ ] Rate limiting (Cloudflare + NestJS ThrottlerGuard)
- [ ] Security headers (CSP, HSTS, X-Frame-Options)
- [ ] OWASP Top 10 checklist
- [ ] iOS Alternative Distribution Agreement research

---

## Architecture Decisions

> **ADR-001 — Supabase for MVP**
> Supabase (managed PostgreSQL) chosen for fast setup and free tier. Prisma connects directly,
> making a future migration to Neon.tech a connection-string-only change.
> Revisit at 10k MAU or $50/month cost.

> **ADR-002 — Cloudflare R2 (Phase 2)**
> Zero egress cost. APK files served exclusively via signed URLs with 5-min TTL.
> Direct public URLs are never exposed.

> **ADR-003 — Apple-Inspired Minimalism**
> No component libraries. Custom Tailwind tokens. Whitespace, typography, and
> clarity over visual complexity.

---

## GDPR Notes

- IPs are never stored in plain text — SHA-256 hash + monthly rotating salt
- `privacyUrl` is mandatory on every app record
- Download logs are retained for a maximum of 90 days
- Developer erasure endpoint: `DELETE /developers/:id/gdpr-erasure`

---

## Contributing

See [AGENTS.md](./AGENTS.md) for coding standards, SOLID principles, and architecture guidelines.
