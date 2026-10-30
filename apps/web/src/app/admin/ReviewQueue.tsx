"use client";

import { useState } from "react";

type VersionStatus = "SCANNING" | "CLEAN" | "INFECTED" | "APPROVED" | "REJECTED";

interface VersionSummary {
  id: string;
  versionName: string;
  status: VersionStatus;
  scannedAt: string | null;
}

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
  versions: VersionSummary[];
  _count: { versions: number };
}

type ReviewAction = "ACTIVE" | "SUSPENDED";

interface ReviewQueueProps {
  initialApps: AppSummary[];
}

/**
 * Como se lee cada veredicto del escaneo y si deja publicar.
 *
 * Solo APPROVED abre la puerta. CLEAN no basta: quiere decir que VirusTotal no
 * vio nada, pero la version todavia no esta aprobada, y el API exige un
 * APPROVED explicito (admin.service.ts, assertScanned).
 */
const SCAN_LABELS: Record<VersionStatus, { text: string; tone: string }> = {
  APPROVED: { text: "Escaneo pasado", tone: "text-emerald-400" },
  CLEAN: { text: "Sin virus, sin aprobar", tone: "text-amber-400" },
  SCANNING: { text: "Escaneando", tone: "text-amber-400" },
  INFECTED: { text: "Infectada", tone: "text-red-400" },
  REJECTED: { text: "Rechazada en el escaneo", tone: "text-red-400" },
};

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
    <p className="text-sm font-medium text-zinc-400">No hay nada que revisar</p>
    <p className="mt-1 text-xs text-zinc-600">Todas las apps enviadas estan revisadas.</p>
  </div>
);

export const ReviewQueue = ({ initialApps }: ReviewQueueProps) => {
  const [apps, setApps] = useState<AppSummary[]>(initialApps);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (appId: string, action: ReviewAction) => {
    setPending((prev) => new Set(prev).add(appId));
    setConfirming(null);
    setError(null);

    try {
      // Sin cabecera Authorization: el proxy /api/admin lee la sesion en el
      // servidor. Mandar el JWT desde aqui obligaria a incrustarlo en el HTML.
      const res = await fetch(`/api/admin/apps/${appId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        setError(body.message ?? "Algo ha fallado.");
        return;
      }

      setApps((prev) => prev.filter((a) => a.id !== appId));
    } catch {
      setError("No se ha podido conectar. Prueba otra vez.");
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
          const versions = app.versions ?? [];
          const canPublish = versions.some((v) => v.status === "APPROVED");
          const latest = versions[0];
          const submittedAt = new Date(app.createdAt).toLocaleDateString("es-ES", {
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
                      Desarrollador: <span className="text-zinc-300">{app.developer.name}</span> &lt;
                      {app.developer.email}&gt;
                    </span>
                    <span>Enviada: {submittedAt}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    {latest ? (
                      <span className="text-zinc-500">
                        v{latest.versionName}:{" "}
                        <span className={SCAN_LABELS[latest.status].tone}>
                          {SCAN_LABELS[latest.status].text}
                        </span>
                        {versions.length > 1 && (
                          <span className="text-zinc-600"> · {versions.length} versiones</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-amber-400">Sin ninguna version subida</span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <a
                      href={`/apps/${app.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 underline underline-offset-2 hover:text-white"
                    >
                      Ver la ficha
                    </a>
                    <a
                      href={app.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 underline underline-offset-2 hover:text-zinc-300"
                    >
                      Politica de privacidad
                    </a>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => void handleAction(app.id, "ACTIVE")}
                    disabled={isProcessing || !canPublish}
                    title={
                      canPublish
                        ? undefined
                        : "Ninguna version ha pasado el escaneo de VirusTotal todavia"
                    }
                    className="rounded-lg border border-emerald-900/50 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-900/40 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Publicar
                  </button>
                  {confirming === app.id ? (
                    <button
                      onClick={() => void handleAction(app.id, "SUSPENDED")}
                      disabled={isProcessing}
                      className="rounded-lg border border-red-700 bg-red-900/60 px-3 py-1.5 text-xs font-medium text-red-200 transition-colors hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Seguro?
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirming(app.id)}
                      disabled={isProcessing}
                      className="rounded-lg border border-red-900/40 bg-red-950/40 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Rechazar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
