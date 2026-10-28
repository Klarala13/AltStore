-- Corrige la ficha de Frase Fuerte, le pone las imagenes y la publica.
-- Se ejecuta a mano, en el editor SQL de Supabase.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- POR QUE LA VERSION ANTERIOR NO HIZO NADA
--
-- Buscaba por bundleId = 'com.appia.frasefuerte' y el valor guardado es '222',
-- asi que los tres UPDATE tocaron 0 filas. Ahora busca por slug, que esta
-- comprobado contra produccion: 'frasefuerte'.
--
-- El bundleId importa y no es cosmetico: identifica la app en Android, es
-- unico en la tabla y es lo que se usa para la ruta del fichero en el almacen.
-- Se arregla AHORA, que solo hay una version y nadie se la ha descargado;
-- dejarlo para luego es como nacio la deuda de com.altstore.* (ver
-- scripts/fix-old-name-urls.sql).
--
-- Foco NO esta aqui. Subela por el formulario, que ya deja adjuntar icono y
-- capturas, y despues publicala con el bloque 4 cambiando el slug.

-- ---------------------------------------------------------------------------
-- 1. Estado actual. Mira esto primero.
-- ---------------------------------------------------------------------------
SELECT
  a."slug",
  a."name",
  a."bundleId",
  a."status"  AS estado_app,
  a."iconUrl",
  array_length(a."screenshots", 1) AS capturas,
  v."versionName",
  v."status"  AS estado_version
FROM "App" a
LEFT JOIN "Version" v ON v."appId" = a."id"
WHERE a."slug" = 'frasefuerte';

-- ---------------------------------------------------------------------------
-- 2. Lo que la ficha dice mal
-- ---------------------------------------------------------------------------
-- El texto describia el GENERADOR de contraseñas, que es la idea que se
-- descarto. La app que esta subida hace lo contrario: tu escribes y ella mide.
-- Una ficha que promete otra cosa es peor que una ficha sin foto.
--
-- Si prefieres otra redaccion, cambia estos dos textos antes de lanzarlo.

UPDATE "App"
SET
  "name" = 'Frase Fuerte',
  "bundleId" = 'com.appia.frasefuerte',
  "shortDesc" = 'Mide cuánto aguanta tu contraseña y te dice cómo mejorarla.',
  "description" = 'Escribes tu contraseña y te dice cuántos intentos haría falta para adivinarla, qué trozos son fáciles y por qué, y te propone variaciones enseñándote cuánto gana cada una. Funciona sin conexión: no pide permiso de internet, y lo que escribes no sale del móvil.',
  "updatedAt" = NOW()
WHERE "slug" = 'frasefuerte';

-- ---------------------------------------------------------------------------
-- 3. Imagenes de catalogo
-- ---------------------------------------------------------------------------
-- RUTAS RELATIVAS, no URLs absolutas. El catalogo pinta con next/image, que
-- solo optimiza dominios dados de alta en next.config (remotePatterns), y
-- appia-nu.vercel.app no esta en esa lista: con la URL entera devuelve 400 y
-- la tarjeta sale con un hueco negro. Relativo es ademas lo que ya hace el
-- seed, y lo que guarda el formulario nuevo.
--
-- La PRIMERA captura es la portada de la tarjeta, no una captura: el API hace
-- coverUrl = screenshots[0] (apps.service.ts:134). Por eso va 0-portada.png
-- delante. Sin ella, la tarjeta sale vacia al lado de las dos del seed.

UPDATE "App"
SET
  "iconUrl" = '/catalog/frase-fuerte/icon.png',
  "screenshots" = ARRAY[
    '/catalog/frase-fuerte/0-portada.png',
    '/catalog/frase-fuerte/1-medida.png',
    '/catalog/frase-fuerte/2-sugerencias.png',
    '/catalog/frase-fuerte/3-aviso.png',
    '/catalog/frase-fuerte/4-creditos.png'
  ],
  "updatedAt" = NOW()
WHERE "slug" = 'frasefuerte';

-- ---------------------------------------------------------------------------
-- 4. Publicar
-- ---------------------------------------------------------------------------
-- Las dos condiciones se quedan:
--
--   EXISTS (... v."status" = 'APPROVED') — solo publica si el APK paso el
--   escaneo. Para esta app ya esta comprobado contra produccion: la ficha
--   devuelve su version, y esa consulta solo devuelve las APPROVED.
--
--   a."status" = 'PENDING_REVIEW' — solo sube de pendiente a activa, asi que
--   relanzar esto no resucita una app retirada.

UPDATE "App" a
SET "status" = 'ACTIVE', "updatedAt" = NOW()
WHERE a."slug" = 'frasefuerte'
  AND a."status" = 'PENDING_REVIEW'
  AND EXISTS (
    SELECT 1 FROM "Version" v
    WHERE v."appId" = a."id" AND v."status" = 'APPROVED'
  );

-- ---------------------------------------------------------------------------
-- 5. Comprobacion
-- ---------------------------------------------------------------------------
-- Tiene que salir: estado_app = ACTIVE, capturas = 4, bundleId correcto.
SELECT
  a."slug",
  a."name",
  a."bundleId",
  a."status" AS estado_app,
  a."iconUrl",
  array_length(a."screenshots", 1) AS capturas
FROM "App" a
WHERE a."slug" = 'frasefuerte';
