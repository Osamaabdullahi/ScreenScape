import { MOVIE_SEED_IDS } from "@/lib/movieSeed";

// Server-only: OMDB_API_KEY is never exposed to the client. Client
// components that need movie data go through the /api/movies/* routes,
// which import this file and hold the key server-side.
const BASE = "https://www.omdbapi.com/";

export function hasOmdbKey() {
  return Boolean(process.env.OMDB_API_KEY);
}

async function omdbGet(params, { revalidate } = {}) {
  const key = process.env.OMDB_API_KEY;
  if (!key) return null;

  const url = new URL(BASE);
  url.searchParams.set("apikey", key);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    next: revalidate ? { revalidate } : undefined,
    cache: revalidate ? undefined : "no-store",
  });
  if (!res.ok) throw new Error(`OMDb request failed (${res.status})`);
  const data = await res.json();
  if (data.Response === "False") return null;
  return data;
}

export function getMovie(id, { plot = "short" } = {}) {
  return omdbGet({ i: id, plot }, { revalidate: 86400 });
}

export async function searchMovies(query) {
  if (!query?.trim()) return [];
  const data = await omdbGet({ s: query, type: "movie" }, {});
  return data?.Search || [];
}

export async function getMoviePool() {
  const results = await Promise.all(
    MOVIE_SEED_IDS.map((id) => getMovie(id).catch(() => null))
  );
  return results.filter(Boolean);
}
