"use client";

import { useRef, useState } from "react";

interface DownloadPayload {
  signedUrl: string;
  qrCode: string;
}

// The API signs URLs for 300s; refresh a bit earlier so a click never hits an expired link.
const PAYLOAD_MAX_AGE_MS = 4 * 60 * 1000;

const useDownloadRequest = (versionId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<DownloadPayload | null>(null);
  const fetchedAt = useRef(0);

  const request = async (): Promise<DownloadPayload | null> => {
    if (payload && Date.now() - fetchedAt.current < PAYLOAD_MAX_AGE_MS) return payload;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/downloads/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId }),
      });

      const data = (await res.json()) as Partial<DownloadPayload> & { message?: string };
      if (!res.ok || !data.signedUrl || !data.qrCode) {
        throw new Error(data.message ?? "Download unavailable");
      }

      const result: DownloadPayload = { signedUrl: data.signedUrl, qrCode: data.qrCode };
      fetchedAt.current = Date.now();
      setPayload(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download unavailable");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Same-tab navigation: window.open after an await is blocked as a popup by most browsers,
  // and the APK response downloads without leaving the page anyway.
  const download = async (): Promise<boolean> => {
    const result = await request();
    if (!result) return false;
    window.location.assign(result.signedUrl);
    return true;
  };

  return { loading, error, payload, request, download };
};

export { useDownloadRequest };
export type { DownloadPayload };
