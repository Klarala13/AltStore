// Shared TypeScript types between apps/web and apps/api
// These extend or compose the Prisma-generated types with presentation-layer concerns

// ─── App ────────────────────────────────────────────────────────────────────

export interface AppCardDto {
  id: string;
  slug: string;
  name: string;
  category: string;
  iconUrl: string;
  coverUrl?: string; // hero/banner image for card display
  shortDesc: string;
  platform: "ANDROID" | "IOS" | "BOTH";
  latestVersion: string | null;
  latestFileSize: string | null; // formatted, e.g. "45.2 MB"
  totalDownloads: number;
  rating?: number | null; // 0–5
}

export interface AppDetailDto extends AppCardDto {
  description: string;
  screenshots: string[];
  websiteUrl: string | null;
  privacyUrl: string;
  sourceUrl: string | null;
  developer: DeveloperPublicDto;
  versions: VersionListItemDto[];
}

// ─── Developer ──────────────────────────────────────────────────────────────

export interface DeveloperPublicDto {
  id: string;
  name: string;
  verified: boolean;
  country: string;
}

// ─── Version ────────────────────────────────────────────────────────────────

export interface VersionListItemDto {
  id: string;
  versionName: string;
  platform: "ANDROID" | "IOS" | "BOTH";
  fileSize: string; // formatted
  fileSizeDelta: string | null; // e.g. "+2.1 MB" relative to previous
  sizeTrend: "larger" | "smaller" | null;
  changelog: string;
  minOs: string;
  publishedAt: string | null;
  isLatest: boolean;
}

// ─── Downloads ──────────────────────────────────────────────────────────────

export interface DownloadRequestDto {
  appId: string;
  versionId: string;
}

export interface DownloadResponseDto {
  signedUrl: string;
  expiresAt: string; // ISO 8601
  qrCode: string; // base64 PNG
}

// ─── Status enums ───────────────────────────────────────────────────────────
// Canonical source is the Prisma schema (packages/db/prisma/schema.prisma).
// Keep these unions in sync with it — the web and the API both import from
// here so a mismatch becomes a compile error instead of a runtime crash.

export type AppStatus = "PENDING_REVIEW" | "ACTIVE" | "SUSPENDED" | "REMOVED";

export type VersionStatus = "SCANNING" | "CLEAN" | "INFECTED" | "APPROVED" | "REJECTED";

// ─── Developer dashboard ────────────────────────────────────────────────────
// Shapes returned by the authenticated GET /apps/mine endpoints. Unlike the
// public endpoints these include every status (so a developer can see an app
// still in review) and the version count.

export interface DeveloperAppSummaryDto {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: AppStatus;
  iconUrl: string | null;
  totalDownloads: number;
  versionCount: number;
}

export interface DeveloperAppListDto {
  items: DeveloperAppSummaryDto[];
  total: number;
  page: number;
  limit: number;
}

export interface DeveloperVersionDto {
  id: string;
  versionName: string;
  versionCode: number;
  platform: "ANDROID" | "IOS" | "BOTH";
  status: VersionStatus;
  fileSize: number; // bytes
  fileSha256: string;
  changelog: string;
  minOs: string;
  createdAt: string; // ISO 8601
  publishedAt: string | null;
  isLatest: boolean;
  /** Byte delta against the next-older version; null when there is none. */
  sizeDiff: number | null;
}

export interface DeveloperAppDetailDto extends DeveloperAppSummaryDto {
  bundleId: string;
  description: string;
  shortDesc: string;
  platform: "ANDROID" | "IOS" | "BOTH";
  websiteUrl: string | null;
  privacyUrl: string;
  sourceUrl: string | null;
  createdAt: string; // ISO 8601
  versions: DeveloperVersionDto[];
}
