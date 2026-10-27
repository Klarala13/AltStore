import { ImageResponse } from "next/og";

/**
 * Preview al compartir la ficha de una app.
 *
 * Antes se usaba `app.iconUrl` como imagen de Open Graph, y eso no podia
 * funcionar: son SVG, y **ningun servicio de previews renderiza SVG**. Slack,
 * WhatsApp y Twitter pintan un hueco gris. Esto genera un PNG de verdad.
 */
export const alt = "App on Appia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface AppSummary {
  name: string;
  shortDesc: string;
  category: string;
  latestVersion: string;
  latestFileSize: string;
}

async function getApp(slug: string): Promise<AppSummary | null> {
  if (!process.env.API_URL) return null;
  try {
    const res = await fetch(`${process.env.API_URL}/apps/${slug}`, {
      next: { revalidate: 300 },
      headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "" },
    });
    if (!res.ok) return null;
    return (await res.json()) as AppSummary;
  } catch {
    // Si el API no contesta seguimos dibujando algo: un preview generico es
    // mejor que un 500 al compartir un enlace.
    return null;
  }
}

export default async function AppOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getApp(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#08080d",
        backgroundImage:
          "radial-gradient(60% 55% at 50% 0%, rgba(30,255,0,0.16) 0%, transparent 70%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#1eff00",
        }}
      >
        {app?.category ?? "App"} · Appia
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 92,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: -3,
        }}
      >
        {app?.name ?? slug}
      </div>

      {app?.shortDesc ? (
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 36,
            lineHeight: 1.3,
            color: "#a2a2b4",
            maxWidth: 950,
          }}
        >
          {app.shortDesc}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          marginTop: 56,
          gap: 20,
          alignItems: "center",
          fontSize: 26,
          color: "#6e6e82",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 16,
            height: 16,
            borderRadius: 8,
            background: "#1eff00",
          }}
        />
        <div style={{ display: "flex" }}>
          {app ? `v${app.latestVersion} · ${app.latestFileSize} · ` : ""}Virus-scanned before
          publishing
        </div>
      </div>
    </div>,
    size
  );
}
