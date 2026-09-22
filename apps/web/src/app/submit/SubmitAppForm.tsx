"use client";

import { useState } from "react";
import {
  AppDetailsFields,
  EMPTY_APP_DETAILS,
  inputClass,
  labelClass,
  slugify,
  type AppDetails,
} from "@/components/AppDetailsFields";

const GENERIC_ERROR = "Something went wrong. Please try again.";
const DEFAULT_ICON_URL = "/icon.svg";
const DEFAULT_PRIVACY_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/privacy`
  : "";

interface Submitter {
  email: string;
  name: string;
  type: string;
  country: string;
}

const EMPTY_SUBMITTER: Submitter = { email: "", name: "", type: "INDIVIDUAL", country: "ES" };

export const SubmitAppForm = () => {
  const [app, setApp] = useState<AppDetails>(EMPTY_APP_DETAILS);
  const [submitter, setSubmitter] = useState<Submitter>(EMPTY_SUBMITTER);
  const [file, setFile] = useState<File | null>(null);
  const [versionName, setVersionName] = useState("1.0.0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const setAppField = (field: keyof AppDetails, value: string) =>
    setApp((prev) => ({ ...prev, [field]: value }));

  const setSubmitterField = (field: keyof Submitter) => (value: string) =>
    setSubmitter((prev) => ({ ...prev, [field]: value }));

  const readError = async (res: Response) => {
    const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    if (!body?.message) return GENERIC_ERROR;
    return Array.isArray(body.message) ? body.message.join(". ") : body.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Attach the APK file before submitting.");
      return;
    }

    setLoading(true);
    try {
      const created = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: app.name,
          slug: slugify(app.name),
          bundleId: app.bundleId,
          category: app.category,
          description: app.description,
          shortDesc: app.shortDescription || app.description.slice(0, 120),
          iconUrl: DEFAULT_ICON_URL,
          privacyUrl: DEFAULT_PRIVACY_URL,
          submitterEmail: submitter.email,
          submitterName: submitter.name,
          submitterType: submitter.type,
          submitterCountry: submitter.country,
        }),
      });

      if (!created.ok) {
        setError(await readError(created));
        return;
      }

      const { appId, uploadToken } = (await created.json()) as {
        appId: string;
        uploadToken: string;
      };

      // The APK needs an app to hang off, so it can only go up once the record exists.
      const body = new FormData();
      body.append("file", file);
      body.append("versionName", versionName);
      body.append("versionCode", "1");
      body.append("platform", "ANDROID");
      body.append("changelog", "First submission");
      body.append("minOs", "8.0");

      const uploaded = await fetch(`/api/submissions/${appId}/apk`, {
        method: "POST",
        headers: { "x-upload-token": uploadToken },
        body,
      });

      if (!uploaded.ok) {
        setError(await readError(uploaded));
        return;
      }

      setDone(true);
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="font-display text-xl font-semibold text-white">Submission received</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Your APK is being scanned for malware. Once it passes and we have reviewed the listing,
          the app goes live. We will write to {submitter.email} either way.
        </p>
      </div>
    );
  }

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
        <AppDetailsFields form={app} onChange={setAppField} disabled={loading} />

        <div>
          <label htmlFor="apk" className={labelClass}>
            APK file <span className="text-red-500">*</span>
          </label>
          <input
            id="apk"
            type="file"
            accept=".apk,application/vnd.android.package-archive"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            disabled={loading}
            className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-zinc-800 file:px-3 file:py-1 file:text-zinc-300`}
          />
        </div>

        <div>
          <label htmlFor="version-name" className={labelClass}>
            Version <span className="text-red-500">*</span>
          </label>
          <input
            id="version-name"
            type="text"
            placeholder="1.0.0"
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            required
            disabled={loading}
            className={inputClass}
          />
        </div>

        <fieldset className="border-t border-zinc-800 pt-6">
          <legend className="text-sm font-semibold text-white">Who is submitting</legend>
          <p className="mb-4 mt-1 text-xs text-zinc-500">
            No account and no password. We need a contact for the app you publish.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="submitter-email" className={labelClass}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="submitter-email"
                type="email"
                placeholder="you@example.com"
                value={submitter.email}
                onChange={(e) => setSubmitterField("email")(e.target.value)}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="submitter-name" className={labelClass}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="submitter-name"
                type="text"
                placeholder="Your name or company"
                value={submitter.name}
                onChange={(e) => setSubmitterField("name")(e.target.value)}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="submitter-type" className={labelClass}>
                You are <span className="text-red-500">*</span>
              </label>
              <select
                id="submitter-type"
                value={submitter.type}
                onChange={(e) => setSubmitterField("type")(e.target.value)}
                disabled={loading}
                className={inputClass}
              >
                <option value="INDIVIDUAL">An individual</option>
                <option value="COMPANY">A company</option>
              </select>
            </div>
            <div>
              <label htmlFor="submitter-country" className={labelClass}>
                Country <span className="text-red-500">*</span>
              </label>
              <input
                id="submitter-country"
                type="text"
                maxLength={2}
                placeholder="ES"
                value={submitter.country}
                onChange={(e) => setSubmitterField("country")(e.target.value.toUpperCase())}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Uploading…" : "Submit app"}
          </button>
        </div>
      </form>
    </>
  );
};
