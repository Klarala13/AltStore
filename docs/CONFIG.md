# Configuración de AltStore — estado real

Comprobado en producción el **4 de septiembre de 2026** contra
`https://altstore-nu.vercel.app`. Cada fila dice cómo se comprobó, no lo que
debería pasar.

Producción corre el commit `6e8897a` de `main`.

---

## Resumen

| Plataforma     | Estado                                                      |
| -------------- | ----------------------------------------------------------- |
| Supabase       | ✅ Despierto. Las lecturas van bien.                        |
| Vercel (web)   | ⚠️ Funciona, pero faltan 3 variables                        |
| Railway (API)  | ⚠️ Funciona, pero falta Redis: la subida de APK se cuelga   |
| Cloudflare R2  | ⚠️ Bucket vivo, falta el APK de Snake                       |
| GitHub Actions | ❌ El keepalive nunca se ha ejecutado                       |

---

## GitHub Actions — keepalive

**El workflow nunca ha corrido. Cero ejecuciones.**

`gh run list` y `gh workflow list` devuelven la lista vacía. El motivo no es un
fallo del cron: GitHub solo registra y programa los workflows que están en la
**rama por defecto**, y `.github/workflows/keepalive.yml` vive únicamente en
`Klarala13/altstore`. En `main` no hay carpeta `.github/`.

Mientras el fichero no llegue a `main`:

- el cron no existe para GitHub,
- `workflow_dispatch` tampoco aparece en la pestaña Actions,
- Supabase sigue sin recibir el ping cada 3 días.

Los secrets sí están puestos (desde el 28 de agosto de 2026):

| Secret              | Estado |
| ------------------- | ------ |
| `SUPABASE_URL`      | ✅     |
| `SUPABASE_ANON_KEY` | ✅     |
| `API_URL`           | ✅     |

Nada más que configurar aquí. Solo falta que el fichero llegue a `main`.

> El repo `Klarala13/AltStore` es **público**. Los secrets siguen siendo
> privados, pero cualquiera ve el código y el historial.

---

## Vercel — web (Next.js)

Puesto y funcionando (se deduce de que las páginas responden):

| Variable            | Cómo se comprobó                                 |
| ------------------- | ------------------------------------------------ |
| `API_URL`           | La home pinta 2 apps que vienen del API          |
| `INTERNAL_API_KEY`  | El API acepta las llamadas del web               |
| `NEXTAUTH_URL`      | Registro y login completan y dejan sesión        |
| `NEXTAUTH_SECRET`   | Igual que arriba                                 |
| `GOOGLE_CLIENT_ID`  | El botón de Google sale activo                   |

### Falta

| Variable                                | Efecto ahora mismo                                                    |
| --------------------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | **`/sitemap.xml` anuncia `https://altstore.eu`**, que no es tu web    |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | El botón "GitHub" del login sale desactivado                      |
| `APPLE_ID` / `APPLE_SECRET`             | El botón "Apple" del login sale desactivado                           |

Sobre `NEXT_PUBLIC_SITE_URL`: el código cae a `https://altstore.eu` cuando no
está (`apps/web/src/app/sitemap.ts`, `apps/web/src/app/apps/[slug]/page.tsx`).
Ese dominio existe pero **no es vuestro**: resuelve a una página de aparcamiento
(`91.195.241.232`, HTTP 403). Así que el sitemap y los `canonical` de todas las
fichas están mandando a Google a un dominio de otro. Ponla a
`https://altstore-nu.vercel.app` hasta que haya dominio propio.

Aparte, `apps/web/src/app/dashboard/apps/new/NewAppForm.tsx` tiene escrito a
mano `https://altstore.vercel.app/privacy` como URL de privacidad por defecto.
Tampoco es el dominio real.

---

## Railway — API (NestJS)

Puesto y funcionando:

| Variable                        | Cómo se comprobó                                        |
| ------------------------------- | ------------------------------------------------------- |
| `DATABASE_URL` / `DIRECT_URL`   | `GET /apps` devuelve datos de Postgres                  |
| `JWT_SECRET`                    | Registro y login emiten token                           |
| `INTERNAL_API_KEY`              | Coincide con el del web                                 |
| `STORAGE_DRIVER=r2`             | Las URLs firmadas apuntan a `r2.cloudflarestorage.com`  |
| `CF_ACCOUNT_ID`                 | `ebc143ac…` sale en el host de la URL firmada           |
| `R2_ACCESS_KEY` / `R2_SECRET_KEY` | La firma es válida: R2 responde 200/404, no 403       |
| `R2_BUCKET`                     | `altstore-apks`                                         |

### Falta: Redis

**Sin Redis, subir un APK se queda colgado para siempre.**

Comprobado a mano: creé una app, adjunté un APK válido y le di a *Upload APK*.
La barra llega a "Uploading… 100%" y ahí se queda. Más de 3 minutos sin error ni
mensaje. La pantalla no se recupera nunca.

El motivo es `apps/api/src/app.module.ts`: Bull coge `REDIS_HOST` con valor por
defecto `localhost` y `REDIS_PORT` `6379`. En Railway no hay Redis en localhost,
así que `scanQueue.add()` reintenta la conexión sin rendirse y la petición HTTP
nunca contesta.

Variables a añadir (Upstash tiene plan gratis de 10.000 comandos/día):

```
REDIS_HOST=<host de Upstash>
REDIS_PORT=6379
REDIS_PASSWORD=<password de Upstash>
REDIS_TLS=true
```

`REDIS_TLS=true` es obligatorio en Upstash.

> **Efecto secundario que conviene saber**: en `versions.service.ts` el orden es
> subir a R2 → crear la fila `Version` en estado `SCANNING` → encolar el escaneo.
> El encolado es lo último. Así que cada subida colgada ya ha dejado el fichero
> en `uploads/pending/` y una fila `Version` en `SCANNING` que nunca avanzará.
> Habrá que limpiar esas filas cuando Redis esté puesto.

### Sin comprobar

No se puede leer el entorno de Railway desde fuera, así que de estas no sé decir
si están:

| Variable       | Para qué                                                 |
| -------------- | -------------------------------------------------------- |
| `VT_API_KEY`   | VirusTotal. Sin ella el worker no puede escanear         |
| `IP_HASH_SALT` | Hash de IPs para RGPD. Por defecto vale `change-me`      |
| `FRONTEND_URL` | CORS. Por defecto `http://localhost:3000`                |

`IP_HASH_SALT` en `change-me` significa que el hash de IP es predecible. Es un
tema de RGPD, no cosmético.

---

## Cloudflare R2 — ficheros

Bucket `altstore-apks`, en la cuenta `ebc143ac235a9b252bc2d9e43787c821`.

| Fichero                                                     | Estado                    |
| ----------------------------------------------------------- | ------------------------- |
| `apps/com.altstore.tictactoe80s/1.0.0/TicTacToe80s.apk`     | ✅ Existe (HTTP 206)      |
| `apps/com.altstore.snakearcade80s/1.0.0/SnakeArcade80s.apk` | ❌ **No existe** (404)    |

El seed (`packages/db/prisma/seed.ts`, línea 30) marca la versión de Snake como
`APPROVED` apuntando a esa clave, pero el APK nunca se subió. Resultado: la
ficha `/apps/snakearcade80s` carga bien, el botón *Download APK* genera su URL
firmada, y al abrirla R2 contesta `NoSuchKey`.

El binario que toca está en el portátil y **coincide exacto** con lo que espera
el seed:

```
/Users/clara.sanchez/projects/FORMACIÓN/snake-arcade-80s/app-release.apk
  19.177.809 bytes
  sha256 a370d642eae4c7f6fada3cf308ba6789b936b4a358f6a5a46ae7d8358e0a136c
```

Para subirlo:

```bash
CF_ACCOUNT_ID=... R2_ACCESS_KEY=... R2_SECRET_KEY=... ./scripts/upload-seed-apks.sh
```

El script comprueba el sha256 antes de subir y no toca lo que ya está.

---

## Supabase

El proyecto está **despierto**. `GET /apps` hace una query real vía Prisma y
responde con datos, así que Postgres contesta.

Ojo: sigue sin red de seguridad. Supabase free pausa a los ~7 días de
inactividad y el keepalive todavía no corre. El último push fue el 31 de agosto
de 2026.

---

## Estáticos del web

| Fichero                                        | Estado                        |
| ---------------------------------------------- | ----------------------------- |
| `/apps/tictactoe80s/icon.svg`                  | ✅ 200                        |
| `/apps/tictactoe80s/cover.svg`                 | ✅ 200                        |
| `/apps/snakearcade80s/icon.svg`                | ❌ 404 → creado en esta rama  |
| `/apps/snakearcade80s/cover.svg`               | ❌ 404 → creado en esta rama  |

El seed apunta a esas dos rutas para Snake y no existían en `public/`. Se han
añadido, con el mismo estilo neón que las de TicTacToe.

---

## El dashboard está roto en producción

`/dashboard` devuelve *"Application error: a server-side exception has
occurred"*. No es config: es el fallo que ya se arregló en el commit `0d58091`,
que está en la rama y no en `main`.

Todo lo demás responde bien: `/`, `/apps/{slug}`, `/login`, `/register`,
`/search`, `/categories`, `/new`, `/developers`, `/docs`, `/privacy`, `/terms`,
`/gdpr`, `/sitemap.xml` y `/dashboard/apps/new`.

---

## Orden para cerrarlo

1. Llevar esta rama a `main`. Con eso se arregla el dashboard **y** GitHub
   registra el keepalive. Sin este paso los dos siguen roto.
2. Lanzar el keepalive a mano desde Actions y comprobar que sale `OK`.
3. Subir el APK de Snake con `scripts/upload-seed-apks.sh`.
4. Provisionar Redis en Railway y poner las 4 variables.
5. Poner `NEXT_PUBLIC_SITE_URL` en Vercel.
6. Limpiar las filas `Version` en `SCANNING` que dejaron las subidas colgadas, y
   borrar las apps de prueba.
