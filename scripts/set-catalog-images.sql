-- Pone el icono y las capturas de Foco y Frase Fuerte en el catalogo.
-- Se ejecuta a mano, en el editor SQL de Supabase.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- ORDEN OBLIGATORIO. Esto no funciona si se hace antes de tiempo:
--
--   1. Subir las dos apps desde la web. Quedan con iconUrl = '/icon.svg',
--      que es el de Appia, porque el formulario no deja elegir imagen.
--   2. Que este commit este desplegado en Vercel. Las imagenes se sirven
--      desde apps/web/public/catalog/, asi que antes del despliegue las URLs
--      de abajo dan 404 y el catalogo se queda sin icono.
--   3. Lanzar esto.
--
-- Comprueba el paso 2 abriendo una en el navegador antes de seguir:
--   https://appia-nu.vercel.app/catalog/foco/icon.png
--
-- Por que a mano y no en el seed: son datos de produccion, no esquema. Y por
-- que no desde el panel: no hay pantalla para subir imagenes todavia.
--
-- Es idempotente. Busca por bundleId, que es unico, asi que lanzarlo dos veces
-- deja lo mismo. Si una app no esta subida aun, su UPDATE toca 0 filas y no
-- rompe nada: se vuelve a lanzar cuando este.

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

-- Comprobacion. Las dos filas deben salir con su icono y 4 capturas.
SELECT "name", "bundleId", "iconUrl", array_length("screenshots", 1) AS capturas
FROM "App"
WHERE "bundleId" IN ('com.appia.foco', 'com.appia.frasefuerte');
