import Link from "next/link";
import { getSchedule } from "@/lib/tvmaze";

export default async function OnAirTicker() {
  let episodes = [];
  try {
    episodes = await getSchedule("US");
  } catch {
    episodes = [];
  }

  const items = episodes
    .filter((e) => e.show)
    .sort((a, b) => (a.airtime || "").localeCompare(b.airtime || ""))
    .slice(0, 14);

  if (!items.length) return null;

  const row = (key) => (
    <div key={key} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((e) => (
        <Link
          key={`${key}-${e.id}`}
          href={`/shows/${e.show.id}`}
          className="flex shrink-0 items-center gap-2.5 font-mono text-xs text-paper-dim hover:text-paper"
        >
          <span className="text-gold">{e.airtime || "TBA"}</span>
          <span>{e.show.name}</span>
          <span className="text-paper-dim/60">
            {e.show.network?.name || e.show.webChannel?.name || ""}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="border-y border-ink-line bg-ink-raised/50">
      <div className="mx-auto flex max-w-content items-center gap-4 py-2.5 pl-5">
        <span className="eyebrow flex shrink-0 items-center gap-1.5 text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          On air today
        </span>
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max">
            {row("a")}
            {row("b")}
          </div>
        </div>
      </div>
    </div>
  );
}
