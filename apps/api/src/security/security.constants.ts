export const SCAN_QUEUE = "virus-scan";

/**
 * "upload": a new APK in pending storage. Clean → APPROVED and moved; any
 * failure rejects it, since nothing is live yet.
 * "rescan": a version that may already be live. Clean → record the report and
 * leave it alone; infected → INFECTED, which stops downloads; a scan error
 * changes nothing, so a VirusTotal outage never takes an app down.
 */
export type ScanMode = "upload" | "rescan";

export interface ScanJobData {
  versionId: string;
  fileKey: string;
  appBundleId: string;
  fileSha256?: string;
  // Absent on jobs queued before rescans existed — those are uploads.
  mode?: ScanMode;
}
