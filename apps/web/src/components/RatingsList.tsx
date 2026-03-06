interface RatingItem {
  id: string;
  score: number;
  title: string | null;
  body: string | null;
  userId: string;
  createdAt: string;
}

interface RatingsResponse {
  items: RatingItem[];
  total: number;
  avgRating: number | null;
}

interface Props {
  appSlug: string;
}

async function fetchRatings(appSlug: string): Promise<RatingsResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/apps/${appSlug}/ratings?limit=10`, {
      next: { revalidate: 60 },
      headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "" },
    });
    if (!res.ok) return { items: [], total: 0, avgRating: null };
    return res.json();
  } catch {
    return { items: [], total: 0, avgRating: null };
  }
}

const StarDisplay = ({ score }: { score: number }) => (
  <div className="flex gap-0.5" aria-label={`${score} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill={score >= s ? "#1eff00" : "none"}
        stroke={score >= s ? "#1eff00" : "#52525b"}
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ))}
  </div>
);

export const RatingsList = async ({ appSlug }: Props) => {
  const { items, total, avgRating } = await fetchRatings(appSlug);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-white">Reviews</h2>
        {total > 0 && (
          <div className="flex items-center gap-2">
            {avgRating != null && (
              <span className="text-sm font-semibold text-white">{avgRating.toFixed(1)}</span>
            )}
            <span className="text-sm text-zinc-500">
              {total} review{total !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {items.map((r) => (
            <div key={r.id} className="rounded-2xl border border-zinc-800 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <StarDisplay score={r.score} />
                  {r.title && <p className="mt-2 text-sm font-semibold text-white">{r.title}</p>}
                  {r.body && <p className="mt-1 text-sm leading-6 text-zinc-400">{r.body}</p>}
                </div>
                <time dateTime={r.createdAt} className="flex-shrink-0 text-xs text-zinc-600">
                  {new Date(r.createdAt).toLocaleDateString("en-EU", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
