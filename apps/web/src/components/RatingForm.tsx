"use client";

import { useState } from "react";

interface Props {
  appSlug: string;
}

const STARS = [1, 2, 3, 4, 5];

export const RatingForm = ({ appSlug }: Props) => {
  const [score, setScore] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    if (score === 0) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/ratings/${appSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, title: title || undefined, body: body || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Failed to submit rating");
      }
      setStatus("success");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-white/[0.02] p-6 text-center">
        <p className="text-sm font-semibold text-white">Thanks for your review!</p>
        <p className="mt-1 text-sm text-zinc-500">Your rating has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-white/[0.02] p-6">
      <p className="mb-4 text-sm font-semibold text-white">Rate this app</p>

      {/* Star picker */}
      <div
        className="flex gap-1"
        onMouseLeave={() => setHovered(0)}
        role="group"
        aria-label="Star rating"
      >
        {STARS.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`${s} star${s !== 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(s)}
            onClick={() => setScore(s)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={(hovered || score) >= s ? "#1eff00" : "none"}
              stroke={(hovered || score) >= s ? "#1eff00" : "#52525b"}
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        ))}
      </div>

      {score > 0 && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            maxLength={120}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your review… (optional)"
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
          />
        </div>
      )}

      {status === "error" && <p className="mt-3 text-xs text-red-400">{errorMsg}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={score === 0 || status === "loading"}
        className="btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Submitting…" : "Submit Review"}
      </button>
    </div>
  );
};
