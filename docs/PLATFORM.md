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

## Por qué el build del API construye @altstore/types

`apps/api/package.json` tiene un `build` que parece raro:

```json
"build": "pnpm --filter @altstore/types build && nest build"
```

No es redundante. `apps/api/tsconfig.json` resuelve `@altstore/types` a
`packages/types/dist/index.d.ts`, así que ese paquete **tiene que estar
compilado** antes de compilar el API.

En local nunca se nota, porque `turbo.json` declara `build: dependsOn ["^build"]`
y turbo compila las dependencias primero. Railway, en cambio, llama al paquete
directo:

```
pnpm install --frozen-lockfile
pnpm --filter @altstore/db exec prisma generate
pnpm --filter @altstore/api build
```

Eso salta turbo, así que `packages/types/dist` no existía y el build moría con

```
error TS2307: Cannot find module '@altstore/types'
  There are types at '…/node_modules/@altstore/types/src/index.ts', but this
  result could not be resolved under your current 'moduleResolution' setting.
```

El mensaje despista: parece un problema de `moduleResolution`. Lo que pasa es que
al no encontrar el `dist` del mapeo, TypeScript cae a resolución de Node, llega
al `exports` de `packages/types/package.json` (que apunta a `src/index.ts`), y
`moduleResolution: node10` no lee `exports`.

No se puede arreglar apuntando el mapeo a `src/index.ts`: `apps/api` compila con
`composite: true`, así que meter un fichero de fuera de `src` mueve el `rootDir`
inferido a la raíz del repo y el `outDir` deja de cuadrar con
`start: node dist/src/main.js`.

Se usa `&&` y no un `prebuild` porque pnpm no ejecuta los scripts `pre`/`post`
salvo que `enable-pre-post-scripts` esté activado, y en este repo no lo está.

Rollback: quitar la primera mitad del script. El build volverá a fallar en
Railway si alguien importa `@altstore/types` desde el API.

## Keepalive de Supabase

- Workflow: `.github/workflows/keepalive.yml` (cron `15 6 */3 * *` + `workflow_dispatch`)
- Script: `scripts/keepalive.sh`
- Motivo: Supabase free pausa el proyecto tras ~7 días de inactividad; cada
  pausa rompe la configuración de Railway.
- Secrets: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (o `SUPABASE_SERVICE_ROLE_KEY`), `API_URL`
- Rollback: desactivar el workflow en la pestaña Actions o borrar el fichero.
- Nota operativa: GitHub desactiva los cron tras 60 días sin actividad en el repo.
