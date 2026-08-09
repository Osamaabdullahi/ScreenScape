import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import MediaRail from "@/component/MediaRail";
import WatchlistButton from "@/component/WatchlistButton";
import { getMovie, getMoviePool, hasOmdbKey } from "@/lib/omdb";
import { getShowPool } from "@/lib/tvmaze";
import { fromMovie, fromShow } from "@/lib/normalize";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  if (!hasOmdbKey()) return { title: "Film" };
  const movie = await getMovie(params.id, { plot: "short" }).catch(() => null);
  return { title: movie?.Title || "Film" };
}

export default async function MoviePage({ params }) {
  if (!hasOmdbKey()) {
    return (
      <div className="mx-auto max-w-content px-5 py-16 text-center">
        <p className="eyebrow mb-2 text-gold">Films not connected</p>
        <p className="mx-auto max-w-sm text-paper-dim">
          Add an OMDb API key to <code className="font-mono text-paper">.env.local</code> as{" "}
          <code className="font-mono text-paper">OMDB_API_KEY</code> to view film details.
        </p>
      </div>
    );
  }

  const movie = await getMovie(params.id, { plot: "full" }).catch(() => null);
  if (!movie) notFound();

  const [moviePool, showPool] = await Promise.all([
    getMoviePool().catch(() => []),
    getShowPool(2).catch(() => []),
  ]);

  const item = fromMovie(movie);

  const similarMovies = moviePool
    .map(fromMovie)
    .filter((m) => m.id !== item.id && m.poster && m.genres?.some((g) => item.genres.includes(g)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  const similarShows = showPool
    .filter((s) => s.image?.medium && s.genres?.some((g) => item.genres.includes(g)))
    .map(fromShow)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  const actors = movie.Actors && movie.Actors !== "N/A" ? movie.Actors.split(",").map((a) => a.trim()) : [];

  return (
    <div>
      <div className="mx-auto max-w-content px-5 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[260px_1fr]">
          <div>
            <div className="relative aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-sm bg-ink-raised">
              {item.poster && (
                <Image src={item.poster} alt={item.name} fill sizes="260px" className="object-cover" priority />
              )}
            </div>
            <div className="mt-4 max-w-[260px]">
              <WatchlistButton item={item} variant="full" />
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-paper-dim">
              <span>{movie.Rated && movie.Rated !== "N/A" ? movie.Rated : "Unrated"}</span>
              <span aria-hidden>·</span>
              <span>{item.year}</span>
              {movie.Runtime && movie.Runtime !== "N/A" && (
                <>
                  <span aria-hidden>·</span>
                  <span>{movie.Runtime}</span>
                </>
              )}
              {item.rating > 0 && (
                <>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-1 text-gold">
                    <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    {item.rating.toFixed(1)}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display text-4xl text-paper">{item.name}</h1>

            {item.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.genres.map((g) => (
                  <Link
                    key={g}
                    href={`/movies?genre=${encodeURIComponent(g)}`}
                    className="eyebrow rounded-sm border border-ink-line px-2.5 py-1 text-paper-dim hover:border-gold hover:text-paper"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            )}

            <p className="mt-6 max-w-2xl leading-relaxed text-paper-dim">
              {item.summary || "No summary available yet."}
            </p>

            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-y-4 border-t border-ink-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-paper-dim">Director</dt>
                <dd className="mt-1 text-paper">{movie.Director && movie.Director !== "N/A" ? movie.Director : "—"}</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper-dim">Language</dt>
                <dd className="mt-1 text-paper">{movie.Language && movie.Language !== "N/A" ? movie.Language : "—"}</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper-dim">Country</dt>
                <dd className="mt-1 text-paper">{movie.Country && movie.Country !== "N/A" ? movie.Country : "—"}</dd>
              </div>
              {movie.Awards && movie.Awards !== "N/A" && (
                <div className="col-span-2 sm:col-span-3">
                  <dt className="eyebrow text-paper-dim">Awards</dt>
                  <dd className="mt-1 text-paper">{movie.Awards}</dd>
                </div>
              )}
            </dl>

            {actors.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-3 text-paper-dim">Cast</p>
                <p className="text-paper">{actors.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rule mx-5" />
      <MediaRail eyebrow="Similar taste" title="More films like this" items={similarMovies} viewAllHref="/movies" />
      {similarShows.length > 0 && (
        <MediaRail eyebrow="Same genre, different medium" title="Shows you might like" items={similarShows} viewAllHref="/shows" />
      )}
    </div>
  );
}
