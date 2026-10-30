-- Te da acceso al panel de revision (/admin).
-- Se ejecuta a mano, en el editor SQL de Supabase.
--
--   Supabase > tu proyecto > SQL Editor > New query > pegar > Run
--
-- POR QUE HACE FALTA
--
-- El enlace del correo de aviso lleva a /admin. Esa zona comprueba dos cosas,
-- en este orden (apps/web/src/app/admin/layout.tsx):
--
--   1. Si no hay sesion -> te manda a /login. Por eso te pide entrar.
--   2. Si la sesion no es admin -> te manda a / SIN DECIR NADA. Por eso
--      acabas en la home y parece que el enlace esta roto.
--
-- Lo segundo es tu caso: Developer.isAdmin arranca en false para todas las
-- cuentas (developers.service.ts:61), incluida la tuya. Nadie es admin hasta
-- que se marca aqui a mano, y eso es correcto: no hay forma de darse permisos
-- de admin desde la web.
--
-- El flag viaja en el JWT que emite el API, asi que despues de cambiarlo hay
-- que CERRAR SESION Y VOLVER A ENTRAR. Si no, tu sesion sigue llevando el
-- isAdmin: false de antes y te seguira echando a la home.

-- ---------------------------------------------------------------------------
-- 1. Con que cuentas existes. Mira esto primero.
-- ---------------------------------------------------------------------------
-- Si tienes mas de una, elige la del email con el que entras a Appia.
SELECT
  "email",
  "name",
  "type",
  "isAdmin",
  "verified",
  "createdAt"
FROM "Developer"
ORDER BY "createdAt";

-- ---------------------------------------------------------------------------
-- 2. Darte admin
-- ---------------------------------------------------------------------------
-- CAMBIA EL EMAIL por el que te haya salido arriba antes de lanzarlo.
UPDATE "Developer"
SET "isAdmin" = true, "updatedAt" = NOW()
WHERE "email" = 'PON-AQUI-TU-EMAIL';

-- ---------------------------------------------------------------------------
-- 3. Comprobacion
-- ---------------------------------------------------------------------------
-- Tiene que salir isAdmin = true en una sola fila, y en ninguna mas.
SELECT "email", "isAdmin" FROM "Developer" WHERE "isAdmin" = true;
