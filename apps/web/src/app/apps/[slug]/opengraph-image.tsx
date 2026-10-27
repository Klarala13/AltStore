import { ImageResponse } from "next/og";
import { OgMark } from "@/components/og-mark";

/**
 * Preview al compartir la ficha de una app.
 *
 * Cuadrada por el mismo motivo que la del sitio: Slack recorta a un cuadradito
 * y un banner ancho con texto se vuelve ilegible. Aqui manda el nombre de la
 * app, que es lo que se comparte.
 *
 * Antes se usaba `app.iconUrl`, que son SVG, y ningun servicio de previews
 * renderiza SVG: salia el mismo hueco gris que si no hubiera imagen.
 */
export const alt = "App on Appia";
export const size = { width: 1200, height: 1200 };
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
        alignItems: "center",
        justifyContent: "center",
        background: "#08080d",
        backgroundImage:
          "radial-gradient(55% 45% at 50% 42%, rgba(30,255,0,0.20) 0%, transparent 70%)",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: 100,
      }}
    >
      <OgMark size={200} />

      <div
        style={{
          display: "flex",
          marginTop: 30,
          fontSize: 34,
          color: "#1eff00",
          letterSpacing: 6,
        }}
      >
        {(app?.category ?? "APP").toUpperCase()} · APPIA
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 30,
          fontSize: 104,
          color: "#ffffff",
          letterSpacing: -3,
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        {app?.name ?? slug}
      </div>

      {app?.shortDesc ? (
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 42,
            color: "#a2a2b4",
            lineHeight: 1.3,
            maxWidth: 950,
          }}
        >
          {app.shortDesc}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 32,
          color: "#6e6e82",
        }}
      >
        {app ? `v${app.latestVersion} · ${app.latestFileSize} · ` : ""}Virus-scanned
      </div>
    </div>,
    size
  );
}
