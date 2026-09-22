import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * POST /api/submissions/:appId/apk — uploads the APK for a submission.
 *
 * The multipart body is streamed straight through; re-parsing a 500 MB upload
 * here would only buffer it twice. Authorisation is the one-shot token the
 * submit step returned, not a session.
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

  const res = await fetch(`${process.env.API_URL}/submissions/${appId}/apk`, {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("content-type") ?? "",
      "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "",
      "X-Forwarded-For": req.headers.get("x-forwarded-for") ?? "",
      "x-upload-token": uploadToken,
    },
    body: await req.arrayBuffer(),
  });

  const data: unknown = await res.json().catch(() => ({ message: "Upload failed" }));
  return NextResponse.json(data, { status: res.status });
}
