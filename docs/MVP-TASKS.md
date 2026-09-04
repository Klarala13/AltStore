# AltStore — tareas para cerrar el MVP

Estado a **4 de septiembre de 2026**, después de probar producción como usuario.
Cada tarjeta lleva quién puede hacerla: 🔑 necesita una credencial que solo
tiene Clara, 🤖 la puede hacer el agente.

Orden pensado para desbloquear: las de _Bloqueado ahora_ tapan a las demás.

---

## 🔴 Bloqueado ahora

### 1. Hacer que Railway despliegue el API 🔑

**Es el bloqueo principal.** `main` ya tiene el arreglo del dashboard, y Vercel
lo desplegó en menos de un minuto. El API de Railway sigue con el build viejo
7 minutos después del push.

Cómo se nota: `/dashboard` ya no cascan pero dice "No apps submitted yet"
aunque tengas apps, y `/dashboard/apps/{id}` da 404. Las dos páginas piden
`/apps/mine`, que solo existe en el build nuevo. Cuando el API no contesta bien,
el web se calla el fallo y pinta la pantalla vacía.

Qué mirar en Railway:

- ¿El servicio está conectado al repo y a la rama `main`?
- ¿El autodeploy está encendido?
- ¿Hay un build fallando? Mira los logs del último deploy.

Hasta que esto no pase, el portal de desarrollador no funciona en producción por
mucho que el código esté bien.

### 2. ~~Provisionar Redis en Railway~~ — hecho, sin comprobar 🔑

Servicio Redis creado en el mismo proyecto de Railway, con las tres variables de
referencia en `@altstore/api`. Sin `REDIS_TLS`: la red privada de Railway no lo
usa.

Antes, sin Redis, **subir un APK no daba error: se colgaba para siempre**. La
barra llegaba a "Uploading… 100%" y ahí se quedaba, más de 3 minutos sin mensaje.
Arreglado aparte en `dda8732`, así que ahora falla en 36 ms con un error claro.

**Queda comprobarlo de verdad**, y no se puede hasta que Railway sirva el build
nuevo (tarea 1).

### 3. ~~Corregir los secrets del keepalive~~ — cerrado ✅

El workflow está registrado y **en verde**:
[run 33867434002](https://github.com/Klarala13/AltStore/actions/runs/33867434002).

```
OK   supabase postgres -> HTTP 200 (select en App)
OK   api /apps -> HTTP 200
```

`API_URL` tenía una cadena `postgresql://…` donde iba una URL http. Y el 401 de
Supabase **no era la clave**: el ping iba a `/rest/v1/`, que solo admiten las
claves secretas. El detalle está en `docs/CONFIG.md`.

---

## 🟠 Rompe algo que se ve

### 4. Subir `SnakeArcade80s.apk` a R2 🔑

La ficha `/apps/snakearcade80s` carga bien, el botón _Download APK_ genera su URL
firmada, y al abrirla R2 contesta `NoSuchKey`. El seed marcó la versión como
`APPROVED` sin que nadie subiera el binario.

El fichero está en el portátil y **coincide exacto** con lo que espera el seed:

```
/Users/clara.sanchez/projects/FORMACIÓN/snake-arcade-80s/app-release.apk
  19.177.809 bytes
  sha256 a370d642eae4c7f6fada3cf308ba6789b936b4a358f6a5a46ae7d8358e0a136c
```

Tiene que quedar en el bucket `altstore-apks` con esta clave exacta:

```
apps/com.altstore.snakearcade80s/1.0.0/SnakeArcade80s.apk
```

Hay script: `./scripts/upload-seed-apks.sh` (comprueba el sha256 antes de subir
y no sobreescribe nada). O arrastrarlo desde el panel de Cloudflare R2.

> No se puede hacer subiéndolo desde la web como un usuario normal: ese camino
> guarda el fichero en `uploads/pending/{uuid}.apk` y crea una versión nueva en
> `SCANNING`, no toca la clave que el seed ya dio por publicada. Y además ese
> camino está colgado hasta que haya Redis (tarea 2).

### 5. Poner `NEXT_PUBLIC_SITE_URL` en Vercel 🔑

Sin ella, el código cae a `https://altstore.eu`. Ese dominio existe pero **no es
vuestro**: es una página de aparcamiento (`91.195.241.232`, HTTP 403).

Ahora mismo `/sitemap.xml` y los `canonical` de todas las fichas mandan a Google
a un dominio de otro. Ponla a `https://altstore-nu.vercel.app` hasta que haya
dominio propio.

De paso: `apps/web/src/app/dashboard/apps/new/NewAppForm.tsx` tiene escrito a
mano `https://altstore.vercel.app/privacy`. Tampoco es el dominio real. 🤖

---

## 🟡 Config que falta comprobar

### 6. Confirmar tres variables del API en Railway 🔑

No se pueden leer desde fuera. Si no están, el valor por defecto es malo:

| Variable       | Para qué              | Por defecto             | Riesgo                           |
| -------------- | --------------------- | ----------------------- | -------------------------------- |
| `VT_API_KEY`   | VirusTotal            | vacío                   | El worker no puede escanear nada |
| `IP_HASH_SALT` | Hash de IPs para RGPD | `change-me`             | Hash predecible. Es tema legal.  |
| `FRONTEND_URL` | CORS                  | `http://localhost:3000` | CORS mal configurado             |

### 7. Activar los logins que están apagados 🔑

En el registro, los botones de **GitHub** y **Apple** salen desactivados. Faltan
`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` y `APPLE_ID` / `APPLE_SECRET` en
Vercel. Google sí funciona.

Decidir si entran en el MVP o se quitan de la pantalla.

---

## 🟠 Marca e imagen

### 5b. Cambiar el nombre: «AltStore» ya existe 🔑

No es un homónimo cualquiera. **AltStore PAL es un marketplace alternativo de
apps en la UE bajo la DMA**: mismo nombre, mismo sector, misma normativa. Encaja
con que `altstore.eu` esté aparcado por otra persona.

Conviene decidirlo pronto, porque el nombre está metido en dos sitios que después
**no se pueden cambiar**:

| Se puede cambiar luego                              | No se puede             |
| --------------------------------------------------- | ----------------------- |
| Nombre del repo, `@altstore/*`, proyecto de Vercel, | `bundleId` de un APK ya |
| servicios de Railway, dominio, textos del web       | instalado               |
|                                                     | Claves de R2 publicadas |

Los `bundleId` (`com.altstore.tictactoe80s`, `com.altstore.snakearcade80s`) van
firmados dentro del APK. Cambiarlos obliga al usuario a desinstalar y volver a
instalar, y las claves de R2 los llevan dentro de la ruta.

Ahora mismo el coste del cambio es bajo: dos apps de prueba y ningún usuario. En
un mes, no.

### 5c. Poner las portadas de las apps 🤖

Las tarjetas de la home enseñan una letra gigante en vez de la portada. Los
iconos pequeños sí salen, así que no es un problema de ficheros.

`coverUrl` es un **campo fantasma**: existe solo en el tipo de TypeScript
(`packages/types/src/index.ts`). No hay columna en Prisma, la API no lo devuelve
nunca, y por eso `AppCard` siempre cae al plan B de la letra. Las portadas ya
están hechas y seedeadas, pero dentro de `screenshots`.

```
seed.ts       screenshots: [APP_COVER_URL]   ✅ se guarda
schema        coverUrl                       ❌ no existe
apps.service  coverUrl                       ❌ no se devuelve
AppCard       coverUrl ? img : letra          → siempre letra
```

Dos caminos:

- **Corto**: que `AppCard` use `screenshots[0]` cuando no haya portada. Sin
  migración, y las dos apps se encienden al momento.
- **Largo**: columna `coverUrl` de verdad, con migración, seed y la API
  devolviéndola. Más limpio, pero la migración va contra Postgres y eso pide
  `DATABASE_URL`.

Empezar por el corto.

---

## 🧹 Limpieza

### 8. Borrar las apps y versiones de prueba 🔑

- `Claude Test App 1788179706` — de la sesión del 31 de agosto.
- `QA Config Check 1788515…` — creada hoy para probar el flujo de subida.
- Las filas `Version` en estado `SCANNING` que dejaron las subidas colgadas, más
  sus ficheros huérfanos en `uploads/pending/` de R2.

Sobre las huérfanas: en `versions.service.ts` el orden es subir a R2 → crear la
fila `Version` → encolar el escaneo. El encolado es lo último, así que cada
subida colgada ya dejó fichero y fila. Conviene limpiarlas al poner Redis.

### 9. Quitar `tsconfig.tsbuildinfo` del control de versiones 🤖

`apps/web/tsconfig.tsbuildinfo` y `packages/types/tsconfig.tsbuildinfo` están
seguidos por git. Son artefactos de build: cambian con cada `pnpm typecheck` y
ensucian todos los diffs. Van al `.gitignore`.

---

## 🛠️ Deuda técnica que muerde

### 10. Que la subida falle rápido en vez de colgarse 🤖

Aunque se ponga Redis, si se cae, la web se vuelve a quedar en "Uploading… 100%"
sin decir nada. Dos cosas:

- Poner `maxRetriesPerRequest` y un timeout en la conexión de Bull, para que
  `scanQueue.add()` se rinda y devuelva un error de verdad.
- Reordenar `uploadApk`: encolar antes de dar la subida por buena, o revertir la
  fila `Version` y borrar el fichero si el encolado falla. Ahora un fallo de cola
  deja basura en R2 y en la base de datos.

### 11. Que el build del web no dependa de que el API esté vivo 🤖

`apps/web/src/app/category/[slug]/page.tsx` hace `fetch` sin `try/catch`. Si el
API no contesta durante el build, se cae el build entero. Los demás fetch del web
sí lo llevan.

### 12. Escribir el primer test 🤖

`pnpm test` falla, y falla porque **no hay ni un fichero de test**: Jest sale con
error cuando no encuentra ninguno. Como está, el comando no sirve para nada en CI.

Y `pnpm lint` falla en `apps/api` porque no hay config de ESLint (ESLint 9 la
exige).

Buenos primeros candidatos, los sitios donde ya hubo fallos:

- `validateApkFile`: magic bytes y límite de tamaño.
- `findOwnedById`: que un desarrollador no pueda ver la app de otro.
- Que los enums de `packages/types` no se separen de los de Prisma. Ese desajuste
  es justo lo que rompió el dashboard.

### 13. Decidir el driver de almacenamiento 🤖

El README dice que Supabase Storage es el driver del MVP. Producción corre con
`STORAGE_DRIVER=r2`. Que la documentación y la realidad no coincidan es lo que
hace perder una tarde. Elegir uno y arreglar el otro sitio.

---

## ✅ Comprobado y funcionando

Probado a mano hoy en producción, como usuario:

- Home con las 2 apps, ficha de app, búsqueda, categorías, novedades.
- Registro con email, login, sesión que persiste, cerrar sesión.
- Crear una app desde el portal de desarrollador.
- Generación de URL firmada de descarga **y del QR**.
- Descarga de TicTacToe80s: baja el APK de verdad (HTTP 206,
  `application/vnd.android.package-archive`).
- `/privacy`, `/terms`, `/gdpr`, `/docs`, `/developers`, `/sitemap.xml`.
- `/admin` no deja entrar a quien no es admin.
- Supabase despierto: `GET /apps` hace query real contra Postgres.
