"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORIES = [
  "Productivity",
  "Utilities",
  "Entertainment",
  "Social",
  "Finance",
  "Health & Fitness",
  "Education",
  "Games",
  "News",
  "Travel",
  "Shopping",
  "Other",
];

const GENERIC_ERROR = "Something went wrong. Please try again.";

// ---------------------------------------------------------------------------
// Shared input class
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none";

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

interface FormState {
  name: string;
  bundleId: string;
  category: string;
  description: string;
  shortDescription: string;
  iconUrl: string;
  privacyUrl: string;
  websiteUrl: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  bundleId: "",
  category: "Utilities",
  description: "",
  shortDescription: "",
  iconUrl: "",
  privacyUrl: "",
  websiteUrl: "",
};

const NewAppPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
          bundleId: form.bundleId,
          category: form.category,
          description: form.description,
          shortDescription: form.shortDescription || undefined,
          iconUrl: form.iconUrl || undefined,
          privacyUrl: form.privacyUrl,
          websiteUrl: form.websiteUrl || undefined,
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
      router.push(`/dashboard/apps/${created.id}` as Route);
      router.refresh();
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Submit New App</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Fill in your app details. A privacy policy URL is required for GDPR compliance.
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
        {/* App name + Bundle ID */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="app-name" className="mb-1.5 block text-xs font-medium text-zinc-400">
              App Name <span className="text-red-500">*</span>
            </label>
            <input
              id="app-name"
              type="text"
              placeholder="My Awesome App"
              value={form.name}
              onChange={set("name")}
              required
              disabled={loading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="bundle-id" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Bundle ID <span className="text-red-500">*</span>
            </label>
            <input
              id="bundle-id"
              type="text"
              placeholder="com.example.myapp"
              value={form.bundleId}
              onChange={set("bundleId")}
              required
              disabled={loading}
              className={inputClass}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={form.category}
            onChange={set("category")}
            required
            disabled={loading}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Short description */}
        <div>
          <label htmlFor="short-desc" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Short Description
          </label>
          <input
            id="short-desc"
            type="text"
            maxLength={120}
            placeholder="One-line pitch (max 120 chars)"
            value={form.shortDescription}
            onChange={set("shortDescription")}
            disabled={loading}
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Describe your app in detail…"
            value={form.description}
            onChange={set("description")}
            required
            disabled={loading}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Icon URL */}
        <div>
          <label htmlFor="icon-url" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Icon URL
          </label>
          <input
            id="icon-url"
            type="url"
            placeholder="https://example.com/icon.png"
            value={form.iconUrl}
            onChange={set("iconUrl")}
            disabled={loading}
            className={inputClass}
          />
        </div>

        {/* Privacy URL + Website URL */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="privacy-url" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Privacy Policy URL <span className="text-red-500">*</span>
            </label>
            <input
              id="privacy-url"
              type="url"
              placeholder="https://example.com/privacy"
              value={form.privacyUrl}
              onChange={set("privacyUrl")}
              required
              disabled={loading}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-zinc-600">Required for GDPR compliance.</p>
          </div>
          <div>
            <label htmlFor="website-url" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Website URL
            </label>
            <input
              id="website-url"
              type="url"
              placeholder="https://example.com"
              value={form.websiteUrl}
              onChange={set("websiteUrl")}
              disabled={loading}
              className={inputClass}
            />
          </div>
        </div>

        {/* Actions */}
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
    </div>
  );
};

export default NewAppPage;
