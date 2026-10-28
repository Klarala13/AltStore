import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/images/:appId/:file — sirve el icono y las capturas de una ficha.
 *
 * Los objetos viven en un bucket privado, asi que no se pueden enlazar a pelo.
 * Esta ruta pide al API una URL firmada y devuelve los bytes. Como la clave
 * lleva un UUID, el contenido de una URL no cambia nunca: se marca `immutable`
 * y la CDN de Vercel la sirve sin volver a tocar el almacen.
 *
 * Por que un proxy y no un bucket publico: no hace falta tocar la
 * configuracion de Cloudflare, y lo que se guarda en la base de datos es una
 * ruta relativa, asi que el dia que Appia tenga dominio propio las fichas no
 * se quedan apuntando a appia-nu.vercel.app.
 */

const CONTENT_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
};

const CACHE_FOREVER = "public, max-age=31536000, immutable";

const notFound = () => new NextResponse("Not found", { status: 404 });

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse | Response> {
  if (!process.env.API_URL) {
    return NextResponse.json({ message: "API_URL is not configured" }, { status: 500 });
  }

  const { path } = await params;
  if (path.length !== 2) return notFound();

  const [appId, file] = path;
  const contentType = CONTENT_TYPES[file.split(".").pop() ?? ""];
  if (!contentType) return notFound();

  try {
    const signed = await fetch(`${process.env.API_URL}/images/${appId}/${file}`, {
      headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "" },
    });
    if (!signed.ok) return notFound();

    const { url } = (await signed.json()) as { url: string };
    const upstream = await fetch(url);
    if (!upstream.ok || !upstream.body) return notFound();

    return new Response(upstream.body, {
      headers: {
        // El tipo sale de NUESTRA lista, no de lo que diga el almacen, y con
        // nosniff: una imagen subida por cualquiera no puede acabar
        // interpretandose como HTML en nuestro propio dominio.
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "Cache-Control": CACHE_FOREVER,
      },
    });
  } catch {
    return notFound();
  }
}
