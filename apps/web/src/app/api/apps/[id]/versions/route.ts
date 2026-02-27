import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/apps/[id]/versions
 *
 * Streams the multipart form data (APK + metadata) straight through to
 * NestJS POST /apps/:appId/versions without buffering the entire file in
 * the Next.js process memory.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const accessToken = (session as { accessToken?: string }).accessToken;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Forward the raw multipart body as-is so NestJS FileInterceptor can parse it
  const contentType = req.headers.get("content-type") ?? "";
  const res = await fetch(`${process.env.API_URL}/apps/${id}/versions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // Pass content-type (with boundary) through unchanged
      ...(contentType ? { "content-type": contentType } : {}),
    },
    body: req.body,
    // @ts-expect-error — Next.js fetch supports duplex but TS types lag behind
    duplex: "half",
  });

  const data: unknown = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// Disable Next.js body parsing — we stream the raw multipart body
export const config = { api: { bodyParser: false } };
