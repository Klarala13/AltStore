-- Enable Row Level Security on all tables
-- This migration enables RLS and creates appropriate policies for each table.
--
-- Access model:
--   anon role       — unauthenticated Supabase clients (public consumers)
--   authenticated   — logged-in Supabase Auth users (consumers)
--   service_role    — backend NestJS API (bypasses RLS by default in Supabase)
--
-- The NestJS API connects with the service_role key and bypasses RLS entirely,
-- so write policies below are a defence-in-depth layer — they also block
-- accidental direct anon/authenticated writes from the client SDK.

-- ---------------------------------------------------------------------------
-- Developer
-- No public read. Developers manage their own record via the API (service_role).
-- ---------------------------------------------------------------------------
ALTER TABLE "Developer" ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS; this policy blocks anon/authenticated writes.
CREATE POLICY "Developer: no public access"
  ON "Developer"
  FOR ALL
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- App
-- Public can read ACTIVE apps. Writes go through the API (service_role).
-- ---------------------------------------------------------------------------
ALTER TABLE "App" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "App: public read active"
  ON "App"
  FOR SELECT
  TO anon, authenticated
  USING (status = 'ACTIVE'::"AppStatus");

CREATE POLICY "App: no public write"
  ON "App"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "App: no public update"
  ON "App"
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "App: no public delete"
  ON "App"
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- Version
-- Public can read APPROVED versions. Writes go through the API.
-- ---------------------------------------------------------------------------
ALTER TABLE "Version" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Version: public read approved"
  ON "Version"
  FOR SELECT
  TO anon, authenticated
  USING (status = 'APPROVED'::"VersionStatus");

CREATE POLICY "Version: no public write"
  ON "Version"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Version: no public update"
  ON "Version"
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "Version: no public delete"
  ON "Version"
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- DownloadLog
-- No public access. Contains hashed IPs — GDPR sensitive.
-- Written exclusively by the NestJS API via service_role.
-- ---------------------------------------------------------------------------
ALTER TABLE "DownloadLog" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "DownloadLog: no public access"
  ON "DownloadLog"
  FOR ALL
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- SecurityLog
-- No public access. Internal audit log — API-only via service_role.
-- ---------------------------------------------------------------------------
ALTER TABLE "SecurityLog" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SecurityLog: no public access"
  ON "SecurityLog"
  FOR ALL
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- Tag
-- Public read. Writes managed by admins via the API (service_role).
-- ---------------------------------------------------------------------------
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tag: public read"
  ON "Tag"
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Tag: no public write"
  ON "Tag"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Tag: no public update"
  ON "Tag"
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "Tag: no public delete"
  ON "Tag"
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- _AppToTag (Prisma implicit many-to-many join table)
-- Public read restricted: only join rows for ACTIVE apps.
-- Writes go through the API.
-- ---------------------------------------------------------------------------
ALTER TABLE "_AppToTag" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "_AppToTag: public read active apps"
  ON "_AppToTag"
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "App"
      WHERE "App"."id" = "_AppToTag"."A"
        AND "App"."status" = 'ACTIVE'::"AppStatus"
    )
  );

CREATE POLICY "_AppToTag: no public write"
  ON "_AppToTag"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "_AppToTag: no public update"
  ON "_AppToTag"
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "_AppToTag: no public delete"
  ON "_AppToTag"
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Note: _prisma_migrations is intentionally excluded here.
-- Prisma manages that table itself and it does not exist in the shadow database,
-- which would cause migrate dev to fail. RLS on _prisma_migrations must be
-- applied manually in the Supabase dashboard or via a one-off SQL query.
