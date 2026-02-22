"use client";

import { useState, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AppCardDto } from "@altstore/types";

const TILT_THRESHOLD = 12;

const StarRating = ({ rating }: { rating: number }) => {
  const uid = useId();
  const gradientId = `half-fill-${uid.replace(/:/g, "")}`;

  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`f${i}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="#facc15"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {hasHalf && (
        <svg key="half" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#3f3f46" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`e${i}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="#3f3f46"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-zinc-500">{rating.toFixed(1)}</span>
    </span>
  );
};

const AppCard = ({
  slug,
  name,
  category,
  iconUrl,
  coverUrl,
  shortDesc,
  platform,
  latestVersion,
  rating,
}: AppCardDto) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Respect prefers-reduced-motion — check at event time so SSR is safe
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -TILT_THRESHOLD, y: x * TILT_THRESHOLD });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const isResting = tilt.x === 0 && tilt.y === 0;

  return (
    <Link
      href={`/apps/${slug}`}
      className="block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl transition-colors duration-200 hover:border-zinc-700"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isResting
          ? "transform 0.4s ease-out, border-color 0.2s ease"
          : "transform 0.1s ease-out, border-color 0.2s ease",
        willChange: "transform",
      }}
    >
      {/* Cover image */}
      <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(30,255,0,0.08) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <span className="font-display text-5xl font-bold text-zinc-700" aria-hidden="true">
              {name.charAt(0)}
            </span>
          </div>
        )}
        {/* Category pill overlay */}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Icon + name row */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
            {iconUrl ? (
              <Image src={iconUrl} alt="" fill sizes="36px" className="object-cover" />
            ) : (
              <span
                className="font-display flex h-full w-full items-center justify-center text-xs font-bold text-zinc-400"
                aria-hidden="true"
              >
                {name.charAt(0)}
              </span>
            )}
          </div>
          <h3 className="font-display text-sm font-semibold text-white">{name}</h3>
        </div>

        {/* Description */}
        <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-zinc-500">{shortDesc}</p>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          {rating != null ? (
            <StarRating rating={rating} />
          ) : (
            <span className="text-xs text-zinc-600">
              {platform === "BOTH" ? "Android · iOS" : platform === "ANDROID" ? "Android" : "iOS"}
            </span>
          )}
          {latestVersion && (
            <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-600">
              v{latestVersion}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export { AppCard };
