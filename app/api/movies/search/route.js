import { NextResponse } from "next/server";
import { hasOmdbKey, searchMovies } from "@/lib/omdb";
import { fromMovie } from "@/lib/normalize";

export async function GET(request) {
  if (!hasOmdbKey()) {
    return NextResponse.json({ configured: false, results: [] });
  }

  const q = request.nextUrl.searchParams.get("q") || "";
  try {
    const results = await searchMovies(q);
    return NextResponse.json({
      configured: true,
      results: results.map(fromMovie),
    });
  } catch {
    return NextResponse.json({ configured: true, results: [], error: true });
  }
}
