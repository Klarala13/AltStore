import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SecurityLogsTable } from "./SecurityLogsTable";

export type Severity = "INFO" | "WARNING" | "ERROR" | "CRITICAL";

export interface SecurityLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  severity: Severity;
  metadata: Record<string, unknown> | null;
  performedBy: string | null;
  createdAt: string;
}

interface LogsResponse {
  items: SecurityLog[];
  total: number;
}

async function getSecurityLogs(
  accessToken: string,
  severity?: string
): Promise<{ logs: SecurityLog[]; total: number }> {
  try {
    const params = new URLSearchParams({ limit: "100", page: "1" });
    if (severity) params.set("severity", severity);

    const res = await fetch(`${process.env.API_URL}/admin/security-logs?${params.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return { logs: [], total: 0 };
    const data = (await res.json()) as LogsResponse;
    return { logs: data.items ?? [], total: data.total ?? 0 };
  } catch {
    return { logs: [], total: 0 };
  }
}

interface Props {
  searchParams: Promise<{ severity?: string }>;
}

const SecurityLogsPage = async ({ searchParams }: Props) => {
  const { severity } = await searchParams;
  const session = await getServerSession(authOptions);
  const accessToken = (session as { accessToken?: string }).accessToken ?? "";

  const { logs, total } = await getSecurityLogs(accessToken, severity);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Security Logs</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {total === 0 ? "No logs found." : `${total} log entries`}
          {severity ? ` — filtered by ${severity}` : ""}
        </p>
      </div>

      <SecurityLogsTable logs={logs} activeSeverity={severity} />
    </div>
  );
};

export default SecurityLogsPage;
