"use client";

import { useState } from "react";
import { useDownloadRequest } from "@/hooks/useDownloadRequest";

interface DownloadActionsProps {
  versionId: string;
  appName: string;
  fileSize?: string;
}

const DownloadActions = ({ versionId, appName, fileSize }: DownloadActionsProps) => {
  const { loading, error, payload, request, download } = useDownloadRequest(versionId);
  const [started, setStarted] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const onDownload = async () => {
    if (await download()) setStarted(true);
  };

  const onToggleQr = async () => {
    if (qrOpen) {
      setQrOpen(false);
      return;
    }
    if (await request()) setQrOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={loading}
          className="btn-primary disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Preparing…" : `Download APK${fileSize ? ` · ${fileSize}` : ""}`}
        </button>
        <button
          type="button"
          onClick={onToggleQr}
          disabled={loading}
          aria-expanded={qrOpen}
          aria-controls="download-qr"
          className="btn-secondary hidden md:inline-flex"
        >
          {qrOpen ? "Hide QR" : "Install on phone"}
        </button>
      </div>

      <div aria-live="polite">
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {started && !error && (
          <p className="mt-3 text-sm text-zinc-400">
            Your download has started. Open the file to install — Android may ask you to allow
            installs from your browser the first time.
          </p>
        )}
      </div>

      {qrOpen && payload && (
        <div
          id="download-qr"
          className="mt-4 inline-flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3"
        >
          <img src={payload.qrCode} alt={`QR code to download ${appName}`} className="h-36 w-36" />
          <p className="max-w-[14rem] text-xs leading-5 text-zinc-400">
            Scan with your phone&apos;s camera to download {appName} directly. The link is valid
            for a few minutes.
          </p>
        </div>
      )}
    </div>
  );
};

export { DownloadActions };
