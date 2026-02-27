import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/register
 *
 * Thin proxy to NestJS POST /auth/register.
 * Keeps the NestJS API URL server-side only (never exposed to the browser).
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: unknown = await req.json();

  const res = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json();

  return NextResponse.json(data, { status: res.status });
}
