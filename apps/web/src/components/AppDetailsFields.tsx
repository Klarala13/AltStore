"use client";

const CATEGORIES = [
  { label: "Productivity", value: "PRODUCTIVITY" },
  { label: "Social", value: "SOCIAL" },
  { label: "Entertainment", value: "ENTERTAINMENT" },
  { label: "Tools", value: "TOOLS" },
  { label: "Education", value: "EDUCATION" },
  { label: "Health", value: "HEALTH" },
  { label: "Finance", value: "FINANCE" },
  { label: "Games", value: "GAMES" },
  { label: "Photography", value: "PHOTOGRAPHY" },
  { label: "Navigation", value: "NAVIGATION" },
  { label: "Other", value: "OTHER" },
];

export const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none";

export const labelClass = "mb-1.5 block text-xs font-medium text-zinc-400";

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export interface AppDetails {
  name: string;
  bundleId: string;
  category: string;
  description: string;
  shortDescription: string;
}

export const EMPTY_APP_DETAILS: AppDetails = {
  name: "",
  bundleId: "",
  category: "TOOLS",
  description: "",
  shortDescription: "",
};

interface AppDetailsFieldsProps {
  form: AppDetails;
  onChange: (field: keyof AppDetails, value: string) => void;
  disabled: boolean;
}

export const AppDetailsFields = ({ form, onChange, disabled }: AppDetailsFieldsProps) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="app-name" className={labelClass}>
          App Name <span className="text-red-500">*</span>
        </label>
        <input
          id="app-name"
          type="text"
          placeholder="My Awesome App"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="bundle-id" className={labelClass}>
          Bundle ID <span className="text-red-500">*</span>
        </label>
        <input
          id="bundle-id"
          type="text"
          placeholder="com.example.myapp"
          value={form.bundleId}
          onChange={(e) => onChange("bundleId", e.target.value)}
          required
          disabled={disabled}
          className={inputClass}
        />
      </div>
    </div>

    <div>
      <label htmlFor="category" className={labelClass}>
        Category <span className="text-red-500">*</span>
      </label>
      <select
        id="category"
        value={form.category}
        onChange={(e) => onChange("category", e.target.value)}
        required
        disabled={disabled}
        className={inputClass}
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="short-desc" className={labelClass}>
        Short Description
      </label>
      <input
        id="short-desc"
        type="text"
        maxLength={120}
        placeholder="One-line pitch (max 120 chars)"
        value={form.shortDescription}
        onChange={(e) => onChange("shortDescription", e.target.value)}
        disabled={disabled}
        className={inputClass}
      />
    </div>

    <div>
      <label htmlFor="description" className={labelClass}>
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        id="description"
        rows={5}
        placeholder="Describe your app in detail…"
        value={form.description}
        onChange={(e) => onChange("description", e.target.value)}
        required
        disabled={disabled}
        className={`${inputClass} resize-none`}
      />
    </div>
  </>
);
