-- Le pone la portada a Foco y la publica.
-- Se ejecuta a mano, en el editor SQL de Supabase.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- SI PREFIERES HACERLO DESDE EL PANEL
--
-- Corre antes el bloque 2 de aqui (la portada) y luego aprueba Foco en /admin.
-- El panel hace lo mismo que el bloque 3, con el mismo freno del escaneo, y
-- ademas deja rastro en SecurityLog, que este script no escribe.
-- Para entrar al panel necesitas scripts/make-admin.sql.
--
-- POR QUE HACE FALTA EL BLOQUE 2
--
-- Foco se subio por el formulario con 5 capturas y ninguna portada: las cinco
-- son verticales de movil, 1080x2400. Comprobado bajandolas de produccion.
--
-- El API hace coverUrl = screenshots[0] (apps.service.ts:134), asi que la
-- tarjeta del catalogo usaria de portada una captura vertical. Al lado de las
-- otras apps se veria un recorte raro. La portada apaisada ya existe y
-- responde: /catalog/foco/0-portada.png, 1600x900.
--
-- Ruta RELATIVA, no la URL entera: el catalogo pinta con next/image, que solo
-- optimiza dominios dados de alta en next.config, y appia-nu.vercel.app no esta
-- en esa lista. Con la URL completa devuelve 400 y sale un hueco negro.

-- ---------------------------------------------------------------------------
-- 1. Estado actual. Mira esto primero.
-- ---------------------------------------------------------------------------
-- Comprueba de paso el bundleId: tiene que decir com.appia.foco. Si dice otra
-- cosa, arreglalo ahora (asi nacio la deuda de com.altstore.*), porque es lo
-- que identifica la app en Android y da la ruta del fichero en el almacen.
SELECT
  a."slug",
  a."name",
  a."bundleId",
  a."status"  AS estado_app,
  a."iconUrl",
  array_length(a."screenshots", 1) AS capturas,
  a."screenshots"[1] AS portada_actual,
  v."versionName",
  v."status"  AS estado_version
FROM "App" a
LEFT JOIN "Version" v ON v."appId" = a."id"
WHERE a."slug" = 'foco';

-- ---------------------------------------------------------------------------
-- 2. Meter la portada delante
-- ---------------------------------------------------------------------------
-- No borra nada: antepone la portada a las capturas que ya hay. El WHERE con
-- NOT ... = ANY evita duplicarla si relanzas el script.
UPDATE "App"
SET
  "screenshots" = ARRAY['/catalog/foco/0-portada.png'] || "screenshots",
  "updatedAt" = NOW()
WHERE "slug" = 'foco'
  AND NOT ('/catalog/foco/0-portada.png' = ANY("screenshots"));

-- ---------------------------------------------------------------------------
-- 3. Publicar
-- ---------------------------------------------------------------------------
-- Los dos frenos de siempre:
--
--   EXISTS (... v."status" = 'APPROVED') — solo publica si el APK paso el
--   escaneo. Para Foco ya esta comprobado contra produccion: su ficha devuelve
--   la version y el tamano, y esa consulta filtra por APPROVED
--   (apps.service.ts:219). O sea que VirusTotal le dio el visto bueno.
--
--   a."status" = 'PENDING_REVIEW' — solo sube de pendiente a activa, asi que
--   relanzar esto no resucita una app retirada.

UPDATE "App" a
SET "status" = 'ACTIVE', "updatedAt" = NOW()
WHERE a."slug" = 'foco'
  AND a."status" = 'PENDING_REVIEW'
  AND EXISTS (
    SELECT 1 FROM "Version" v
    WHERE v."appId" = a."id" AND v."status" = 'APPROVED'
  );

-- ---------------------------------------------------------------------------
-- 4. Comprobacion
-- ---------------------------------------------------------------------------
-- Tiene que salir: estado_app = ACTIVE, capturas = 6, y portada_actual
-- apuntando a 0-portada.png.
SELECT
  a."slug",
  a."name",
  a."bundleId",
  a."status" AS estado_app,
  array_length(a."screenshots", 1) AS capturas,
  a."screenshots"[1] AS portada_actual
FROM "App" a
WHERE a."slug" = 'foco';
