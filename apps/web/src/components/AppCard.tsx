import type { AppCardDto } from "@altstore/types";

const AppCard = ({
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
    className="app-card group block rounded-2xl p-5"
  >
    <div
      className="mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-base font-semibold" style={{ color: "#555" }}>
          {name.charAt(0)}
        </span>
      )}
    </div>

    <p className="mb-1 text-xs font-medium uppercase tracking-wider" style={{ color: "#555" }}>
      {category}
    </p>

    <h3
      className="text-sm font-semibold transition-colors duration-150 group-hover:text-white"
      style={{ color: "#d0d0d0" }}
    >
      {name}
    </h3>

    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed" style={{ color: "#666" }}>
      {shortDesc}
    </p>

    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs" style={{ color: "#444" }}>
        {platform === "BOTH" ? "Android · iOS" : platform === "ANDROID" ? "Android" : "iOS"}
      </span>
      <span className="text-xs" style={{ color: "#444" }}>
        {latestVersion && `v${latestVersion}`}
        {latestFileSize && ` · ${latestFileSize}`}
      </span>
    </div>
  </a>
);

export { AppCard };
