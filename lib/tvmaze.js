// Thin wrapper around the public TVmaze API (https://api.tvmaze.com).
// TVmaze covers TV shows only — there is no film catalogue in this API,
// so ScreenScape is scoped to television.

const BASE = "https://api.tvmaze.com";

async function get(path, { revalidate } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    next: revalidate ? { revalidate } : undefined,
    cache: revalidate ? undefined : "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`TVmaze request failed: ${path} (${res.status})`);
  return res.json();
}

export function searchShows(query) {
  if (!query?.trim()) return Promise.resolve([]);
  return get(`/search/shows?q=${encodeURIComponent(query)}`);
}

export function getShow(id, embed) {
  const q = embed ? `?embed=${embed}` : "";
  return get(`/shows/${id}${q}`);
}

export function getShowEpisodes(id) {
  return get(`/shows/${id}/episodes`) ?? [];
}

export function getShowCast(id) {
  return get(`/shows/${id}/cast`) ?? [];
}

export function getShowIndexPage(page = 0) {
  return get(`/shows?page=${page}`, { revalidate: 3600 }) ?? [];
}

export function getSchedule(country = "US", date) {
  const d = date ? `&date=${date}` : "";
  return get(`/schedule?country=${country}${d}`) ?? [];
}

export function getWebSchedule(date) {
  const d = date ? `?date=${date}` : "";
  return get(`/schedule/web${d}`) ?? [];
}

// Pulls a handful of index pages and merges them into one pool, used for
// genre browsing and the recommendation tool since TVmaze has no genre
// search endpoint of its own. Pages are cached for an hour server-side.
export async function getShowPool(pages = 4) {
  const results = await Promise.all(
    Array.from({ length: pages }, (_, i) => getShowIndexPage(i).catch(() => []))
  );
  const seen = new Map();
  for (const page of results) {
    for (const show of page) {
      if (show?.id != null) seen.set(show.id, show);
    }
  }
  return Array.from(seen.values());
}

export function ratingOf(show) {
  return typeof show?.rating?.average === "number" ? show.rating.average : 0;
}

export function yearOf(show) {
  return show?.premiered ? show.premiered.slice(0, 4) : null;
}

export function stripTags(html) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").trim();
}
