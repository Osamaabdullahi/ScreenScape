import Image from "next/image";
import Link from "next/link";
import { getSchedule } from "@/lib/tvmaze";

export const dynamic = "force-dynamic";
export const metadata = { title: "Schedule" };

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "IE", label: "Ireland" },
  { code: "KE", label: "Kenya" },
  { code: "ZA", label: "South Africa" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "JP", label: "Japan" },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default async function SchedulePage({ searchParams }) {
  const country = COUNTRIES.some((c) => c.code === searchParams?.country)
    ? searchParams.country
    : "US";
  const date = searchParams?.date || todayISO();

  const episodes = await getSchedule(country, date).catch(() => []);
  const sorted = [...episodes].sort((a, b) => (a.airtime || "").localeCompare(b.airtime || ""));

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <p className="eyebrow mb-2 text-paper-dim">Broadcast listings</p>
      <h1 className="font-display text-3xl text-paper">What&apos;s airing</h1>
      <p className="mt-2 text-paper-dim">
        Network and local-cable television only — global streaming services don&apos;t report a
        fixed daily schedule to TVmaze.
      </p>

      <form className="mt-8 flex flex-wrap items-end gap-4 border-y border-ink-line py-5">
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-paper-dim">Country</span>
          <select
            name="country"
            defaultValue={country}
            className="rounded-sm border border-ink-line bg-ink-raised px-3 py-2 text-paper focus:border-gold focus:outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-paper-dim">Date</span>
          <input
            type="date"
            name="date"
            defaultValue={date}
            className="rounded-sm border border-ink-line bg-ink-raised px-3 py-2 text-paper focus:border-gold focus:outline-none"
          />
        </label>
        <button className="eyebrow rounded-sm border border-ink-line px-5 py-2.5 text-paper hover:border-gold">
          Update listings
        </button>
      </form>

      <div className="mt-8">
        {sorted.length === 0 && (
          <p className="py-10 text-paper-dim">No listings found for that day and country.</p>
        )}
        <div className="divide-y divide-ink-line border-b border-ink-line">
          {sorted.map((e) => (
            <Link
              key={e.id}
              href={e.show ? `/shows/${e.show.id}` : "#"}
              className="flex items-center gap-4 py-4 hover:bg-ink-raised/40"
            >
              <span className="w-16 shrink-0 font-mono text-sm text-gold">{e.airtime || "TBA"}</span>
              <div className="relative hidden h-16 w-11 shrink-0 overflow-hidden rounded-sm bg-ink-raised sm:block">
                {e.show?.image?.medium && (
                  <Image src={e.show.image.medium} alt={e.show.name} fill sizes="44px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-display text-base text-paper">{e.show?.name}</p>
                <p className="line-clamp-1 text-sm text-paper-dim">
                  {e.name}
                  {e.season && e.number ? ` · S${e.season}E${e.number}` : ""}
                </p>
              </div>
              <span className="eyebrow shrink-0 text-paper-dim">
                {e.show?.network?.name || e.show?.webChannel?.name || "—"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
