-- Pone las imagenes de catalogo de Foco y Frase Fuerte y las publica.
-- Se ejecuta a mano, en el editor SQL de Supabase.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- ANTES DE LANZARLO, dos condiciones:
--
--   1. La app tiene que estar subida desde la web. Queda con
--      iconUrl = '/icon.svg', que es el de Appia, porque el formulario no deja
--      elegir imagen todavia.
--   2. El commit 89724b7 tiene que estar desplegado en Vercel. Las imagenes
--      se sirven desde apps/web/public/catalog/, asi que antes del despliegue
--      las URLs de abajo dan 404 y el catalogo se queda sin icono.
--      Compruebalo abriendo esto en el navegador:
--      https://appia-nu.vercel.app/catalog/frase-fuerte/icon.png
--
-- Es idempotente. Busca por bundleId, que es unico, y los UPDATE de una app
-- que aun no este subida tocan 0 filas sin romper nada: se relanza cuando este.
--
-- Por que a mano: son datos de produccion, no esquema, y no hay pantalla para
-- subir imagenes ni para aprobar sin pasar por el panel de admin.

-- ---------------------------------------------------------------------------
-- 1. Estado actual. Mira esto PRIMERO.
-- ---------------------------------------------------------------------------
-- Si la version sale en SCANNING, el escaneo no ha terminado: espera y
-- relanza. Si sale REJECTED o INFECTED, NO se publica, y hay que mirar
-- SecurityLog antes de tocar nada.

SELECT
  a."name",
  a."bundleId",
  a."status"        AS estado_app,
  v."versionName",
  v."status"        AS estado_version,
  v."scannedAt"
FROM "App" a
LEFT JOIN "Version" v ON v."appId" = a."id"
WHERE a."bundleId" IN ('com.appia.foco', 'com.appia.frasefuerte')
ORDER BY a."name", v."createdAt";

-- ---------------------------------------------------------------------------
-- 2. Imagenes de catalogo
-- ---------------------------------------------------------------------------

UPDATE "App"
SET
  "iconUrl" = 'https://appia-nu.vercel.app/catalog/frase-fuerte/icon.png',
  "screenshots" = ARRAY[
    'https://appia-nu.vercel.app/catalog/frase-fuerte/1-medida.png',
    'https://appia-nu.vercel.app/catalog/frase-fuerte/2-sugerencias.png',
    'https://appia-nu.vercel.app/catalog/frase-fuerte/3-aviso.png',
    'https://appia-nu.vercel.app/catalog/frase-fuerte/4-creditos.png'
  ],
  "updatedAt" = NOW()
WHERE "bundleId" = 'com.appia.frasefuerte';

UPDATE "App"
SET
  "iconUrl" = 'https://appia-nu.vercel.app/catalog/foco/icon.png',
  "screenshots" = ARRAY[
    'https://appia-nu.vercel.app/catalog/foco/1-listo.png',
    'https://appia-nu.vercel.app/catalog/foco/2-corriendo.png',
    'https://appia-nu.vercel.app/catalog/foco/3-descanso-largo.png',
    'https://appia-nu.vercel.app/catalog/foco/4-ajustes.png'
  ],
  "updatedAt" = NOW()
WHERE "bundleId" = 'com.appia.foco';

-- ---------------------------------------------------------------------------
-- 3. Publicar
-- ---------------------------------------------------------------------------
-- Dos condiciones, y las dos importan:
--
--   EXISTS (... v."status" = 'APPROVED') — solo publica si el APK paso el
--   escaneo de VirusTotal. Sin esto, una consulta rapida publicaria un fichero
--   que nadie ha mirado. AGENTS.md lo prohibe, y las dos apps semilla ya
--   entraron asi en su dia.
--
--   a."status" = 'PENDING_REVIEW' — solo sube de "pendiente" a "activa". Si
--   algun dia una de estas apps se retira (REMOVED) o se suspende, relanzar
--   esto no la resucita. Es el mismo fallo que tenia el seed.

UPDATE "App" a
SET "status" = 'ACTIVE', "updatedAt" = NOW()
WHERE a."bundleId" IN ('com.appia.foco', 'com.appia.frasefuerte')
  AND a."status" = 'PENDING_REVIEW'
  AND EXISTS (
    SELECT 1 FROM "Version" v
    WHERE v."appId" = a."id" AND v."status" = 'APPROVED'
  );

-- ---------------------------------------------------------------------------
-- 4. Comprobacion
-- ---------------------------------------------------------------------------
-- Lo que tiene que salir: estado_app = ACTIVE, capturas = 4, y el icono
-- apuntando a /catalog/. Si estado_app sigue en PENDING_REVIEW, vuelve al
-- paso 1 y mira estado_version: el escaneo manda.

SELECT
  a."name",
  a."bundleId",
  a."status" AS estado_app,
  a."iconUrl",
  array_length(a."screenshots", 1) AS capturas,
  (SELECT string_agg(v."status"::text, ', ')
   FROM "Version" v WHERE v."appId" = a."id") AS estados_version
FROM "App" a
WHERE a."bundleId" IN ('com.appia.foco', 'com.appia.frasefuerte');
