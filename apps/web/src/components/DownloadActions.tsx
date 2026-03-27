"use client";

import { useState } from "react";

interface DownloadActionsProps {
  versionId: string;
  appName: string;
}

interface DownloadResponse {
  signedUrl: string;
  qrCode: string;
}

const DownloadActions = ({ versionId, appName }: DownloadActionsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<DownloadResponse | null>(null);

  const requestDownload = async (): Promise<DownloadResponse | null> => {
    if (payload) return payload;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/downloads/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId }),
      });

      const data = (await res.json()) as Partial<DownloadResponse> & { message?: string };
      if (!res.ok || !data.signedUrl || !data.qrCode) {
        throw new Error(data.message ?? "Download unavailable");
      }

      const result: DownloadResponse = { signedUrl: data.signedUrl, qrCode: data.qrCode };
      setPayload(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download unavailable");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const onDownload = async () => {
    const result = await requestDownload();
    if (!result) return;
    window.open(result.signedUrl, "_blank", "noopener,noreferrer");
  };

  const onQr = async () => {
    await requestDownload();
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onDownload} disabled={loading} className="btn-primary">
          {loading ? "Preparing..." : "Download APK"}
        </button>
        <button type="button" onClick={onQr} disabled={loading} className="btn-secondary">
          Show QR
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {payload && (
        <div className="mt-4 inline-flex flex-col items-start rounded-xl border border-zinc-800 bg-zinc-950 p-3">
          <img src={payload.qrCode} alt={`QR code to download ${appName}`} className="h-40 w-40" />
          <a
            href={payload.signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-zinc-400 underline underline-offset-2 transition-colors hover:text-white"
          >
            Open direct download link
          </a>
        </div>
      )}
    </div>
  );
};

export { DownloadActions };
