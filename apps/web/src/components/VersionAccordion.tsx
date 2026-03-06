"use client";

import { useState } from "react";
import type { VersionListItemDto } from "@altstore/types";

interface Props {
  versions: VersionListItemDto[];
}

export const VersionAccordion = ({ versions }: Props) => {
  const [openId, setOpenId] = useState<string | null>(versions[0]?.id ?? null);

  if (versions.length === 0) {
    return <p className="p-5 text-sm text-zinc-500">No approved versions yet.</p>;
  }

  return (
    <div className="divide-y divide-zinc-800 overflow-hidden rounded-2xl border border-zinc-800">
      {versions.map((v, i) => {
        const isOpen = openId === v.id;
        return (
          <div key={v.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : v.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-white">
                  v{v.versionName}
                </span>
                {i === 0 && <span className="badge-accent text-xs">Latest</span>}
                {v.fileSizeDelta && (
                  <span
                    className="text-xs"
                    style={{ color: v.sizeTrend === "larger" ? "#f87171" : "#4ade80" }}
                  >
                    {v.fileSizeDelta}
                  </span>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                <span className="text-xs text-zinc-500">{v.fileSize}</span>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className={`text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-zinc-800/60 px-5 pb-5 pt-4">
                <p className="text-sm leading-6 text-zinc-400">{v.changelog}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-zinc-600">
                    {v.minOs}
                    {v.publishedAt && (
                      <>
                        {" "}
                        &middot;{" "}
                        {new Date(v.publishedAt).toLocaleDateString("en-EU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    aria-disabled="true"
                    title="Download coming soon"
                    className="btn-secondary cursor-not-allowed px-4 py-2 text-xs opacity-60"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
