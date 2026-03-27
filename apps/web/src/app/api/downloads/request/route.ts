import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as { versionId?: string; userId?: string };

  if (!body.versionId) {
    return NextResponse.json({ message: "versionId is required" }, { status: 400 });
  }

  const res = await fetch(`${process.env.API_URL}/downloads/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "",
    },
    body: JSON.stringify({ versionId: body.versionId, userId: body.userId }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({ message: "Unexpected response" }));
  return NextResponse.json(data, { status: res.status });
}
