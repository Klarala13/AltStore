export const SCAN_QUEUE = "virus-scan";

export interface ScanJobData {
  versionId: string;
  fileKey: string;
  appBundleId: string;
}
