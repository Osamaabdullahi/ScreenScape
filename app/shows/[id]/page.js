import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import MediaRail from "@/component/MediaRail";
import SeasonEpisodes from "@/component/SeasonEpisodes";
import WatchlistButton from "@/component/WatchlistButton";
import { getShow, getShowCast, getShowEpisodes, getShowPool, ratingOf, stripTags, yearOf } from "@/lib/tvmaze";
import { getMoviePool, hasOmdbKey } from "@/lib/omdb";
import { fromShow, fromMovie } from "@/lib/normalize";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const show = await getShow(params.id).catch(() => null);
  return { title: show?.name || "Show" };
}

export default async function ShowPage({ params }) {
  const show = await getShow(params.id).catch(() => null);
  if (!show) notFound();

  const [episodes, cast, pool, moviePool] = await Promise.all([
    getShowEpisodes(params.id).catch(() => []),
    getShowCast(params.id).catch(() => []),
    getShowPool(2).catch(() => []),
    hasOmdbKey() ? getMoviePool().catch(() => []) : Promise.resolve([]),
  ]);

  const similarShows = pool
    .filter(
      (s) =>
        s.id !== show.id &&
        s.image?.medium &&
        s.genres?.some((g) => show.genres?.includes(g))
    )
    .sort((a, b) => ratingOf(b) - ratingOf(a))
    .slice(0, 12)
    .map(fromShow);

  const similarMovies = moviePool
    .map(fromMovie)
    .filter((m) => m.poster && m.genres?.some((g) => show.genres?.includes(g)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  const item = fromShow(show);
  const network = show.network?.name || show.webChannel?.name;

  return (
    <div>
      <div className="mx-auto max-w-content px-5 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[260px_1fr]">
          <div>
            <div className="relative aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-sm bg-ink-raised">
              {show.image?.original && (
                <Image
                  src={show.image.original}
                  alt={show.name}
                  fill
                  sizes="260px"
                  className="object-cover"
                  priority
                />
              )}
            </div>
            <div className="mt-4 max-w-[260px]">
              <WatchlistButton item={item} variant="full" />
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-paper-dim">
              <span>{show.status}</span>
              {network && (
                <>
                  <span aria-hidden>·</span>
                  <span>{network}</span>
                </>
              )}
              {yearOf(show) && (
                <>
                  <span aria-hidden>·</span>
                  <span>{yearOf(show)}{show.ended ? `–${show.ended.slice(0, 4)}` : "–present"}</span>
                </>
              )}
              {ratingOf(show) > 0 && (
                <>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-1 text-gold">
                    <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    {ratingOf(show).toFixed(1)}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display text-4xl text-paper">{show.name}</h1>

            {show.genres?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {show.genres.map((g) => (
                  <Link
                    key={g}
                    href={`/shows?genre=${encodeURIComponent(g)}`}
                    className="eyebrow rounded-sm border border-ink-line px-2.5 py-1 text-paper-dim hover:border-gold hover:text-paper"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            )}

            <p className="mt-6 max-w-2xl leading-relaxed text-paper-dim">
              {stripTags(show.summary) || "No summary available yet."}
            </p>

            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-y-4 border-t border-ink-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-paper-dim">Runtime</dt>
                <dd className="mt-1 text-paper">{show.averageRuntime || show.runtime || "—"} min</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper-dim">Language</dt>
                <dd className="mt-1 text-paper">{show.language || "—"}</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper-dim">Schedule</dt>
                <dd className="mt-1 text-paper">
                  {show.schedule?.days?.length
                    ? `${show.schedule.days.join(", ")} · ${show.schedule.time || "TBA"}`
                    : "—"}
                </dd>
              </div>
            </dl>

            {cast.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-4 text-paper-dim">Cast</p>
                <div className="rail -mx-1 flex gap-5 overflow-x-auto px-1 pb-2">
                  {cast.slice(0, 10).map((c) => (
                    <div key={c.person.id} className="w-20 shrink-0 text-center">
                      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-ink-raised">
                        {c.person.image?.medium && (
                          <Image
                            src={c.person.image.medium}
                            alt={c.person.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <p className="mt-2 line-clamp-1 text-xs text-paper">{c.person.name}</p>
                      <p className="line-clamp-1 text-xs text-paper-dim">{c.character?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14">
          <p className="eyebrow mb-6 text-gold">Episode guide</p>
          <SeasonEpisodes episodes={episodes} />
        </div>
      </div>

      <div className="rule mx-5" />
      <MediaRail eyebrow="Similar taste" title="More shows like this" items={similarShows} viewAllHref="/shows" />
      {similarMovies.length > 0 && (
        <MediaRail eyebrow="Same genre, different medium" title="Films you might like" items={similarMovies} viewAllHref="/movies" />
      )}
    </div>
  );
}
