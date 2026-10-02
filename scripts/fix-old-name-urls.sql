-- Corrige las URLs de produccion que siguen apuntando a dominios que no son
-- vuestros. Se ejecuta UNA vez, a mano, en el editor SQL de Supabase.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- Por que a mano y no en una migracion de Prisma: esto corrige DATOS de
-- produccion, no el esquema. Una migracion de Prisma versiona la forma de las
-- tablas; meter aqui un UPDATE de filas mezcla las dos cosas y ademas se
-- reaplicaria en cualquier entorno nuevo, donde estas filas no existen.
--
-- Es idempotente: las clausulas WHERE solo tocan los valores viejos, asi que
-- lanzarlo dos veces no hace nada la segunda.
--
-- ---------------------------------------------------------------------------
-- QUE ARREGLA
--
-- 1. privacyUrl -> https://altstore.dev/privacy
--    Campo OBLIGATORIO por RGPD en cada App, y manda a los usuarios a un
--    dominio que no controlais. El valor nuevo es vuestra pagina de verdad,
--    que responde 200 hoy.
--
--    OJO: el valor que trae packages/db/prisma/seed.ts era
--    https://appia.dev/privacy, y **appia.dev no resuelve**. Habria repetido
--    exactamente el error de altstore.eu: cambiar un dominio ajeno por otro
--    dominio que tampoco es vuestro. Por eso se usa la URL de Vercel.
--
-- 2. websiteUrl -> https://github.com/appia/tictactoe80s
--    `github.com/appia` es una **organizacion ajena, creada en 2013**, y el
--    repo da 404. Se pone a NULL: el campo es opcional, y vacio es mejor que
--    apuntar a la cuenta de otra persona.
--
-- 3. El desarrollador del seed se sigue llamando "AltStore Seed", y es el
--    nombre que sale en la ficha de las dos apps.
--
-- QUE NO TOCA, A PROPOSITO
--
--   Version.fileKey  sigue en apps/com.altstore.*  <- NO LO CAMBIES AQUI
--   App.bundleId     sigue en com.altstore.*
--
-- El fichero esta en R2 bajo la clave vieja y **las dos descargas funcionan
-- hoy**. Cambiar fileKey sin mover antes los binarios en R2 rompe la descarga
-- al instante. Eso es un trabajo aparte: primero copiar en R2, comprobar, y
-- solo despues actualizar las filas.
-- ---------------------------------------------------------------------------

-- Antes: mira lo que vas a cambiar.
SELECT slug, "privacyUrl", "websiteUrl" FROM "App" ORDER BY slug;
SELECT email, name FROM "Developer" ORDER BY email;

BEGIN;

UPDATE "App"
SET "privacyUrl" = 'https://appia-nu.vercel.app/privacy'
WHERE "privacyUrl" = 'https://altstore.dev/privacy';

UPDATE "App"
SET "websiteUrl" = NULL
WHERE "websiteUrl" LIKE 'https://github.com/appia/%'
   OR "websiteUrl" LIKE 'https://github.com/altstore/%';

UPDATE "Developer"
SET name = 'Appia Seed'
WHERE name = 'AltStore Seed';

COMMIT;

-- Despues: comprueba. privacyUrl debe ser la de appia-nu en las dos filas,
-- websiteUrl debe estar vacio, y el desarrollador debe decir "Appia Seed".
SELECT slug, "privacyUrl", "websiteUrl" FROM "App" ORDER BY slug;
SELECT email, name FROM "Developer" ORDER BY email;
