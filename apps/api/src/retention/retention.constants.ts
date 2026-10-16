export const RETENTION_QUEUE = "retention";

export const DOWNLOAD_LOG_SWEEP = "download-log-sweep";

/**
 * Daily, 03:15 UTC. Deliberately not 06:15 — that is when the Supabase
 * keepalive workflow runs, and two jobs hitting a free-tier database at the
 * same minute is a self-inflicted puzzle.
 */
export const DOWNLOAD_LOG_SWEEP_CRON = "15 3 * * *";

/**
 * 90 days, because that is what /privacy and /gdpr promise. These are the same
 * number and must stay that way: raising it here silently makes both pages
 * false. Override only alongside a copy change.
 */
export const DEFAULT_RETENTION_DAYS = 90;

/**
 * Rows deleted per statement. Supabase free tier does not enjoy one enormous
 * DELETE, and a bounded statement holds its locks for a predictable time.
 */
export const DELETE_BATCH_SIZE = 1000;

/** Stops a malformed filter from looping forever. 500 × 1000 = 500k rows/run. */
export const MAX_BATCHES_PER_RUN = 500;
