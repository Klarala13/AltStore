"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; queued: number }
  | { kind: "error"; message: string };

const RescanButton = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "idle" });

  const rescan = async (all: boolean) => {
    if (all && !window.confirm("Rescan every approved version, including ones already scanned?")) {
      return;
    }
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/admin/versions/rescan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all }),
      });
      const data = (await res.json()) as { queued?: number; message?: string };
      if (!res.ok) throw new Error(data.message ?? "Could not start the rescan");
      setState({ kind: "done", queued: data.queued ?? 0 });
      router.refresh();
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Rescan failed" });
    }
  };

  const loading = state.kind === "loading";

  return (
    <div className="flex flex-col items-start gap-2 md:items-end">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => rescan(false)}
          disabled={loading}
          className="btn-primary px-4 py-2 text-sm disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Queuing…" : "Scan unscanned versions"}
        </button>
        <button
          type="button"
          onClick={() => rescan(true)}
          disabled={loading}
          className="btn-secondary px-4 py-2 text-sm disabled:opacity-60"
        >
          Rescan all
        </button>
      </div>

      <p aria-live="polite" className="text-xs">
        {state.kind === "done" &&
          (state.queued === 0 ? (
            <span className="text-zinc-400">Every approved version already has a scan.</span>
          ) : (
            <span className="text-zinc-400">
              {state.queued} version{state.queued !== 1 ? "s" : ""} queued. Results appear below as
              each scan finishes — refresh in a minute.
            </span>
          ))}
        {state.kind === "error" && (
          <span role="alert" className="text-red-400">
            {state.message}
          </span>
        )}
      </p>
    </div>
  );
};

export { RescanButton };
