import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReviewQueue } from "./ReviewQueue";

interface AppSummary {
  id: string;
  name: string;
  slug: string;
  bundleId: string;
  category: string;
  iconUrl: string | null;
  privacyUrl: string;
  createdAt: string;
  developer: { id: string; name: string; email: string };
  _count: { versions: number };
}

interface AppsResponse {
  items: AppSummary[];
  total: number;
}

async function getPendingApps(accessToken: string): Promise<AppSummary[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/admin/apps?status=PENDING_REVIEW&limit=50`, {
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

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = (session as { accessToken?: string }).accessToken ?? "";
  const apps = await getPendingApps(accessToken);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Review Queue</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {apps.length === 0
            ? "No apps pending review."
            : `${apps.length} app${apps.length !== 1 ? "s" : ""} awaiting review`}
        </p>
      </div>

      <ReviewQueue initialApps={apps} accessToken={accessToken} />
    </div>
  );
};

export default AdminPage;
