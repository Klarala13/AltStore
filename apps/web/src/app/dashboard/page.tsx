import { getServerSession } from "next-auth";
import Link from "next/link";
import type { Route } from "next";
import { authOptions } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Types (mirrors NestJS response shapes)
// ---------------------------------------------------------------------------

type AppStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

interface AppSummary {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: AppStatus;
  iconUrl: string | null;
  totalDownloads: number;
  _count: { versions: number };
}

interface AppsResponse {
  items: AppSummary[];
  total: number;
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<AppStatus, string> = {
  APPROVED: "bg-[rgba(30,255,0,0.1)] text-[#1eff00] border border-[rgba(30,255,0,0.2)]",
  PENDING: "bg-[rgba(250,204,21,0.08)] text-yellow-400 border border-yellow-900/40",
  REJECTED: "bg-[rgba(239,68,68,0.08)] text-red-400 border border-red-900/40",
  SUSPENDED: "bg-[rgba(161,161,170,0.08)] text-zinc-500 border border-zinc-800",
};

const StatusBadge = ({ status }: { status: AppStatus }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
  >
    {status.charAt(0) + status.slice(1).toLowerCase()}
  </span>
);

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-20 text-center">
    <svg
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      className="mb-4 text-zinc-700"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    <p className="text-sm font-medium text-zinc-400">No apps yet</p>
    <p className="mt-1 text-xs text-zinc-600">Submit your first app to get started.</p>
    <Link href={"/dashboard/apps/new" as Route} className="btn-primary mt-6 text-xs">
      Submit App
    </Link>
  </div>
);

// ---------------------------------------------------------------------------
// Server data fetch
// ---------------------------------------------------------------------------

async function getDeveloperApps(accessToken: string): Promise<AppSummary[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/apps?developerId=me&limit=50`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as AppsResponse;
    return data.items ?? [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = (session as { accessToken?: string }).accessToken ?? "";
  const apps = await getDeveloperApps(accessToken);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header row */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">My Apps</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {apps.length === 0
              ? "No apps submitted yet."
              : `${apps.length} app${apps.length !== 1 ? "s" : ""} submitted`}
          </p>
        </div>
        <Link href={"/dashboard/apps/new" as Route} className="btn-primary text-sm">
          + New App
        </Link>
      </div>

      {apps.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  App
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Category
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Status
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Downloads
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  Versions
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {apps.map((app) => (
                <tr key={app.id} className="bg-zinc-950/40 transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {app.iconUrl ? (
                        <img src={app.iconUrl} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-500">
                          {app.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-white">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-zinc-400">{app.category}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-5 py-4 text-right text-zinc-400">
                    {app.totalDownloads.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-right text-zinc-400">{app._count.versions}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/dashboard/apps/${app.id}` as Route}
                      className="text-xs font-medium text-zinc-500 transition-colors hover:text-white"
                    >
                      Manage →
                    </Link>
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

export default DashboardPage;
