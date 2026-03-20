-- Enable RLS for Rating table and lock down client-side writes.
--
-- This closes Supabase's advisory for public schema tables exposed via PostgREST
-- without row level security.

ALTER TABLE IF EXISTS "Rating" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF to_regclass('public."Rating"') IS NULL THEN
    RETURN;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'Rating'
      AND policyname = 'Rating: public read active apps'
  ) THEN
    CREATE POLICY "Rating: public read active apps"
      ON "Rating"
      FOR SELECT
      TO anon, authenticated
      USING (
        EXISTS (
          SELECT 1
          FROM "App"
          WHERE "App"."id" = "Rating"."appId"
            AND "App"."status" = 'ACTIVE'::"AppStatus"
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'Rating'
      AND policyname = 'Rating: no public write'
  ) THEN
    CREATE POLICY "Rating: no public write"
      ON "Rating"
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'Rating'
      AND policyname = 'Rating: no public update'
  ) THEN
    CREATE POLICY "Rating: no public update"
      ON "Rating"
      FOR UPDATE
      TO anon, authenticated
      USING (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'Rating'
      AND policyname = 'Rating: no public delete'
  ) THEN
    CREATE POLICY "Rating: no public delete"
      ON "Rating"
      FOR DELETE
      TO anon, authenticated
      USING (false);
  END IF;
END
$$;
