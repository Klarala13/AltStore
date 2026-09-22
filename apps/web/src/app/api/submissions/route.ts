import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/submissions — accountless app submission.
 *
 * Thin proxy to NestJS POST /submissions. Keeps the API URL server-side, and
 * forwards the caller's address so the API can rate-limit by client rather than
 * seeing every submission arrive from Vercel.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!process.env.API_URL) {
    return NextResponse.json({ message: "API_URL is not configured" }, { status: 500 });
  }

  const body: unknown = await req.json();

  const res = await fetch(`${process.env.API_URL}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "",
      "X-Forwarded-For": req.headers.get("x-forwarded-for") ?? "",
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json();
  return NextResponse.json(data, { status: res.status });
}
