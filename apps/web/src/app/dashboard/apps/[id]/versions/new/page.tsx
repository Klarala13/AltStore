import { use } from "react";
import Link from "next/link";
import type { Route } from "next";
import { UploadVersionForm } from "./UploadVersionForm";

const UploadVersionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: appId } = use(params);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb — static, server-rendered */}
      <div className="mb-6 flex items-center gap-2 text-xs text-zinc-600">
        <Link
          href={`/dashboard/apps/${appId}` as Route}
          className="transition-colors hover:text-zinc-400"
        >
          App Detail
        </Link>
        <span>/</span>
        <span className="text-zinc-400">Upload APK</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Upload APK</h1>
        <p className="mt-1 text-sm text-zinc-500">
          All uploads are scanned by VirusTotal before being made available for download.
        </p>
      </div>

      {/* Interactive upload form — client boundary */}
      <UploadVersionForm appId={appId} />
    </div>
  );
};

export default UploadVersionPage;
