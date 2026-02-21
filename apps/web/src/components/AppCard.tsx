import type { AppCardDto } from "@altstore/types";

export const AppCard = ({
  slug,
  name,
  category,
  iconUrl,
  shortDesc,
  platform,
  latestVersion,
  latestFileSize,
}: AppCardDto) => (
  <a
    href={`/apps/${slug}`}
    className="group block rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300"
  >
    {/* Icon */}
    <div className="mb-4 h-14 w-14 overflow-hidden rounded-xl bg-gray-100">
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-gray-200" />
      )}
    </div>

    {/* Meta */}
    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{category}</p>
    <h3 className="mt-1 text-base font-semibold text-gray-900 group-hover:text-gray-700">
      {name}
    </h3>
    <p className="mt-1 line-clamp-2 text-sm text-gray-500">{shortDesc}</p>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs text-gray-400">
        {platform === "BOTH" ? "Android · iOS" : platform === "ANDROID" ? "Android" : "iOS"}
      </span>
      <span className="text-xs text-gray-400">
        {latestVersion && `v${latestVersion}`}
        {latestFileSize && ` · ${latestFileSize}`}
      </span>
    </div>
  </a>
);
