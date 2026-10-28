import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/submissions/:appId/images/upload-url — paso del alta de imagen de ficha.
 *
 * Mismo token de un solo uso que el APK: sin cuenta, pero atado a esa app.
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

  const res = await fetch(`${process.env.API_URL}/submissions/${appId}/images/upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "",
      "X-Forwarded-For": req.headers.get("x-forwarded-for") ?? "",
      "x-upload-token": uploadToken,
    },
    body: JSON.stringify(await req.json()),
  });

  const data: unknown = await res.json().catch(() => ({ message: "Could not upload the image" }));
  return NextResponse.json(data, { status: res.status });
}
