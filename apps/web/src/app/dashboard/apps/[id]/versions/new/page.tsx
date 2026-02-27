"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type VersionStatus = "SCANNING" | "APPROVED" | "INFECTED" | "PENDING";
type Platform = "ANDROID" | "IOS";

interface UploadedVersion {
  id: string;
  status: VersionStatus;
  versionName: string;
}

interface FormState {
  versionName: string;
  versionCode: string;
  platform: Platform;
  changelog: string;
  minOsVersion: string;
}

const EMPTY_FORM: FormState = {
  versionName: "",
  versionCode: "",
  platform: "ANDROID",
  changelog: "",
  minOsVersion: "",
};

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none";

// ---------------------------------------------------------------------------
// Scan status indicator — polls every 4 s until terminal state
// ---------------------------------------------------------------------------

const STATUS_LABEL: Record<VersionStatus, string> = {
  PENDING: "Queued",
  SCANNING: "Scanning…",
  APPROVED: "Approved",
  INFECTED: "Infected — rejected",
};

const STATUS_COLOUR: Record<VersionStatus, string> = {
  PENDING: "text-zinc-500",
  SCANNING: "text-yellow-400",
  APPROVED: "text-[#1eff00]",
  INFECTED: "text-red-400",
};

const ScanStatus = ({
  version,
  appId,
  onDone,
}: {
  version: UploadedVersion;
  appId: string;
  onDone: (final: VersionStatus) => void;
}) => {
  const [status, setStatus] = useState<VersionStatus>(version.status);
  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneRef = useRef(false);

  const poll = useCallback(async () => {
    if (doneRef.current) return;
    try {
      const res = await fetch(`/api/apps/${appId}/versions/${version.id}/status`);
      if (res.ok) {
        const data = (await res.json()) as { status: VersionStatus };
        setStatus(data.status);
        if (data.status === "APPROVED" || data.status === "INFECTED") {
          doneRef.current = true;
          onDone(data.status);
          return;
        }
      }
    } catch {
      // network hiccup — keep polling
    }
    pollingRef.current = setTimeout(() => void poll(), 4000);
  }, [appId, version.id, onDone]);

  // Kick off polling on mount if not already terminal
  useState(() => {
    if (status !== "APPROVED" && status !== "INFECTED") {
      pollingRef.current = setTimeout(() => void poll(), 4000);
    } else {
      doneRef.current = true;
    }
    return () => {
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  });

  const isSpinning = status === "SCANNING" || status === "PENDING";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
      <p className="mb-4 text-sm font-semibold text-white">{version.versionName} — Scan Status</p>
      <div className="flex items-center gap-3">
        {isSpinning ? (
          <svg
            className="h-5 w-5 animate-spin text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : status === "APPROVED" ? (
          <svg
            className="h-5 w-5 text-[#1eff00]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className={`text-sm font-medium ${STATUS_COLOUR[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      {status === "INFECTED" && (
        <p className="mt-3 text-xs text-red-400/80">
          This APK was flagged by VirusTotal and has been removed. Please review your build and
          resubmit.
        </p>
      )}
      {status === "APPROVED" && (
        <p className="mt-3 text-xs text-zinc-500">
          Your APK passed all security checks and is now available for download.
        </p>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Upload form page
// ---------------------------------------------------------------------------

const UploadVersionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();

  // Resolve params synchronously via React.use() — but since this is a client
  // component we receive the resolved value from the parent server boundary.
  // Next.js 15 passes params as a Promise even to client pages; we must unwrap.
  const [appId] = useState<string>(() => {
    // We can't `await` here, so we resolve the promise eagerly and store it.
    // The actual value arrives before first render because Next.js pre-resolves
    // params for client pages.
    let id = "";
    void params.then((p) => {
      id = p.id;
    });
    return id;
  });

  // Re-fetch appId properly
  const resolvedAppId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  useState(() => {
    void params.then((p) => {
      resolvedAppId.current = p.id;
      setReady(true);
    });
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedVersion, setUploadedVersion] = useState<UploadedVersion | null>(null);
  const [finalStatus, setFinalStatus] = useState<VersionStatus | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep appId in sync (params resolves before paint but useState initialiser runs once)
  const effectiveAppId = resolvedAppId.current ?? appId;

  // ---------------------------------------------------------------------------
  // Drag-and-drop
  // ---------------------------------------------------------------------------

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  // ---------------------------------------------------------------------------
  // Upload via XHR so we get progress events
  // ---------------------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an APK file.");
      return;
    }
    if (!effectiveAppId) {
      setError("App ID missing.");
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("versionName", form.versionName);
    fd.append("versionCode", form.versionCode);
    fd.append("platform", form.platform);
    if (form.changelog) fd.append("changelog", form.changelog);
    if (form.minOsVersion) fd.append("minOsVersion", form.minOsVersion);

    await new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/api/apps/${effectiveAppId}/versions`);

      xhr.upload.addEventListener("progress", (ev) => {
        if (ev.lengthComputable) {
          setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        }
      });

      xhr.addEventListener("load", () => {
        setUploading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          const version = JSON.parse(xhr.responseText) as UploadedVersion;
          setUploadedVersion(version);
        } else {
          try {
            const body = JSON.parse(xhr.responseText) as { message?: string };
            setError(body.message ?? "Upload failed. Please try again.");
          } catch {
            setError("Upload failed. Please try again.");
          }
        }
        resolve();
      });

      xhr.addEventListener("error", () => {
        setUploading(false);
        setError("Network error. Please check your connection.");
        resolve();
      });

      xhr.send(fd);
    });
  };

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // ---------------------------------------------------------------------------
  // Render — post-upload scan tracking state
  // ---------------------------------------------------------------------------

  if (uploadedVersion && effectiveAppId) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-white">APK Uploaded</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Your file has been received and is being scanned by VirusTotal.
          </p>
        </div>

        <ScanStatus
          version={uploadedVersion}
          appId={effectiveAppId}
          onDone={(s) => setFinalStatus(s)}
        />

        {finalStatus && (
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => router.push(`/dashboard/apps/${effectiveAppId}` as Route)}
              className="btn-primary text-sm"
            >
              Back to App
            </button>
            {finalStatus === "INFECTED" && (
              <button
                type="button"
                onClick={() => {
                  setUploadedVersion(null);
                  setFinalStatus(null);
                  setFile(null);
                  setForm(EMPTY_FORM);
                  setUploadProgress(0);
                }}
                className="btn-secondary text-sm"
              >
                Upload Another
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render — upload form
  // ---------------------------------------------------------------------------

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-zinc-600">
        <button
          type="button"
          onClick={() => router.push(`/dashboard/apps/${effectiveAppId}` as Route)}
          className="transition-colors hover:text-zinc-400"
        >
          App Detail
        </button>
        <span>/</span>
        <span className="text-zinc-400">Upload APK</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Upload APK</h1>
        <p className="mt-1 text-sm text-zinc-500">
          All uploads are scanned by VirusTotal before being made available for download.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Drag-and-drop zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop APK file here or click to browse"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          className={[
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors duration-150",
            dragging
              ? "border-[#1eff00] bg-[rgba(30,255,0,0.04)]"
              : file
                ? "border-zinc-700 bg-zinc-900/40"
                : "border-zinc-800 hover:border-zinc-700",
          ].join(" ")}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".apk,application/vnd.android.package-archive"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="sr-only"
            aria-hidden="true"
          />
          {file ? (
            <>
              <svg
                className="mb-3 h-8 w-8 text-[#1eff00]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB — click to change
              </p>
            </>
          ) : (
            <>
              <svg
                className="mb-3 h-8 w-8 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm font-medium text-zinc-300">
                Drop your APK here, or <span className="text-accent">browse</span>
              </p>
              <p className="mt-1 text-xs text-zinc-600">Max 500 MB · .apk only</p>
            </>
          )}
        </div>

        {/* Version metadata */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="version-name"
              className="mb-1.5 block text-xs font-medium text-zinc-400"
            >
              Version Name <span className="text-red-500">*</span>
            </label>
            <input
              id="version-name"
              type="text"
              placeholder="1.0.0"
              value={form.versionName}
              onChange={set("versionName")}
              required
              disabled={uploading}
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="version-code"
              className="mb-1.5 block text-xs font-medium text-zinc-400"
            >
              Version Code <span className="text-red-500">*</span>
            </label>
            <input
              id="version-code"
              type="number"
              min={1}
              placeholder="1"
              value={form.versionCode}
              onChange={set("versionCode")}
              required
              disabled={uploading}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="platform" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Platform <span className="text-red-500">*</span>
            </label>
            <select
              id="platform"
              value={form.platform}
              onChange={set("platform")}
              required
              disabled={uploading}
              className={inputClass}
            >
              <option value="ANDROID">Android</option>
              <option value="IOS">iOS</option>
            </select>
          </div>
          <div>
            <label htmlFor="min-os" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Min OS Version
            </label>
            <input
              id="min-os"
              type="text"
              placeholder="e.g. Android 8.0"
              value={form.minOsVersion}
              onChange={set("minOsVersion")}
              disabled={uploading}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="changelog" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Changelog
          </label>
          <textarea
            id="changelog"
            rows={4}
            placeholder="What's new in this version…"
            value={form.changelog}
            onChange={set("changelog")}
            disabled={uploading}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Upload progress bar */}
        {uploading && (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500">
              <span>Uploading…</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-[#1eff00] transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
          <button
            type="submit"
            disabled={uploading || !file}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? `Uploading… ${uploadProgress}%` : "Upload APK"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={uploading}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadVersionPage;
