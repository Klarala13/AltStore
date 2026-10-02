"use client";

import { useDownloadRequest } from "@/hooks/useDownloadRequest";

const VersionDownloadButton = ({ versionId }: { versionId: string }) => {
  const { loading, error, download } = useDownloadRequest(versionId);

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={download}
        disabled={loading}
        className="btn-secondary px-4 py-2 text-xs disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Preparing…" : "Download"}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export { VersionDownloadButton };
