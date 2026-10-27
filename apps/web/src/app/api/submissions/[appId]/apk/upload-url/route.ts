import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/submissions/:appId/apk/upload-url — pide la URL firmada.
 *
 * Solo mueve JSON, asi que cabe de sobra en una funcion de Vercel. El APK no
 * pasa por aqui: va del navegador a R2 directamente, porque el cuerpo de una
 * funcion esta limitado a 4,5 MB y ningun APK real cabe.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
): Promise<NextResponse> {
  if (!process.env.API_URL) {
    return NextResponse.json({ message: "API_URL is not configured" }, { status: 500 });
  }

  const { appId } = await params;
  const uploadToken = req.headers.get("x-upload-token");
  if (!uploadToken) {
    return NextResponse.json({ message: "Missing upload token" }, { status: 400 });
  }

  const res = await fetch(`${process.env.API_URL}/submissions/${appId}/apk/upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "",
      "X-Forwarded-For": req.headers.get("x-forwarded-for") ?? "",
      "x-upload-token": uploadToken,
    },
  });

  const data: unknown = await res.json().catch(() => ({ message: "Could not start the upload" }));
  return NextResponse.json(data, { status: res.status });
}
