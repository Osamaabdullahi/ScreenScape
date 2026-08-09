import Link from "next/link";
import clsx from "clsx";
import MediaGrid from "@/component/MediaGrid";
import { GENRES } from "@/lib/genres";
import { getShowPool } from "@/lib/tvmaze";
import { fromShow } from "@/lib/normalize";

export const dynamic = "force-dynamic";

export const metadata = { title: "Shows" };

export default async function ShowsPage({ searchParams }) {
  const genre = searchParams?.genre || "";
  const sort = searchParams?.sort === "name" ? "name" : "rating";

  const pool = await getShowPool(6).catch(() => []);
  let items = pool.filter((s) => s.image?.medium).map(fromShow);
  if (genre) items = items.filter((s) => s.genres?.includes(genre));

  items =
    sort === "name"
      ? [...items].sort((a, b) => a.name.localeCompare(b.name))
      : [...items].sort((a, b) => b.rating - a.rating);

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <p className="eyebrow mb-2 text-paper-dim">TV catalogue</p>
      <h1 className="font-display text-3xl text-paper">
        {genre ? genre : "All shows"}
      </h1>
      <p className="mt-2 text-paper-dim">
        {items.length.toLocaleString()} shows{genre ? ` tagged ${genre}` : ""}, sourced from TVmaze.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-ink-line py-4">
        <Link
          href="/shows"
          className={clsx(
            "eyebrow rounded-sm border px-3 py-1.5",
            !genre ? "border-gold text-paper" : "border-ink-line text-paper-dim hover:text-paper"
          )}
        >
          All
        </Link>
        {GENRES.map((g) => (
          <Link
            key={g}
            href={`/shows?genre=${encodeURIComponent(g)}${sort === "name" ? "&sort=name" : ""}`}
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
          href={`/shows?${genre ? `genre=${encodeURIComponent(genre)}&` : ""}sort=rating`}
          className={clsx("eyebrow", sort === "rating" ? "text-paper" : "text-paper-dim hover:text-paper")}
        >
          Highest rated
        </Link>
        <Link
          href={`/shows?${genre ? `genre=${encodeURIComponent(genre)}&` : ""}sort=name`}
          className={clsx("eyebrow", sort === "name" ? "text-paper" : "text-paper-dim hover:text-paper")}
        >
          A–Z
        </Link>
      </div>

      <div className="mt-8">
        <MediaGrid items={items} emptyMessage="Nothing matches that filter yet — try a different genre." />
      </div>
    </div>
  );
}
