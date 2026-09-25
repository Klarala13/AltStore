# Configuración de Appia — estado real

> **El proyecto se llamaba AltStore y pasó a llamarse Appia** el 7 de septiembre
> de 2026, porque AltStore PAL ya existe: mismo nombre, mismo sector, misma
> normativa. El código está renombrado desde `30e79f3`. **Fuera del código,
> todavía no**, así que en este documento verás nombres viejos donde siguen
> siendo el nombre real de algo que existe hoy:
>
> | Dónde                                       | Sigue siendo                                      | Plan                                |
> | ------------------------------------------- | ------------------------------------------------- | ----------------------------------- |
> | Repo de GitHub                              | `Klarala13/AltStore`                              | Renombrable, GitHub redirige        |
> | URL de Vercel                               | `altstore-nu.vercel.app`                          | Renombrable, **Vercel no redirige** |
> | Bucket de R2                                | `altstore-apks`                                   | Se queda; nadie lo ve               |
> | **Filas de la base de datos en producción** | `com.altstore.*`, `altstore.dev`, `AltStore Seed` | **Nadie lo había mirado. Ver R2**   |

Comprobado en producción el **22 de septiembre de 2026** contra
`https://altstore-nu.vercel.app` y `https://altstoreapi-production.up.railway.app`.
Cada fila dice cómo se comprobó, no lo que debería pasar.

El envío de apps sin cuenta se documentó el **25 de septiembre de 2026** leyendo
el código de `b8d5203` y `de23cfc`, no probándolo contra producción. Esa sección
lo dice donde toca.

`main` está en `d16f2b5`.

---

## Resumen

| Plataforma       | Estado                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| Supabase         | ✅ Despierto. `GET /apps` devuelve datos reales                        |
| Vercel (web)     | ✅ Sirve 200 y al día con `main`. La URL lleva el nombre viejo         |
| Railway (API)    | ✅ Al día. `GET /apps` devuelve las dos apps                           |
| Cloudflare R2    | ❌ La base de datos apunta a claves viejas. Ninguna subida arregla eso |
| GitHub Actions   | ✅ Keepalive diario, con los dos pings informando por separado         |
| Envío sin cuenta | ⚠️ Construido y con cuatro cerraduras. Sin enlace, nadie llega         |

---

## Las dos semanas de caída (7 → 21 de septiembre de 2026)

Desde el rename hasta el 21 de septiembre la API sirvió `502` y la web enseñaba
un catálogo vacío. **No era un fallo: eran cuatro apilados**, y por eso arreglar
uno no cambiaba nada.

1. `pnpm --filter <nombre>` **sale con código 0 cuando no encuentra nada**.
   Railway filtraba `@altstore/*` en Build Command **y** en Start Command. Los
   dos imprimían `No projects matched the filters` y devolvían éxito.
2. Los `.tsbuildinfo` versionados hacían que `tsc` no emitiera en un clon nuevo.
3. Supabase estaba **pausado**, y un proyecto pausado pierde el registro DNS, así
   que contesta NXDOMAIN y se lee igual que si estuviera borrado.
4. Los Watch Paths de Railway cubrían solo `apps/api/**`, así que un commit que
   tocaba únicamente `packages/**` salía verde con `No deployment needed`.

Lo que une a los cuatro: **ninguno se puso rojo.** El post mortem largo, con el
error de TypeScript literal para poder buscarlo, está en
[`docs/PLATFORM.md`](./PLATFORM.md).

> **Regla que sale de aquí:** antes de tocar código, comprueba qué está sirviendo
> producción y qué comando lo produjo. En Railway, **Build Logs enseña el build y
> Deploy Logs enseña el start command**: son pestañas distintas, y la insignia
> verde no distingue entre las dos.

---

## GitHub Actions — keepalive

En verde. Corre **a diario** (`cron: "15 6 * * *"`), no cada 3 días: el 13 de
septiembre el ping salió OK y aun así el proyecto acabó pausado antes del 16, así
que 3 días no daban margen.

```
OK   supabase postgres -> HTTP 200 (select en App)
OK   api /apps -> HTTP 200
----
RESUMEN  supabase=OK  api=OK
```

Los dos pings **se informan por separado** (`043c28a`). Antes compartían un único
mensaje de error, así que un API muerto tapaba la salud de la base de datos: una
X roja con dos significados que no tienen nada que ver. Eso es exactamente lo que
pasó — las ejecuciones salían rojas por el ping del API mientras Supabase
respondía `200` todo el tiempo, y por eso la pausa de Supabase tardó 11 días en
verse. Ahora cada fallo emite su propio `::error` con su propio título.

El código de salida sigue siendo uno solo para todo el job, que es lo correcto:
si algo falla, el workflow tiene que salir rojo. Lo que cambió es que ahora el
log dice **cuál**.

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

Si algún día `gh run list` vuelve a salir vacío, lo primero que hay que mirar es
en qué rama está el fichero: GitHub solo programa los workflows de la **rama por
defecto**. Eso ya pasó una vez, y costó 7 días sin una sola ejecución.

El proyecto de Supabase es `lrlhavreaiuhslguvyzv` y es el único que hay.

> El repo `Klarala13/AltStore` es **público**. Los secrets siguen siendo
> privados, pero cualquiera ve el código y el historial.

---

## Vercel — web (Next.js)

Al día con `main`. La home responde `200` y pinta las dos apps.

Puesto y funcionando (se deduce de que las páginas responden):

| Variable           | Cómo se comprobó                          |
| ------------------ | ----------------------------------------- |
| `API_URL`          | La home pinta 2 apps que vienen del API   |
| `INTERNAL_API_KEY` | El API acepta las llamadas del web        |
| `NEXTAUTH_URL`     | Registro y login completan y dejan sesión |
| `NEXTAUTH_SECRET`  | Igual que arriba                          |
| `GOOGLE_CLIENT_ID` | El botón de Google sale activo            |

### Falta

| Variable                                    | Efecto ahora mismo                                      |
| ------------------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                      | Los `canonical` anuncian la URL de Vercel. Fea, no rota |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | El botón "GitHub" del login sale desactivado            |
| `APPLE_ID` / `APPLE_SECRET`                 | El botón "Apple" del login sale desactivado             |

Sobre `NEXT_PUBLIC_SITE_URL`: **ya no hay un dominio escrito a mano**, que era el
fallo de verdad. Antes el código caía a `https://altstore.eu`, un dominio
aparcado por otra persona (`91.195.241.232`, HTTP 403), así que el sitemap y los
`canonical` de todas las fichas mandaban a Google a la web de un tercero.

Ahora `apps/web/src/lib/site-url.ts` decide así:

1. `NEXT_PUBLIC_SITE_URL`, cuando haya dominio propio.
2. El dominio de producción que **Vercel inyecta solo**
   (`VERCEL_PROJECT_PRODUCTION_URL`). Sobrevive a que se renombre el proyecto.
3. `localhost`, en desarrollo.

Comprobado el 22 de septiembre: `/sitemap.xml` anuncia
`https://altstore-nu.vercel.app`, o sea el paso 2. Fea, pero nuestra y responde.

Lo mismo en el formulario de alta de app: la URL de privacidad por defecto salía
de un dominio escrito a mano y ahora sale de `NEXT_PUBLIC_SITE_URL`. Si no está,
se queda vacía, que es mejor que estar mal.

### Renombrar el proyecto de Vercel

La URL `altstore-nu.vercel.app` sale del **nombre del proyecto** en Vercel. No
hay nada en el repo que la fije, así que se cambia ahí y en ningún otro sitio:
**Settings › General › Project Name**.

> **Vercel no redirige la URL vieja.** GitHub sí lo hace al renombrar un repo;
> Vercel no. La dirección vieja deja de responder en cuanto guardas. Por eso
> estos cinco pasos van en la misma sentada:

| #   | Dónde                | Qué                                                    | Si no                           |
| --- | -------------------- | ------------------------------------------------------ | ------------------------------- |
| 1   | Vercel › General     | Project Name → `appia`                                 | —                               |
| 2   | Vercel › Env Vars    | `NEXTAUTH_URL` = la URL nueva                          | Nadie puede entrar              |
| 3   | Railway › Variables  | `FRONTEND_URL` = la URL nueva                          | CORS bloquea todas las llamadas |
| 4   | Google Cloud Console | Redirect URI = URL nueva + `/api/auth/callback/google` | El login de Google falla        |
| 5   | Vercel               | Redeploy                                               | El sitemap sigue con la vieja   |

El código no se toca. `getSiteUrl()` ya lee el dominio que Vercel inyecta, que es
justo lo que le hace sobrevivir al rename — pero lo lee **al construir**, así que
el paso 5 no es opcional.

**Alternativa, si vais a comprar dominio igualmente:** cómpralo, apúntalo a
Vercel y pon `NEXT_PUBLIC_SITE_URL`. Entonces el nombre del proyecto de Vercel
deja de importar para siempre y esta tabla sobra.

---

## Railway — API (NestJS)

Al día. `GET /apps` devuelve las dos apps del seed.

Servicio `superb-perception`, proyecto `1f0ce8e3-593d-4633-815b-0850293892e6`,
API en `altstoreapi-production.up.railway.app`.

### El build y el start viven en el repo, no en el panel

Desde `8cb390b` están en [`railway.json`](../railway.json), al lado del código
que compilan. Esto es el arreglo duradero de la caída de dos semanas: la config
en código no se desincroniza con un rename, y un panel sí.

```json
"buildCommand": "pnpm install --frozen-lockfile && pnpm db:generate && pnpm build:api"
"startCommand": "pnpm start:api"
```

Los scripts de la raíz filtran por **ruta**, no por nombre de paquete, así que el
próximo rename no puede romperlos. Y `build:api` termina en
`test -f apps/api/dist/src/main.js`, así que un build que no produce nada se pone
rojo **al construir**, en vez de aparecer como `MODULE_NOT_FOUND` minutos después.

> Los campos Build Command y Start Command del panel tienen que quedarse
> **vacíos**. Si alguien escribe algo ahí, gana el panel y volvemos al problema
> original.

Watch Paths: limpiado. Cubría solo `apps/api/**`, así que un commit a
`packages/**` salía verde sin construir. Y **Redeploy repite el commit ya
desplegado**, así que por ahí nunca se coge un `main` más nuevo por mucho que se
pulse.

Para leer Railway desde fuera sin token:

```bash
gh api repos/Klarala13/AltStore/commits/<sha>/status
```

Lleva el nombre del servicio, el host del API y la descripción del deploy.

### Puesto y funcionando

| Variable                          | Cómo se comprobó                                       |
| --------------------------------- | ------------------------------------------------------ |
| `DATABASE_URL` / `DIRECT_URL`     | `GET /apps` devuelve datos de Postgres                 |
| `JWT_SECRET`                      | Registro y login emiten token                          |
| `INTERNAL_API_KEY`                | Coincide con el del web                                |
| `STORAGE_DRIVER=r2`               | Las URLs firmadas apuntan a `r2.cloudflarestorage.com` |
| `CF_ACCOUNT_ID`                   | `ebc143ac…` sale en el host de la URL firmada          |
| `R2_ACCESS_KEY` / `R2_SECRET_KEY` | La firma es válida: R2 responde 200/404, no 403        |
| `R2_BUCKET`                       | `altstore-apks`                                        |
| `REDIS_HOST/PORT/PASSWORD`        | Subida real de un APK: encola, el worker lo coge       |

Redis es el de Railway, no Upstash, a propósito: no hay cuenta nueva, ni coste de
salida, ni tope de comandos. El plan gratis de Upstash son 10.000 al día, y un
worker de Bull consulta Redis aunque no haya trabajo. Sin `REDIS_TLS`: la red
privada de Railway no lo usa, eso es solo para Upstash. Y la red privada es
**solo IPv6**, así que ioredis necesita `family: 0`.

### Sin comprobar

No se puede leer el entorno de Railway desde fuera, así que de estas no sé decir
si están:

| Variable       | Para qué                                             |
| -------------- | ---------------------------------------------------- |
| `VT_API_KEY`   | VirusTotal. Sin ella el worker no puede escanear     |
| `IP_HASH_SALT` | Hash de IPs para RGPD **y para el límite de envíos** |
| `FRONTEND_URL` | CORS. Por defecto `http://localhost:3000`            |

`IP_HASH_SALT` es ahora más importante que antes, porque tiene **dos**
consumidores: el registro de descargas y el limitador de envíos anónimos. Si no
está, el hash de IP es predecible, y eso es RGPD, no cosmética.

> **Ojo con el valor por defecto: hay tres, y no coinciden.** Este documento
> decía `change-me`, y era falso en los dos sitios que importan.
>
> | Dónde                                                   | Valor               |
> | ------------------------------------------------------- | ------------------- |
> | `apps/api/.env.example`                                 | `change-me-monthly` |
> | `rate-limit.guard.ts` y `downloads.service.ts` (código) | `default-salt`      |
> | Lo que decía este documento                             | `change-me`         |
>
> O sea que el valor con el que corre producción si la variable no está puesta es
> `default-salt`, no lo que dice el ejemplo. Buscar `change-me` en los logs no
> habría encontrado nada. Conviene unificarlo en el código para que el fallback
> sea el mismo sitio que documenta el ejemplo, o directamente que el arranque
> falle si falta.

`VT_API_KEY` no se puede deducir mirando resultados, y ese es otro problema: si
el escaneo **falla**, el worker reintenta 3 veces y acaba poniendo `REJECTED`, el
mismo estado que un fichero infectado. El motivo real solo queda en el
`SecurityLog`. Hace falta un estado aparte tipo `SCAN_FAILED`.

`FRONTEND_URL` hay que tocarlo sí o sí si se renombra el proyecto de Vercel.

> **`DIRECT_URL` apunta a un host solo IPv6.** `db.lrlhavreaiuhslguvyzv.supabase.co`
> ya solo tiene registro `AAAA`, sin `A`. El runtime no se entera porque va por el
> pooler IPv4, pero `DIRECT_URL` es el que usan las migraciones. Desde un runner
> sin IPv6 — GitHub Actions, por ejemplo — una migración fallaría con un error de
> red que no se parece en nada a la causa.

---

## Enviar una app sin cuenta

Añadido el 22 de septiembre de 2026 (`b8d5203`, endurecido en `de23cfc`). La idea
es que en el MVP alguien pueda probar la tienda y subir una app **sin registrarse
ni inventarse una contraseña**.

### Cómo funciona

Son **dos pasos**, porque el APK necesita una app a la que engancharse:

```
1. POST /api/submissions            → crea la App, devuelve { appId, uploadToken }
2. POST /api/submissions/:id/apk    → gasta ese token y sube el binario
```

Las dos rutas de `apps/web` son proxys finos a NestJS. Existen para dos cosas: no
enseñar `API_URL` al navegador, y **reenviar la dirección del visitante** en
`X-Forwarded-For`, para que el límite cuente por persona y no vea todos los
envíos llegando desde Vercel.

El remitente se guarda como un `Developer` **sin `passwordHash`**, que el esquema
ya permitía, así que esto no necesitó migración. Esa persona nunca inicia sesión.

Nada se salta la moderación: la app nace en `PENDING_REVIEW` y la versión en
`SCANNING`, igual que una subida autenticada.

### Las cuatro cerraduras

| Qué                | Dónde                       | Detalle                                                     |
| ------------------ | --------------------------- | ----------------------------------------------------------- |
| `INTERNAL_API_KEY` | `internal-key.guard.ts`     | Solo pasan llamadas que vengan del front. **Falla cerrado** |
| Límite por IP      | `rate-limit.guard.ts`       | 5 envíos por hora y por IP hasheada                         |
| Token de subida    | `submissions.service.ts`    | JWT de 2 h, atado a `appId` y con `purpose: app-submission` |
| Tamaño             | `submissions.controller.ts` | 500 MB por APK                                              |

El orden importa: el limitador se fía de `X-Forwarded-For`, y esa cabecera se
puede escribir a mano. Lo que la hace creíble es que `InternalKeyGuard` va
**antes** y solo deja entrar al front. Sin esa guarda, el límite se salta mandando
una dirección distinta cada vez. Por eso `de23cfc` no es opcional.

### Lo que hay que saber para operarlo

> **`INTERNAL_API_KEY` pasa a ser crítica.** Antes, si faltaba, fallaban las
> llamadas internas del web. Ahora además **toda la vía de envío anónimo
> devuelve 403**, porque la guarda falla cerrado a propósito. Está puesta y
> funcionando, pero ya no es una variable de segunda.

- **El contador vive en memoria del proceso.** No hay Redis por medio. Dos
  consecuencias: una segunda instancia del API tendría su propia cuota, y **cada
  redeploy pone los contadores a cero**. Con una sola instancia en Railway es
  aceptable, y está comentado en el código; hay que moverlo a Redis antes de
  escalar en horizontal.
- **El APK se bufferiza entero en memoria** (`memoryStorage()`) antes de ir a R2.
  Con el tope en 500 MB, un envío grande es un pico de 500 MB de RAM en el
  contenedor de Railway. Conviene mirar el plan de memoria antes de invitar a
  nadie, o bajar el tope.
- **`maxDuration = 300` en la ruta de Vercel.** Ese número es un techo del plan,
  no una garantía: en Hobby las funciones se cortan mucho antes, así que una
  subida grande puede morir en el borde antes de llegar al API. Merece una prueba
  con un APK de verdad.
- `JWT_SECRET` ahora también firma los tokens de subida, no solo las sesiones.

### Falta para que alguien lo use

**Nadie puede llegar a la página.** `/submit` existe y funciona, pero no hay ni un
enlace hacia ella en toda la web: `NAV_LINKS` en
`apps/web/src/components/SiteNav.tsx` tiene Apps, Search y Developers, y nada
más. Hoy solo entra quien se sepa la URL de memoria.

Si la idea es que la gente pruebe a subir apps, esto es lo primero, y es un
cambio de una línea en la navegación.

---

## Cloudflare R2 — ficheros

Bucket `altstore-apks`, en la cuenta `ebc143ac235a9b252bc2d9e43787c821`.

El nombre del bucket se queda como está: R2 no permite renombrar en sitio,
habría que crear otro y copiar 79 MB. Es un nombre interno que ningún usuario ve.

### La base de datos de producción todavía tiene los nombres viejos

Esto se descubrió el 22 de septiembre de 2026 y **cambia lo que hay que hacer**.
El rename tocó el código y el seed, pero el seed nunca se volvió a ejecutar, así
que las filas que sirve producción siguen siendo las de antes. Comprobado con
`GET /apps/{slug}`:

```
snakearcade80s  fileKey     apps/com.altstore.snakearcade80s/1.0.0/SnakeArcade80s.apk
tictactoe80s    fileKey     apps/com.altstore.tictactoe80s/1.0.0/TicTacToe80s.apk
ambas           privacyUrl  https://altstore.dev/privacy
desarrollador   name        AltStore Seed
```

Mientras tanto `scripts/upload-seed-apks.sh` sube a `apps/com.appia.*`, porque se
actualizó con el rename. **Las dos mitades no se hablan**, y de ahí salen tres
consecuencias:

1. **Ejecutar el script tal cual no arregla nada.** Subiría los dos binarios a
   claves a las que no apunta ninguna fila, y la descarga de Snake seguiría dando
   `NoSuchKey`.
2. **La clave vieja de TicTacToe no se puede borrar.** Es la que sirve
   producción hoy. Este documento decía antes que era basura; era un error, y
   borrarla habría roto la única descarga que funciona en la tienda.
3. **Volver a lanzar el seed tampoco lo arregla.** Hace `upsert` por
   `bundleId: com.appia.*`, que no existe en la base de datos, así que intentaría
   crear; y `slug` es `@unique` con `snakearcade80s` ya ocupado, o sea que
   reventaría con una violación de restricción. (Leído en el esquema, no
   ejecutado.)

`privacyUrl` apuntando a `altstore.dev` es además un tema de RGPD, no cosmético:
es un campo obligatorio en cada `App` y ahora manda a los usuarios a un dominio
que no es vuestro.

### Estado real de las claves

| Clave                                                    | Estado                                        |
| -------------------------------------------------------- | --------------------------------------------- |
| `apps/com.altstore.tictactoe80s/1.0.0/TicTacToe80s.apk`  | ✅ Existe y es la que sirve producción        |
| `apps/com.altstore.snakearcade80s/1.0.0/…`               | ❌ Nunca existió → la descarga da `NoSuchKey` |
| `apps/com.appia.tictactoe80s/1.0.0/TicTacToe80s.apk`     | ⬜ Falta subir, y hoy no la mira nadie        |
| `apps/com.appia.snakearcade80s/1.0.0/SnakeArcade80s.apk` | ⬜ Falta subir, y hoy no la mira nadie        |

### Cómo arreglarlo

Hay dos caminos y conviene elegir a propósito:

- **Rápido:** apuntar el script a las claves que la base de datos usa hoy
  (`com.altstore.*`) y subir. Snake se descarga esta tarde. La deuda del nombre
  sigue ahí.
- **Correcto:** actualizar primero las filas — `bundleId`, `fileKey`,
  `privacyUrl` y el nombre del desarrollador — a `com.appia.*` y `appia.dev`, y
  luego subir a las claves nuevas. Deja el nombre limpio de una vez. Necesita una
  escritura contra Postgres, que no puedo hacer yo.

En los dos casos hace falta esto, que no puedo leer:

```bash
CF_ACCOUNT_ID=... R2_ACCESS_KEY=... R2_SECRET_KEY=... ./scripts/upload-seed-apks.sh
```

El script comprueba el sha256 antes de subir y no toca lo que ya está.

El binario de Snake está en el portátil y **coincide exacto** con lo que espera
el seed:

```
/Users/clara.sanchez/projects/FORMACIÓN/snake-arcade-80s/app-release.apk
  19.177.809 bytes
  sha256 a370d642eae4c7f6fada3cf308ba6789b936b4a358f6a5a46ae7d8358e0a136c
```

### El `bundleId` tampoco es el del binario

Aparte de todo lo anterior: el APK real declara `com.anonymous.snakearcade80s`,
el valor por defecto de Expo que nadie cambió. En Android el paquete es lo que
identifica una app para instalar y actualizar, así que una tienda que guarda otro
no puede detectar actualizaciones. Se eligió `com.appia.*` porque es la identidad
que queréis y así la clave no se mueve una tercera vez, pero el desajuste sigue
hasta que se recompilen las dos apps con su paquete de verdad.

---

## Supabase

El proyecto está **despierto**. `GET /apps` hace una query real vía Prisma y
responde con datos, así que Postgres contesta.

Estuvo **pausado 11 días** dentro de la caída de septiembre. Lo que hay que saber
para la próxima: un proyecto pausado **pierde el registro DNS**, así que contesta
NXDOMAIN y se lee exactamente igual que si lo hubieras borrado. No lo está. Se
reanuda desde el panel.

El keepalive ahora corre a diario, que es la red de seguridad que faltaba.

---

## Estáticos del web

| Fichero                          | Estado |
| -------------------------------- | ------ |
| `/apps/tictactoe80s/icon.svg`    | ✅ 200 |
| `/apps/tictactoe80s/cover.svg`   | ✅ 200 |
| `/apps/snakearcade80s/icon.svg`  | ✅ 200 |
| `/apps/snakearcade80s/cover.svg` | ✅ 200 |

Los dos de Snake no existían y daban 404. Se añadieron con el mismo estilo neón
que los de TicTacToe.

Las portadas de la home también se arreglaron: `coverUrl` era un campo fantasma
que existía solo en el tipo de TypeScript, sin columna en Prisma y sin devolverse
nunca, así que `AppCard` siempre caía al plan B de la letra gigante. Hoy
`GET /apps` devuelve `coverUrl` en las dos apps.

---

## El web convierte un 502 en «no hay apps»

La lección más cara de septiembre, y sigue sin arreglar. Con el API caído, la web
enseñaba dos cosas creíbles y falsas:

```
auth.ts   respuesta no-OK → return null → se lee como «contraseña incorrecta»
page.tsx  getApps() falla → return []   → se lee como «catálogo vacío»
```

Ninguna decía «el servidor no responde», así que el fallo pareció de datos y de
credenciales durante días. Hay que distinguir «no hay nada» de «no he podido
preguntar».

Mientras tanto, para comprobar desde fuera qué pasa de verdad, usa rutas que sí
dejan pasar el estado de arriba:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://altstore-nu.vercel.app/api/search?q=a
curl -s -w "\nHTTP %{http_code}\n" https://altstoreapi-production.up.railway.app/apps
```

`/dashboard` ya no falla: devuelve `307` a login, que es lo correcto para quien
no tiene sesión.

---

## Higiene del repo

`*.tsbuildinfo` ya está en `.gitignore` y no queda ninguno versionado. Falta la
otra mitad: **`packages/db/generated/client` sigue versionado**, 27 ficheros que
`prisma generate` reescribe enteros, binarios del motor incluidos. Hay que
descartarlo a mano en cada commit. Va al `.gitignore`.

`pnpm test` sale con error porque **no hay ni un fichero de test** en
`apps/api`: Jest falla cuando no encuentra ninguno. Hasta que haya uno, la puerta
de calidad es `pnpm typecheck`.

---

## Orden para cerrarlo

1. **Decidir el camino de R2** (rápido o correcto, arriba) y pasarme
   `CF_ACCOUNT_ID`, `R2_ACCESS_KEY` y `R2_SECRET_KEY`. Es lo único roto que ve un
   usuario: el botón de descargar de Snake.
2. **Enlazar `/submit` desde la navegación.** La vía de envío sin cuenta está
   construida y protegida, pero no hay ni un enlace hacia ella, así que hoy no la
   usa nadie. Una línea en `SiteNav.tsx`.
3. Confirmar `IP_HASH_SALT` en Railway. Es RGPD, y ahora también es lo que separa
   a dos personas en el límite de envíos.
4. Renombrar el proyecto de Vercel con los cinco pasos de arriba, o comprar el
   dominio y saltarse la tabla entera.
5. Activar o quitar los logins de GitHub y Apple. Un botón muerto en la pantalla
   de registro cuesta usuarios.
6. Borrar las apps y versiones de prueba: `Claude Test App 1788179706` y
   `QA Config Check 1788514702`, esta última con dos versiones y sus ficheros
   huérfanos en `uploads/pending/`.
7. Sacar `packages/db/generated/client` del control de versiones.
8. Separar `SCAN_FAILED` de `REJECTED`, que es lo que deja confirmar
   `VT_API_KEY`.
