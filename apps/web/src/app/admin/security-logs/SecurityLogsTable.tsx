import type { Severity, SecurityLog } from "./page";
import { SeverityFilter } from "./SeverityFilter";

const SEVERITY_STYLES: Record<Severity, string> = {
  INFO: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40",
  WARNING: "bg-yellow-950/40 text-yellow-400 border-yellow-900/40",
  ERROR: "bg-orange-950/40 text-orange-400 border-orange-900/40",
  CRITICAL: "bg-red-950/40 text-red-400 border-red-900/40",
};

interface SecurityLogsTableProps {
  logs: SecurityLog[];
  activeSeverity?: string;
}

/**
 * Server Component — renders the filter pills (client leaf) + static table.
 * The table rows are pure data render and don't need to be client-side.
 */
export const SecurityLogsTable = ({ logs, activeSeverity }: SecurityLogsTableProps) => (
  <>
    {/* Severity filter pills — client leaf, uses useRouter */}
    <SeverityFilter activeSeverity={activeSeverity} />

    {logs.length === 0 ? (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-20 text-center">
        <p className="text-sm font-medium text-zinc-400">No logs found</p>
        <p className="mt-1 text-xs text-zinc-600">
          {activeSeverity ? `No ${activeSeverity} entries.` : "The security log is empty."}
        </p>
      </div>
    ) : (
      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Entity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Performed By
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {logs.map((log) => (
              <tr key={log.id} className="bg-zinc-950/40 transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${SEVERITY_STYLES[log.severity]}`}
                  >
                    {log.severity}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-300">{log.action}</td>
                <td className="px-4 py-3 text-xs text-zinc-400">
                  <span className="text-zinc-500">{log.entityType}/</span>
                  <span className="font-mono">{log.entityId.slice(0, 8)}…</span>
                </td>
                <td className="px-4 py-3 text-xs text-zinc-400">{log.performedBy ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  {new Date(log.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);
