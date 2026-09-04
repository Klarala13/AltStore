# Configuración de AltStore — estado real

Comprobado en producción el **4 de septiembre de 2026** contra
`https://altstore-nu.vercel.app`. Cada fila dice cómo se comprobó, no lo que
debería pasar.

Producción corre el commit `6e8897a` de `main`.

---

## Resumen

| Plataforma     | Estado                                                     |
| -------------- | ---------------------------------------------------------- |
| Supabase       | ✅ Despierto. Las lecturas van bien.                       |
| Vercel (web)   | ⚠️ Funciona, pero faltan 3 variables                       |
| Railway (API)  | ❌ Sirve un build de hace 6 días. Es el único bloqueo real |
| Cloudflare R2  | ⚠️ Bucket vivo, falta el APK de Snake                      |
| GitHub Actions | ✅ Keepalive en verde: Postgres 200, API 200               |

---

## GitHub Actions — keepalive

**Durante 7 días no corrió ni una vez.** `gh run list` y `gh workflow list`
devolvían la lista vacía.

El motivo no era el cron: GitHub solo registra y programa los workflows que
están en la **rama por defecto**, y `.github/workflows/keepalive.yml` vivía solo
en `Klarala13/altstore`. Para GitHub ese cron no existía, y `workflow_dispatch`
tampoco aparecía en la pestaña Actions.

Resuelto el 4 de septiembre de 2026 al llevarlo a `main`. Si algún día vuelve a
salir la lista vacía, lo primero que hay que mirar es en qué rama está el
fichero.

Los tres secrets existen desde el 28 de agosto de 2026. Dos daban problemas y
**los dos están resueltos** (4 de septiembre de 2026). El workflow está en verde:
[run 33867434002](https://github.com/Klarala13/AltStore/actions/runs/33867434002).

```
OK   supabase postgres -> HTTP 200 (select en App)
OK   api /apps -> HTTP 200
```

| Secret              | Estado | Qué pasaba                                         |
| ------------------- | ------ | -------------------------------------------------- |
| `SUPABASE_URL`      | ✅     | Correcto desde el principio                        |
| `API_URL`           | ✅     | Tenía una cadena `postgresql://…`, no una URL http |
| `SUPABASE_ANON_KEY` | ✅     | La clave estaba bien: el ping iba al endpoint malo |

### El 401 de Supabase no era la clave

Esto costó dos vueltas, así que conviene dejarlo escrito.

El script pingaba `/rest/v1/`, la raíz de PostgREST que sirve el OpenAPI. **Ese
endpoint solo lo admiten las claves secretas.** Con una `anon` o una
`sb_publishable_…` contesta:

```
401 {"message":"Secret API key required",
     "hint":"Only secret API keys can be used for this endpoint."}
```

Y ese 401 se lee exactamente igual que «la clave no vale», así que manda a rotar
una clave que estaba perfecta.

Ahora pide `GET /rest/v1/App?select=id&limit=1`, que además es mejor señal: es
una consulta de verdad a Postgres, no solo tocar la puerta del proyecto. Si esa
tabla falla, cae a `/auth/v1/health` y el log avisa de que Postgres no se tocó.

Dos cosas que aprendimos y están dentro del script:

- La clave va **solo** en `apikey`. Las nuevas no son un JWT, así que mandarlas
  también en `Authorization: Bearer` hace que PostgREST intente leerlas como JWT
  y devuelva 401 aunque sean correctas.
- PostgREST distingue mayúsculas: la tabla es `App`, no `app`. Se puede cambiar
  con `SUPABASE_KEEPALIVE_TABLE`.

El proyecto de Supabase es `lrlhavreaiuhslguvyzv` y es el único que hay.

> El repo `Klarala13/AltStore` es **público**. Los secrets siguen siendo
> privados, pero cualquiera ve el código y el historial.

---

## Vercel — web (Next.js)

Puesto y funcionando (se deduce de que las páginas responden):

| Variable           | Cómo se comprobó                          |
| ------------------ | ----------------------------------------- |
| `API_URL`          | La home pinta 2 apps que vienen del API   |
| `INTERNAL_API_KEY` | El API acepta las llamadas del web        |
| `NEXTAUTH_URL`     | Registro y login completan y dejan sesión |
| `NEXTAUTH_SECRET`  | Igual que arriba                          |
| `GOOGLE_CLIENT_ID` | El botón de Google sale activo            |

### Falta

| Variable                                    | Efecto ahora mismo                                                 |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                      | **`/sitemap.xml` anuncia `https://altstore.eu`**, que no es tu web |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | El botón "GitHub" del login sale desactivado                       |
| `APPLE_ID` / `APPLE_SECRET`                 | El botón "Apple" del login sale desactivado                        |

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

| Variable                          | Cómo se comprobó                                       |
| --------------------------------- | ------------------------------------------------------ |
| `DATABASE_URL` / `DIRECT_URL`     | `GET /apps` devuelve datos de Postgres                 |
| `JWT_SECRET`                      | Registro y login emiten token                          |
| `INTERNAL_API_KEY`                | Coincide con el del web                                |
| `STORAGE_DRIVER=r2`               | Las URLs firmadas apuntan a `r2.cloudflarestorage.com` |
| `CF_ACCOUNT_ID`                   | `ebc143ac…` sale en el host de la URL firmada          |
| `R2_ACCESS_KEY` / `R2_SECRET_KEY` | La firma es válida: R2 responde 200/404, no 403        |
| `R2_BUCKET`                       | `altstore-apks`                                        |

### Redis: puesto, sin comprobar todavía

Antes no había Redis, y sin él **subir un APK no daba error: se quedaba colgado
para siempre.** Comprobado a mano: la barra llegaba a "Uploading… 100%" y se
quedaba ahí más de 3 minutos, sin mensaje y sin recuperarse.

Bull cogía `REDIS_HOST` con valor por defecto `localhost`, y como en Railway no
hay Redis ahí, `scanQueue.add()` reintentaba la conexión sin rendirse y la
petición HTTP nunca contestaba.

El 4 de septiembre de 2026 se creó un servicio Redis en el mismo proyecto de
Railway, con estas variables de referencia en `@altstore/api`:

```
REDIS_HOST=${{Redis.REDISHOST}}
REDIS_PORT=${{Redis.REDISPORT}}
REDIS_PASSWORD=${{Redis.REDISPASSWORD}}
```

Sin `REDIS_TLS`: la red privada de Railway no lo usa. Eso es solo para Upstash.

Se eligió el Redis de Railway y no Upstash a propósito: no hay cuenta nueva, ni
coste de salida, ni tope de comandos. El plan gratis de Upstash son 10.000 al
día, y un worker de Bull consulta Redis aunque no haya trabajo.

**Queda comprobarlo.** No se puede subir un APK de verdad hasta que Railway
sirva el build nuevo.

> **Efecto secundario que conviene saber**: en `versions.service.ts` el orden es
> subir a R2 → crear la fila `Version` en estado `SCANNING` → encolar el escaneo.
> El encolado es lo último. Así que cada subida colgada ya ha dejado el fichero
> en `uploads/pending/` y una fila `Version` en `SCANNING` que nunca avanzará.
> Habrá que limpiar esas filas cuando Redis esté puesto.

### Sin comprobar

No se puede leer el entorno de Railway desde fuera, así que de estas no sé decir
si están:

| Variable       | Para qué                                            |
| -------------- | --------------------------------------------------- |
| `VT_API_KEY`   | VirusTotal. Sin ella el worker no puede escanear    |
| `IP_HASH_SALT` | Hash de IPs para RGPD. Por defecto vale `change-me` |
| `FRONTEND_URL` | CORS. Por defecto `http://localhost:3000`           |

`IP_HASH_SALT` en `change-me` significa que el hash de IP es predecible. Es un
tema de RGPD, no cosmético.

---

## Cloudflare R2 — ficheros

Bucket `altstore-apks`, en la cuenta `ebc143ac235a9b252bc2d9e43787c821`.

| Fichero                                                     | Estado                 |
| ----------------------------------------------------------- | ---------------------- |
| `apps/com.altstore.tictactoe80s/1.0.0/TicTacToe80s.apk`     | ✅ Existe (HTTP 206)   |
| `apps/com.altstore.snakearcade80s/1.0.0/SnakeArcade80s.apk` | ❌ **No existe** (404) |

El seed (`packages/db/prisma/seed.ts`, línea 30) marca la versión de Snake como
`APPROVED` apuntando a esa clave, pero el APK nunca se subió. Resultado: la
ficha `/apps/snakearcade80s` carga bien, el botón _Download APK_ genera su URL
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

| Fichero                          | Estado                       |
| -------------------------------- | ---------------------------- |
| `/apps/tictactoe80s/icon.svg`    | ✅ 200                       |
| `/apps/tictactoe80s/cover.svg`   | ✅ 200                       |
| `/apps/snakearcade80s/icon.svg`  | ❌ 404 → creado en esta rama |
| `/apps/snakearcade80s/cover.svg` | ❌ 404 → creado en esta rama |

El seed apunta a esas dos rutas para Snake y no existían en `public/`. Se han
añadido, con el mismo estilo neón que las de TicTacToe.

---

## El dashboard está roto en producción

`/dashboard` devuelve _"Application error: a server-side exception has
occurred"_. No es config: es el fallo que ya se arregló en el commit `0d58091`,
que está en la rama y no en `main`.

Todo lo demás responde bien: `/`, `/apps/{slug}`, `/login`, `/register`,
`/search`, `/categories`, `/new`, `/developers`, `/docs`, `/privacy`, `/terms`,
`/gdpr`, `/sitemap.xml` y `/dashboard/apps/new`.

---

## Orden para cerrarlo

1. ~~Llevar la rama a `main`~~ — hecho el 4 de septiembre de 2026. El workflow
   ya sale en Actions y el arreglo del dashboard ya está desplegado.
2. Corregir los secrets `SUPABASE_ANON_KEY` y `API_URL` en GitHub, y relanzar el
   keepalive hasta que dé `OK` en los dos pings.
3. Provisionar Redis en Railway y poner las 4 variables. Sin esto no se puede
   subir ningún APK desde la web.
4. Subir el APK de Snake, ya sea con `scripts/upload-seed-apks.sh` o desde el
   panel de Cloudflare R2.
5. Poner `NEXT_PUBLIC_SITE_URL` en Vercel.
6. Limpiar las filas `Version` en `SCANNING` que dejaron las subidas colgadas, y
   borrar las apps de prueba (`Claude Test App 1788179706` y las `QA Config
Check …`).
