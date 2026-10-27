import { ImageResponse } from "next/og";

/**
 * Imagen que sale al compartir el enlace en Slack, WhatsApp o Twitter.
 *
 * Se genera en PNG a proposito. Antes no habia ninguna, asi que los previews
 * mostraban un hueco gris; y las fichas de app apuntaban a su `icon.svg`, que
 * da el mismo hueco porque **ningun servicio de previews renderiza SVG**.
 *
 * Se dibuja con los colores del sitio y sin cargar fuentes externas: una fuente
 * remota es un punto de fallo mas, y si falla no hay imagen.
 */
export const alt = "Appia — European App Marketplace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        // El resplandor verde es el mismo gesto que el hero de la home.
        backgroundImage:
          "radial-gradient(60% 55% at 50% 0%, rgba(30,255,0,0.16) 0%, transparent 70%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#1eff00",
        }}
      >
        EU App Marketplace
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 120,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: -4,
        }}
      >
        Appia
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 20,
          fontSize: 38,
          lineHeight: 1.3,
          color: "#a2a2b4",
          maxWidth: 900,
        }}
      >
        Android apps, virus-scanned and privacy-first. Built for the EU under the DMA.
      </div>

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
        <div style={{ display: "flex" }}>Every upload scanned · Zero trackers · €0 to publish</div>
      </div>
    </div>,
    size
  );
}
