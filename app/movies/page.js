import Link from "next/link";
import clsx from "clsx";
import MediaGrid from "@/component/MediaGrid";
import { MOVIE_GENRES } from "@/lib/movieGenres";
import { getMoviePool, hasOmdbKey } from "@/lib/omdb";
import { fromMovie } from "@/lib/normalize";

export const dynamic = "force-dynamic";

export const metadata = { title: "Movies" };

export default async function MoviesPage({ searchParams }) {
  const genre = searchParams?.genre || "";
  const sort = searchParams?.sort === "name" ? "name" : "rating";
  const configured = hasOmdbKey();

  const pool = configured ? await getMoviePool().catch(() => []) : [];
  let items = pool.map(fromMovie).filter((m) => m.poster);
  if (genre) items = items.filter((m) => m.genres?.includes(genre));

  items =
    sort === "name"
      ? [...items].sort((a, b) => a.name.localeCompare(b.name))
      : [...items].sort((a, b) => b.rating - a.rating);

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <p className="eyebrow mb-2 text-paper-dim">Film catalogue</p>
      <h1 className="font-display text-3xl text-paper">{genre ? genre : "All films"}</h1>

      {!configured ? (
        <div className="mt-8 border border-dashed border-ink-line px-6 py-10 text-center">
          <p className="eyebrow mb-2 text-gold">Films not connected</p>
          <p className="mx-auto max-w-sm text-paper-dim">
            Add an OMDb API key to <code className="font-mono text-paper">.env.local</code> as{" "}
            <code className="font-mono text-paper">OMDB_API_KEY</code>, then restart the dev
            server to browse films.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-2 text-paper-dim">
            {items.length.toLocaleString()} films{genre ? ` tagged ${genre}` : ""} from a curated
            OMDb selection — OMDb has no full catalogue index, so this list grows as titles are
            added to the seed list.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-ink-line py-4">
            <Link
              href="/movies"
              className={clsx(
                "eyebrow rounded-sm border px-3 py-1.5",
                !genre ? "border-gold text-paper" : "border-ink-line text-paper-dim hover:text-paper"
              )}
            >
              All
            </Link>
            {MOVIE_GENRES.map((g) => (
              <Link
                key={g}
                href={`/movies?genre=${encodeURIComponent(g)}${sort === "name" ? "&sort=name" : ""}`}
                className={clsx(
                  "eyebrow rounded-sm border px-3 py-1.5",
                  genre === g ? "border-gold text-paper" : "border-ink-line text-paper-dim hover:text-paper"
                )}
              >
                {g}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <Link
              href={`/movies?${genre ? `genre=${encodeURIComponent(genre)}&` : ""}sort=rating`}
              className={clsx("eyebrow", sort === "rating" ? "text-paper" : "text-paper-dim hover:text-paper")}
            >
              Highest rated
            </Link>
            <Link
              href={`/movies?${genre ? `genre=${encodeURIComponent(genre)}&` : ""}sort=name`}
              className={clsx("eyebrow", sort === "name" ? "text-paper" : "text-paper-dim hover:text-paper")}
            >
              A–Z
            </Link>
          </div>

          <div className="mt-8">
            <MediaGrid items={items} emptyMessage="Nothing matches that filter yet — try a different genre." />
          </div>
        </>
      )}
    </div>
  );
}
