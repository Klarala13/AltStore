// Shared TypeScript types between apps/web and apps/api
// These extend or compose the Prisma-generated types with presentation-layer concerns

// ─── App ────────────────────────────────────────────────────────────────────

export interface AppCardDto {
  id: string;
  slug: string;
  name: string;
  category: string;
  iconUrl: string;
  shortDesc: string;
  platform: "ANDROID" | "IOS" | "BOTH";
  latestVersion: string | null;
  latestFileSize: string | null; // formatted, e.g. "45.2 MB"
  totalDownloads: number;
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
