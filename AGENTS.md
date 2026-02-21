---
name: altstore
description: Expert development guide for AltStore - European Alternative App Marketplace built with Next.js 15, NestJS, Prisma, and Supabase
---

# AltStore Development Guidelines

You are an expert developer for AltStore, a DMA-compliant European Alternative App Marketplace. Your code is clean, type-safe, and follows SOLID principles strictly.

## Your Role

- Build features using Next.js 15 (App Router), NestJS, TypeScript, Prisma, and Tailwind CSS
- Enforce SOLID principles and clean architecture across all layers
- Write type-safe code that integrates seamlessly across the monorepo
- Ensure GDPR and DMA compliance in every data-handling decision
- Follow the Apple-inspired minimalist design system

## Tech Stack

- **Frontend**: Next.js 15 with App Router — SSR/SSG, Server Components by default
- **Backend**: NestJS (Node.js) — modular, decorators, dependency injection
- **ORM**: Prisma — type-safe queries, versioned migrations
- **Database**: Supabase (PostgreSQL) for MVP → portable to Neon + Prisma post-scale
- **Storage**: Cloudflare R2 (Phase 2+) — S3-compatible, zero egress cost
- **Security**: VirusTotal API v3 — automated APK scanning (Phase 2+)
- **Auth**: NextAuth.js (consumers) + JWT (developer API)
- **Styling**: Tailwind CSS — minimalist, Apple-inspired, mobile-first
- **Queue**: BullMQ + Redis (Upstash) — async job processing (Phase 2+)
- **Language**: TypeScript 5+ strict mode across all packages
- **Package Manager**: pnpm (workspaces)
- **Build**: Turborepo

## Monorepo Structure

```
altstore/
├── apps/
│   ├── web/          # Next.js 15 — frontend
│   └── api/          # NestJS — backend
├── packages/
│   ├── db/           # Prisma schema + generated client (shared)
│   └── types/        # Shared TypeScript types between web and api
├── turbo.json
└── package.json
```

## Quick Commands

```bash
# Development
pnpm dev              # Start all services (Turborepo)
pnpm dev --filter web # Start only Next.js
pnpm dev --filter api # Start only NestJS

# Database
pnpm --filter db db:generate   # Generate Prisma client
pnpm --filter db db:migrate    # Run migrations (dev)
pnpm --filter db db:push       # Push schema without migration (prototyping)
pnpm --filter db db:studio     # Open Prisma Studio

# Code Quality (run before commits)
pnpm lint             # ESLint across all packages
pnpm format           # Prettier
pnpm typecheck        # tsc --noEmit across all packages
pnpm test             # Unit tests

# Build
pnpm build            # Build all packages (Turborepo)
```

## SOLID Principles — Applied

### S — Single Responsibility Principle
Each module, service, and component has **one reason to change**.

```typescript
// ✅ GOOD — DownloadService only handles download logic
class DownloadService {
  async requestDownload(versionId: string, userId?: string): Promise<DownloadResult> { ... }
}

// ❌ BAD — Service doing too many things
class AppService {
  async getApp() { ... }
  async scanVirus() { ... }      // Belongs in SecurityService
  async sendEmail() { ... }      // Belongs in NotificationService
  async generateQR() { ... }     // Belongs in QrService
}
```

### O — Open/Closed Principle
Open for extension, closed for modification. Use interfaces and strategy patterns.

```typescript
// ✅ GOOD — New scanner strategies can be added without modifying existing code
interface FileScannerStrategy {
  scan(file: Buffer): Promise<ScanResult>;
}

class VirusTotalScanner implements FileScannerStrategy { ... }
class MockScanner implements FileScannerStrategy { ... } // For tests
```

### L — Liskov Substitution Principle
Subtypes must be substitutable for their base types.

```typescript
// ✅ GOOD — StorageProvider contract is respected by all implementations
interface StorageProvider {
  upload(key: string, buffer: Buffer): Promise<string>;
  getSignedUrl(key: string, ttlSeconds: number): Promise<string>;
  delete(key: string): Promise<void>;
}

class R2StorageProvider implements StorageProvider { ... }
class LocalStorageProvider implements StorageProvider { ... } // Dev/test
```

### I — Interface Segregation Principle
Clients should not depend on interfaces they don't use.

```typescript
// ✅ GOOD — Separate interfaces, consumers only depend on what they need
interface AppReader {
  findBySlug(slug: string): Promise<App | null>;
  findAll(filters: AppFilters): Promise<App[]>;
}

interface AppWriter {
  create(data: CreateAppDto): Promise<App>;
  update(id: string, data: UpdateAppDto): Promise<App>;
}

// ❌ BAD — One fat interface forces all consumers to know about all methods
interface AppRepository {
  findBySlug(...): Promise<App | null>;
  findAll(...): Promise<App[]>;
  create(...): Promise<App>;
  update(...): Promise<App>;
  delete(...): Promise<void>;
  scanVirus(...): Promise<ScanResult>;   // Doesn't belong here
}
```

### D — Dependency Inversion Principle
Depend on abstractions, not concretions. Use NestJS DI for injection.

```typescript
// ✅ GOOD — NestJS injects the abstraction, implementation is swappable
@Injectable()
class VersionService {
  constructor(
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
    @Inject(SCANNER) private readonly scanner: FileScannerStrategy,
    private readonly prisma: PrismaService,
  ) {}
}
```

---

## Architecture Patterns

### NestJS Module Structure

Each domain is a self-contained NestJS module:

```
src/
├── apps/           # Apps module (CRUD, moderation)
├── versions/       # Versions module (upload, diffs)
├── downloads/      # Downloads module (signed URLs, logs)
├── security/       # VirusTotal, SecurityLog
├── developers/     # Developer accounts, verification
├── auth/           # JWT strategy, guards
├── storage/        # R2 abstraction
├── queue/          # BullMQ jobs
└── common/         # Shared guards, pipes, interceptors
```

### Next.js Component Rules

- **Server Components by default** — only add `"use client"` when strictly necessary
- Client components: only when using hooks, event handlers, or browser APIs
- Arrow functions, named exports for components, default exports for pages

```typescript
// ✅ GOOD — Server Component, async, direct data fetch
import { getApp } from "@/lib/api";

const AppDetailPage = async ({ params }: { params: { slug: string } }) => {
  const app = await getApp(params.slug);
  return <AppDetail app={app} />;
};

export default AppDetailPage;
```

```typescript
// ✅ GOOD — Client Component, only when needed
"use client";

import { useState } from "react";

const DownloadButton = ({ versionId }: { versionId: string }) => {
  const [loading, setLoading] = useState(false);
  // ...
};

export { DownloadButton };
```

### Data Fetching (Next.js)

```typescript
// Server Component — fetch with ISR cache
async function getAppDetail(slug: string) {
  const res = await fetch(`${process.env.API_URL}/apps/${slug}`, {
    next: { revalidate: 60 },
    headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY! },
  });
  if (!res.ok) throw new Error("Failed to fetch app");
  return res.json();
}
```

### Error Handling (NestJS)

Use typed exceptions and NestJS exception filters. Never swallow errors silently.

```typescript
// ✅ GOOD
if (!app) {
  throw new NotFoundException(`App with slug "${slug}" not found`);
}

// ❌ BAD
try {
  const app = await this.prisma.app.findUnique(...);
} catch (e) {
  return null; // silently swallowing errors
}
```

---

## Design System — Apple-Inspired Minimalist

The UI is intentionally minimal, clean, and functional — inspired by apple.com.

### Core Principles

- **Whitespace is intentional**: generous padding, breathing room between elements
- **Typography hierarchy**: clear distinction between headings, body, and captions
- **Monochromatic base**: whites, grays, black — color used sparingly for action
- **No decorative elements**: no gradients, no shadows except subtle depth cues
- **Interactions are subtle**: hover states, transitions at 150-200ms ease

### Tailwind Design Tokens (apply consistently)

```
Colors:
  bg-white, bg-gray-50, bg-gray-100   — page backgrounds
  text-gray-900                        — primary text
  text-gray-500                        — secondary/muted text
  text-gray-400                        — captions, metadata
  bg-gray-900, text-white              — primary CTA buttons
  border-gray-200                      — subtle separators

Typography:
  text-4xl font-semibold tracking-tight   — page titles
  text-2xl font-semibold                  — section headings
  text-base text-gray-700                 — body copy
  text-sm text-gray-500                   — metadata, captions

Spacing:
  px-6 md:px-12 lg:px-24               — page horizontal padding
  py-16 md:py-24                        — section vertical spacing
  gap-6 md:gap-8                        — grid/flex gaps

Components:
  rounded-xl                            — cards
  rounded-lg                            — buttons, inputs
  border border-gray-200                — card borders (no shadow by default)
```

### Component Conventions

```tsx
// ✅ GOOD — Minimal AppCard, Apple-style
const AppCard = ({ icon, name, category, fileSize, slug }: AppCardProps) => (
  <a href={`/apps/${slug}`} className="group block rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300">
    <img src={icon} alt={name} className="mb-4 h-14 w-14 rounded-xl" />
    <p className="text-sm font-medium text-gray-500">{category}</p>
    <h3 className="mt-1 text-base font-semibold text-gray-900">{name}</h3>
    <p className="mt-1 text-sm text-gray-400">{fileSize}</p>
  </a>
);
```

---

## Code Style

### TypeScript

- Strict mode always (`"strict": true` in tsconfig)
- `interface` for component props and contracts; `type` for unions, DTOs, mapped types
- PascalCase for types/interfaces; camelCase for variables and functions; SCREAMING_SNAKE for constants
- No `any` — use `unknown` and narrow properly

### Imports Order

1. React / Next.js core
2. External libraries
3. Internal packages (`@altstore/db`, `@altstore/types`)
4. App-level modules (`@/lib`, `@/components`, `@/hooks`)
5. Types and constants

### Comments

Only when necessary:
- Complex business logic (DMA/GDPR compliance rules)
- Non-obvious performance decisions
- Workarounds with ticket references

### Environment Variables

- Never hardcode URLs or secrets
- All env vars documented in `.env.example`
- Prefix public vars with `NEXT_PUBLIC_` only when truly needed client-side

---

## GDPR Compliance Rules (enforced in code)

- **Never store raw IPs**: always SHA-256 hash + monthly rotating salt
- **privacyUrl is mandatory** on every App record
- **DownloadLog retention**: 90 days max — implement cleanup job
- **Developer erasure endpoint**: `DELETE /developers/:id/gdpr-erasure` must cascade correctly
- **No analytics without consent**: check Consent Mode v2 flag before firing events

---

## Boundaries

### Always Do

- Follow SOLID principles — if a class has more than one reason to change, split it
- Use NestJS DI for all service dependencies
- Prefer Server Components in Next.js — add `"use client"` only when required
- Validate all inputs with class-validator DTOs in NestJS
- Use Prisma transactions for multi-table writes
- Hash IPs before storing (GDPR)
- Handle all Prisma `NotFound` errors with typed NestJS exceptions
- Keep `packages/types` in sync when adding new shared entities
- Run `pnpm lint && pnpm typecheck` before committing

### Ask First

- Adding new dependencies to any package
- Changing the Prisma schema (always requires a migration plan)
- Modifying authentication flow
- Major refactoring across multiple packages
- Any change affecting GDPR data handling

### Never Do

- Store raw IP addresses — always hash them
- Use `any` in TypeScript
- Ignore errors silently (no empty catch blocks)
- Hardcode API URLs, secrets, or credentials
- Commit `.env` files
- Add `"use client"` to components that don't need it
- Skip VirusTotal scanning step before approving a version (security critical)
- Merge code that breaks `pnpm typecheck` or `pnpm lint`

---

## Architecture Decision Records

> **ADR-001 — Database: Supabase for MVP**
> Supabase (managed PostgreSQL) used for MVP due to fast setup, integrated auth, and free tier.
> Prisma connects directly to Supabase PostgreSQL — migration to Neon.tech post-scale requires
> only a connection string change. Decision to revisit at 10k MAU or $50/month Supabase cost.

> **ADR-002 — Storage: Cloudflare R2 (Phase 2)**
> R2 chosen over S3 for zero egress cost. All binary files served via signed URLs with 5-minute TTL.
> Direct file URLs never exposed publicly. Implementation deferred to Phase 2.

> **ADR-003 — Design: Apple-Inspired Minimalism**
> Deliberately minimal UI. No component libraries (Shadcn/UI used only as reference if needed).
> Custom Tailwind tokens. Prioritize whitespace, typography, and clarity over visual complexity.

---

**Last Updated:** 2026-02-21
