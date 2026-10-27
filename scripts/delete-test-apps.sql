-- Borra apps de prueba y las cuentas que las crearon.
-- Se ejecuta a mano en el editor SQL de Supabase. NO es una migracion: toca
-- datos, no esquema.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- ---------------------------------------------------------------------------
-- ORDEN DE BORRADO: DE DENTRO HACIA FUERA
--
-- Todas las claves ajenas son RESTRICT, asi que Postgres se niega a borrar un
-- padre que todavia tiene hijos. El orden no es opcional:
--
--   DownloadLog  -> Version   RESTRICT
--   Version      -> App       RESTRICT
--   App          -> Developer RESTRICT
--   Rating       -> App       CASCADE   (se va solo con la app)
--   Tag <-> App            CASCADE   (idem)
--   SecurityLog            sin clave ajena: entityId es texto suelto
--
-- Va todo en una transaccion: o se borra entero o no se borra nada. Si falla a
-- mitad no te deja la base de datos descuadrada.
-- ---------------------------------------------------------------------------

-- ===========================================================================
-- PASO 1 — MIRA QUE HAY ANTES DE BORRAR NADA
-- Ejecuta solo esto primero y comprueba la lista.
-- ===========================================================================

SELECT
  a.slug,
  a.name,
  a.status,
  d.email        AS desarrollador,
  COUNT(v.id)    AS versiones
FROM "App" a
JOIN "Developer" d ON d.id = a."developerId"
LEFT JOIN "Version" v ON v."appId" = a.id
GROUP BY a.slug, a.name, a.status, d.email
ORDER BY a.slug;

-- ===========================================================================
-- PASO 2 — DI QUE BORRAR
--
-- Edita esta lista. Pon los slugs que salieron arriba y quieras eliminar,
-- incluido el de la prueba de hoy.
--
-- 'klara' es el intento fallido: se creo la app y el APK nunca subio.
-- ===========================================================================

BEGIN;

CREATE TEMP TABLE apps_a_borrar (slug text PRIMARY KEY) ON COMMIT DROP;

INSERT INTO apps_a_borrar (slug) VALUES
  ('klara')
  -- , ('el-slug-de-la-prueba-de-hoy')
  -- , ('otro-mas')
;

-- Red de seguridad: las dos apps de verdad no se borran ni por error.
DELETE FROM apps_a_borrar WHERE slug IN ('tictactoe80s', 'snakearcade80s');

-- --- de dentro hacia fuera ---

DELETE FROM "DownloadLog"
WHERE "versionId" IN (
  SELECT v.id FROM "Version" v
  JOIN "App" a ON a.id = v."appId"
  WHERE a.slug IN (SELECT slug FROM apps_a_borrar)
);

DELETE FROM "Version"
WHERE "appId" IN (SELECT id FROM "App" WHERE slug IN (SELECT slug FROM apps_a_borrar));

DELETE FROM "App"
WHERE slug IN (SELECT slug FROM apps_a_borrar);

-- ===========================================================================
-- PASO 3 — CUENTAS DE PRUEBA QUE SE QUEDAN SIN APPS
--
-- Solo se borran las que cumplen las dos cosas: parecen de prueba Y ya no
-- tienen ninguna app. Asi no se puede llevar por delante una cuenta real.
--
-- Tu cuenta y la del seed no entran en el patron.
-- ===========================================================================

DELETE FROM "Developer" d
WHERE NOT EXISTS (SELECT 1 FROM "App" a WHERE a."developerId" = d.id)
  AND (
    d.email LIKE '%@altstore.test'
    OR d.email LIKE '%@appia.test'
    OR d.email LIKE '%+altstoreqa@%'
    OR d.name IN ('QA AltStore', 'R2 Upload Tester', 'Upload Tester')
  );

COMMIT;

-- ===========================================================================
-- PASO 4 — COMPRUEBA
-- Deberian quedar solo TicTacToe 80s y Snake Arcade 80s, y dos desarrolladores.
-- ===========================================================================

SELECT a.slug, a.name, a.status FROM "App" a ORDER BY a.slug;
SELECT d.email, d.name FROM "Developer" d ORDER BY d.email;

-- ---------------------------------------------------------------------------
-- LO QUE ESTO NO HACE
--
-- Los ficheros siguen en R2. Borrar la fila no borra el objeto, asi que cada
-- APK de prueba se queda ocupando sitio en uploads/pending/. No se puede hacer
-- desde SQL: o se borra desde el panel de Cloudflare, o con el aws cli y las
-- claves de R2.
--
-- Tampoco toca SecurityLog: esas filas son el registro de lo que paso, y
-- conviene conservarlo aunque la app ya no este.
-- ---------------------------------------------------------------------------
