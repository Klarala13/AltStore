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
import { getDefaultPrivacyUrl } from "@/lib/site-url";
import { FormError } from "@/components/FormError";
import { ImagePicker } from "@/components/ImagePicker";
import { ImageUploadError, MAX_SCREENSHOTS, uploadAppImages } from "@/lib/upload-image";

const GENERIC_ERROR = "Something went wrong. Please try again.";

/** Hasta que se suba el icono de verdad, la ficha lleva el de la tienda. */
const DEFAULT_ICON_URL = "/icon.svg";
// privacyUrl se manda sin pintarlo en el formulario, asi que su valor por
// defecto vive en getDefaultPrivacyUrl(). Aqui decia «si no esta, mejor vacio
// que mal» — y vacio resulto ser peor: el DTO lo exige con @IsUrl() y el alta
// fallaba entera.

export const NewAppForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<AppDetails>(EMPTY_APP_DETAILS);
  const [icon, setIcon] = useState<File[]>([]);
  const [screenshots, setScreenshots] = useState<File[]>([]);
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
          privacyUrl: getDefaultPrivacyUrl(),
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

      // Las imagenes cuelgan de la app, asi que solo pueden subir una vez
      // existe el registro. Si fallan, la app ya esta creada: se avisa y se
      // queda en el formulario en vez de saltar a la pantalla siguiente.
      await uploadAppImages(
        { basePath: `/api/apps/${created.id}/images` },
        { icon: icon[0], screenshots }
      );

      router.push(`/dashboard/apps/${created.id}/versions/new` as Route);
      router.refresh();
    } catch (err) {
      setError(err instanceof ImageUploadError ? err.message : GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormError message={error} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AppDetailsFields form={form} onChange={set} disabled={loading} />

        <ImagePicker
          id="icon"
          label="App icon"
          hint="Shown in the catalogue and on the listing. Square works best."
          kind="icon"
          files={icon}
          onChange={setIcon}
          max={1}
          disabled={loading}
        />

        <ImagePicker
          id="screenshots"
          label="Screenshots"
          hint="Shown on the listing page."
          kind="screenshot"
          files={screenshots}
          onChange={setScreenshots}
          max={MAX_SCREENSHOTS}
          disabled={loading}
        />

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
