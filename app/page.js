import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import OnAirTicker from "@/component/OnAirTicker";
import MediaRail from "@/component/MediaRail";
import { GENRES } from "@/lib/genres";
import { MOVIE_GENRES } from "@/lib/movieGenres";
import { getShowPool } from "@/lib/tvmaze";
import { getMoviePool, hasOmdbKey } from "@/lib/omdb";
import { fromShow, fromMovie } from "@/lib/normalize";

export const dynamic = "force-dynamic";

function dateline() {
  return new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

export default async function HomePage() {
  const [showPool, moviePool] = await Promise.all([
    getShowPool(3).catch(() => []),
    hasOmdbKey() ? getMoviePool().catch(() => []) : Promise.resolve([]),
  ]);

  const shows = showPool.filter((s) => s.image?.original && s.summary).map(fromShow);
  const movies = moviePool.map(fromMovie).filter((m) => m.poster);

  const rankedShows = [...shows].sort((a, b) => b.rating - a.rating);
  const rankedMovies = [...movies].sort((a, b) => b.rating - a.rating);
  const combined = [...rankedShows, ...rankedMovies].sort((a, b) => b.rating - a.rating);

  const featured = combined[0];
  const acclaimedShows = rankedShows.filter((s) => s.id !== featured?.id).slice(0, 12);
  const acclaimedMovies = rankedMovies.filter((m) => m.id !== featured?.id).slice(0, 12);

  const currentYear = new Date().getFullYear();
  const freshShows = rankedShows.filter((s) => Number(s.year) >= currentYear - 2).slice(0, 12);

  return (
    <div>
      {/* Masthead */}
      <section className="mx-auto max-w-content px-5 pb-10 pt-14">
        <div className="flex flex-col gap-4 border-b border-ink-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3 text-paper-dim">{dateline()}</p>
            <h1 className="max-w-xl font-display text-4xl leading-[1.1] text-paper sm:text-5xl">
              A guide to what&apos;s worth watching.
            </h1>
            <p className="mt-4 max-w-md text-paper-dim">
              ScreenScape sorts through television and film so you don&apos;t have to —
              browse by genre, follow tonight&apos;s lineup, or answer three questions
              and get a shortlist back.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/recommend"
              className="flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold/90"
            >
              Find something to watch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shows"
              className="flex items-center gap-2 rounded-sm border border-ink-line px-5 py-3 text-sm text-paper transition-colors hover:border-gold"
            >
              Browse shows
            </Link>
          </div>
        </div>
      </section>

      <OnAirTicker />

      {/* Featured pick */}
      {featured && (
        <section className="mx-auto max-w-content px-5 py-14">
          <p className="eyebrow mb-6 text-gold">Featured pick</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[280px_1fr]">
            <Link href={featured.href} className="block">
              <div className="relative aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-sm bg-ink-raised">
                <Image
                  src={featured.poster}
                  alt={featured.name}
                  fill
                  sizes="280px"
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
            <div className="flex flex-col justify-center">
              <div className="eyebrow mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-paper-dim">
                <span>{featured.kind === "movie" ? "Film" : "TV"}</span>
                <span aria-hidden>·</span>
                <span>{featured.year}</span>
                <span aria-hidden>·</span>
                <span>{featured.genres?.join(", ") || "—"}</span>
                {featured.rating > 0 && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1 text-gold">
                      <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                      {featured.rating.toFixed(1)}
                    </span>
                  </>
                )}
              </div>
              <h2 className="font-display text-3xl text-paper">{featured.name}</h2>
              <p className="mt-4 max-w-xl text-paper-dim">{featured.summary.slice(0, 320)}</p>
              <Link
                href={featured.href}
                className="eyebrow mt-6 flex w-fit items-center gap-1.5 border-b border-gold pb-1 text-paper"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="rule mx-5" />

      <MediaRail
        eyebrow="Consistently acclaimed"
        title="Highly rated shows"
        items={acclaimedShows}
        viewAllHref="/shows?sort=rating"
      />

      {hasOmdbKey() ? (
        <MediaRail
          eyebrow="Consistently acclaimed"
          title="Highly rated films"
          items={acclaimedMovies}
          viewAllHref="/movies?sort=rating"
        />
      ) : (
        <section className="mx-auto max-w-content px-5 py-10">
          <div className="border border-dashed border-ink-line px-6 py-8 text-center">
            <p className="eyebrow mb-2 text-gold">Films not connected</p>
            <p className="mx-auto max-w-sm text-paper-dim">
              Add an OMDb API key to <code className="font-mono text-paper">.env.local</code> as{" "}
              <code className="font-mono text-paper">OMDB_API_KEY</code> to turn on film
              recommendations.
            </p>
          </div>
        </section>
      )}

      {/* Genre index */}
      <section className="mx-auto max-w-content px-5 py-10">
        <p className="eyebrow mb-4 text-paper-dim">Browse TV by genre</p>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {GENRES.map((g) => (
            <Link
              key={g}
              href={`/shows?genre=${encodeURIComponent(g)}`}
              className="border-b border-transparent font-display text-lg text-paper-dim transition-colors hover:border-gold hover:text-paper"
            >
              {g}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-10">
        <p className="eyebrow mb-4 text-paper-dim">Browse film by genre</p>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {MOVIE_GENRES.map((g) => (
            <Link
              key={g}
              href={`/movies?genre=${encodeURIComponent(g)}`}
              className="border-b border-transparent font-display text-lg text-paper-dim transition-colors hover:border-gold hover:text-paper"
            >
              {g}
            </Link>
          ))}
        </div>
      </section>

      <MediaRail
        eyebrow="Premiered recently"
        title="New to the schedule"
        items={freshShows}
        viewAllHref="/shows?sort=rating"
      />

      {/* How it works */}
      <section className="mx-auto max-w-content px-5 py-16">
        <div className="grid grid-cols-1 gap-10 border-t border-ink-line pt-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-2 text-gold">By genre and rating</p>
            <p className="text-paper-dim">
              Every title carries genre tags and an audience rating. The recommend tool weighs
              both, across shows and films, to shortlist what fits your mood.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2 text-gold">By network, year and status</p>
            <p className="text-paper-dim">
              See whether a show is still running, which network carries it, or when a film was
              released — before you commit.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2 text-gold">By schedule</p>
            <p className="text-paper-dim">
              The schedule page follows what&apos;s airing today in a given country,
              pulled straight from TVmaze&apos;s listings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
