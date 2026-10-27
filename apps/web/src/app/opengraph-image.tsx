import { ImageResponse } from "next/og";
import { OgMark } from "@/components/og-mark";

/**
 * Imagen que sale al compartir el enlace.
 *
 * Es CUADRADA, y eso es deliberado. La primera version era un banner de
 * 1200x630 con el texto a la izquierda: se lee bien entera y fatal recortada.
 * Y Slack no usa la tarjeta ancha con este sitio — encaja el preview en un
 * cuadradito a la derecha y recorta, asi que el texto salia cortado.
 *
 * Un cuadrado con la marca centrada aguanta los dos casos: en un hueco cuadrado
 * entra sin recortar, y donde se pide 1.91:1 el recorte es al centro, que es
 * justo donde esta el logo.
 */
export const alt = "Appia — European App Marketplace";
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
      <OgMark size={360} />

      <div
        style={{
          display: "flex",
          marginTop: 56,
          fontSize: 150,
          color: "#ffffff",
          letterSpacing: -4,
        }}
      >
        Appia
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 42,
          color: "#1eff00",
          letterSpacing: 6,
        }}
      >
        EU APP MARKETPLACE
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 36,
          fontSize: 40,
          color: "#a2a2b4",
          maxWidth: 900,
        }}
      >
        Android apps, virus-scanned and privacy-first
      </div>
    </div>,
    size
  );
}
