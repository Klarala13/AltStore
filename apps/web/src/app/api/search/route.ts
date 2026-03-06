import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const upstream = new URL(`${process.env.API_URL}/apps/search`);

  // Forward all search params as-is
  searchParams.forEach((value, key) => upstream.searchParams.set(key, value));

  const res = await fetch(upstream.toString(), {
    headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "" },
    next: { revalidate: 0 }, // Search results should not be cached
  });

  if (!res.ok) {
    return NextResponse.json({ items: [], total: 0, page: 1, limit: 40 }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
