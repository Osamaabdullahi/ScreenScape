import { NextResponse } from "next/server";
import { getMoviePool, hasOmdbKey } from "@/lib/omdb";
import { fromMovie } from "@/lib/normalize";

export const revalidate = 86400;

export async function GET() {
  if (!hasOmdbKey()) {
    return NextResponse.json({ configured: false, results: [] });
  }

  try {
    const pool = await getMoviePool();
    return NextResponse.json({ configured: true, results: pool.map(fromMovie) });
  } catch {
    return NextResponse.json({ configured: true, results: [], error: true });
  }
}
