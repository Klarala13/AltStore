"use client";

import { useState } from "react";

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

type ReviewAction = "ACTIVE" | "SUSPENDED";

interface ReviewQueueProps {
  initialApps: AppSummary[];
  accessToken: string;
}

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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p className="text-sm font-medium text-zinc-400">Queue is empty</p>
    <p className="mt-1 text-xs text-zinc-600">All submitted apps have been reviewed.</p>
  </div>
);

export const ReviewQueue = ({ initialApps, accessToken }: ReviewQueueProps) => {
  const [apps, setApps] = useState<AppSummary[]>(initialApps);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (appId: string, action: ReviewAction) => {
    setPending((prev) => new Set(prev).add(appId));
    setError(null);

    try {
      const res = await fetch(`/api/admin/apps/${appId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        setError(body.message ?? "Something went wrong.");
        return;
      }

      // Remove the reviewed app from the queue
      setApps((prev) => prev.filter((a) => a.id !== appId));
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(appId);
        return next;
      });
    }
  };

  if (apps.length === 0) return <EmptyState />;

  return (
    <>
      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {apps.map((app) => {
          const isProcessing = pending.has(app.id);
          const submittedAt = new Date(app.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={app.id}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 transition-opacity"
              style={{ opacity: isProcessing ? 0.5 : 1 }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                {app.iconUrl ? (
                  <img
                    src={app.iconUrl}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-sm font-bold text-zinc-500">
                    {app.name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold text-white">{app.name}</h2>
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                      {app.category}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{app.bundleId}</p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <span>
                      Developer: <span className="text-zinc-300">{app.developer.name}</span> &lt;
                      {app.developer.email}&gt;
                    </span>
                    <span>
                      Versions: <span className="text-zinc-300">{app._count.versions}</span>
                    </span>
                    <span>Submitted: {submittedAt}</span>
                  </div>

                  <div className="mt-2">
                    <a
                      href={app.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-300"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => void handleAction(app.id, "ACTIVE")}
                    disabled={isProcessing}
                    className="rounded-lg border border-emerald-900/50 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-900/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => void handleAction(app.id, "SUSPENDED")}
                    disabled={isProcessing}
                    className="rounded-lg border border-red-900/40 bg-red-950/40 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
