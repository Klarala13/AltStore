import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { authOptions } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AppStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
type VersionStatus = "SCANNING" | "APPROVED" | "INFECTED" | "PENDING";
type Platform = "ANDROID" | "IOS";

interface AppDetail {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: AppStatus;
  iconUrl: string | null;
  description: string;
  shortDescription: string | null;
  privacyUrl: string;
  websiteUrl: string | null;
  totalDownloads: number;
}

interface AppVersion {
  id: string;
  versionName: string;
  versionCode: number;
  platform: Platform;
  status: VersionStatus;
  fileSize: number;
  sha256: string;
  changelog: string | null;
  minOsVersion: string | null;
  createdAt: string;
  sizeDiff: number | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VERSION_STATUS_STYLES: Record<VersionStatus, string> = {
  APPROVED: "bg-[rgba(30,255,0,0.1)] text-[#1eff00] border border-[rgba(30,255,0,0.2)]",
  SCANNING: "bg-[rgba(250,204,21,0.08)] text-yellow-400 border border-yellow-900/40",
  PENDING: "bg-[rgba(161,161,170,0.06)] text-zinc-500 border border-zinc-800",
  INFECTED: "bg-[rgba(239,68,68,0.08)] text-red-400 border border-red-900/40",
};

const APP_STATUS_STYLES: Record<AppStatus, string> = {
  APPROVED: "bg-[rgba(30,255,0,0.1)] text-[#1eff00] border border-[rgba(30,255,0,0.2)]",
  PENDING: "bg-[rgba(250,204,21,0.08)] text-yellow-400 border border-yellow-900/40",
  REJECTED: "bg-[rgba(239,68,68,0.08)] text-red-400 border border-red-900/40",
  SUSPENDED: "bg-[rgba(161,161,170,0.08)] text-zinc-500 border border-zinc-800",
};

const badge = (styles: Record<string, string>, status: string) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? ""}`}
  >
    {status.charAt(0) + status.slice(1).toLowerCase()}
  </span>
);

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDiff = (diff: number | null) => {
  if (diff === null) return null;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${formatBytes(diff)}`;
};

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getApp(id: string, token: string): Promise<AppDetail | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/apps/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return (await res.json()) as AppDetail;
  } catch {
    return null;
  }
}

async function getVersions(slug: string, token: string): Promise<AppVersion[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/apps/${slug}/versions`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items: AppVersion[] };
    return data.items ?? [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const AppDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const token = (session as { accessToken?: string }).accessToken ?? "";

  const [app, versions] = await Promise.all([getApp(id, token), getVersions(id, token)]);

  if (!app) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-zinc-600">
        <Link href={"/dashboard" as Route} className="transition-colors hover:text-zinc-400">
          My Apps
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{app.name}</span>
      </div>

      {/* App header card */}
      <div className="mb-8 flex items-start gap-5 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
        {app.iconUrl ? (
          <img src={app.iconUrl} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-xl font-bold text-zinc-500">
            {app.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-semibold text-white">{app.name}</h1>
            {badge(APP_STATUS_STYLES, app.status)}
          </div>
          <p className="mt-1 text-sm text-zinc-500">{app.category}</p>
          {app.shortDescription && (
            <p className="mt-2 text-sm text-zinc-400">{app.shortDescription}</p>
          )}
          <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">
            <span>{app.totalDownloads.toLocaleString()} downloads</span>
            {app.websiteUrl && (
              <a
                href={app.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-400"
              >
                Website ↗
              </a>
            )}
            <a
              href={app.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-400"
            >
              Privacy Policy ↗
            </a>
          </div>
        </div>
      </div>

      {/* Versions section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">Versions</h2>
        <Link
          href={`/dashboard/apps/${app.id}/versions/new` as Route}
          className="btn-primary text-xs"
        >
          + Upload APK
        </Link>
      </div>

      {versions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-16 text-center">
          <p className="text-sm font-medium text-zinc-400">No versions uploaded yet</p>
          <p className="mt-1 text-xs text-zinc-600">Upload your first APK to publish this app.</p>
          <Link
            href={`/dashboard/apps/${app.id}/versions/new` as Route}
            className="btn-primary mt-6 text-xs"
          >
            Upload APK
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Version
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Platform
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Status
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Size
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {versions.map((v) => (
                <tr key={v.id} className="bg-zinc-950/40 transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <span className="font-medium text-white">{v.versionName}</span>
                    <span className="ml-2 text-xs text-zinc-600">({v.versionCode})</span>
                    {v.changelog && (
                      <p className="mt-0.5 max-w-xs truncate text-xs text-zinc-500">
                        {v.changelog}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-zinc-400">{v.platform}</td>
                  <td className="px-5 py-4">{badge(VERSION_STATUS_STYLES, v.status)}</td>
                  <td className="px-5 py-4 text-right text-zinc-400">
                    <span>{formatBytes(v.fileSize)}</span>
                    {v.sizeDiff !== null && (
                      <span
                        className={`ml-1.5 text-xs ${v.sizeDiff > 0 ? "text-red-400" : "text-[#1eff00]"}`}
                      >
                        {formatDiff(v.sizeDiff)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right text-xs text-zinc-600">
                    {new Date(v.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppDetailPage;
