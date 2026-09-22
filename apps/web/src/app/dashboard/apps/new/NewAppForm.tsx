"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import {
  AppDetailsFields,
  EMPTY_APP_DETAILS,
  slugify,
  type AppDetails,
} from "@/components/AppDetailsFields";

const GENERIC_ERROR = "Something went wrong. Please try again.";
const DEFAULT_ICON_URL = "/icon.svg";
// Se rellena solo en el formulario, asi que no puede ser un dominio escrito a
// mano: el de antes apuntaba a una web que no era la nuestra. Sale de la misma
// variable que el resto del sitio, y si no esta, mejor vacio que mal.
const DEFAULT_PRIVACY_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/privacy`
  : "";

export const NewAppForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<AppDetails>(EMPTY_APP_DETAILS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof AppDetails, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: slugify(form.name),
          bundleId: form.bundleId,
          category: form.category,
          description: form.description,
          shortDesc: form.shortDescription || form.description.slice(0, 120),
          iconUrl: DEFAULT_ICON_URL,
          privacyUrl: DEFAULT_PRIVACY_URL,
        }),
      });

      if (res.status === 409) {
        setError("An app with this Bundle ID already exists.");
        return;
      }
      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        setError(body.message ?? GENERIC_ERROR);
        return;
      }

      const created = (await res.json()) as { id: string };
      router.push(`/dashboard/apps/${created.id}/versions/new` as Route);
      router.refresh();
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AppDetailsFields form={form} onChange={set} disabled={loading} />

        <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit App"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
