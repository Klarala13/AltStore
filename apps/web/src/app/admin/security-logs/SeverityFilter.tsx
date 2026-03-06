"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next";
import type { Severity } from "./page";

const SEVERITY_STYLES: Record<Severity, string> = {
  INFO: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40",
  WARNING: "bg-yellow-950/40 text-yellow-400 border-yellow-900/40",
  ERROR: "bg-orange-950/40 text-orange-400 border-orange-900/40",
  CRITICAL: "bg-red-950/40 text-red-400 border-red-900/40",
};

const SEVERITIES: Severity[] = ["INFO", "WARNING", "ERROR", "CRITICAL"];

/**
 * Filter pill buttons — client leaf. Only this tiny piece needs useRouter;
 * the table itself is rendered on the server.
 */
export const SeverityFilter = ({ activeSeverity }: { activeSeverity?: string }) => {
  const router = useRouter();

  const setFilter = (severity?: Severity) => {
    const params = severity ? `?severity=${severity}` : "";
    router.push(`/admin/security-logs${params}` as Route);
  };

  return (
    <div className="mb-5 flex flex-wrap gap-2">
      <button
        onClick={() => setFilter(undefined)}
        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
          !activeSeverity
            ? "border-zinc-600 bg-zinc-800 text-white"
            : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
        }`}
      >
        All
      </button>
      {SEVERITIES.map((s) => (
        <button
          key={s}
          onClick={() => setFilter(s)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            activeSeverity === s
              ? SEVERITY_STYLES[s] + " border-current"
              : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};
