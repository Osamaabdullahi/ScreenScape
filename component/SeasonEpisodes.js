"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { stripTags } from "@/lib/tvmaze";

export default function SeasonEpisodes({ episodes }) {
  const bySeason = useMemo(() => {
    const map = new Map();
    for (const ep of episodes) {
      const s = ep.season ?? 0;
      if (!map.has(s)) map.set(s, []);
      map.get(s).push(ep);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [episodes]);

  const [active, setActive] = useState(bySeason[bySeason.length - 1]?.[0] ?? 0);

  if (!bySeason.length) {
    return <p className="text-paper-dim">No episode listing available yet.</p>;
  }

  const current = bySeason.find(([s]) => s === active)?.[1] ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {bySeason.map(([s]) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={clsx(
              "eyebrow rounded-sm border px-3 py-1.5",
              active === s ? "border-gold text-paper" : "border-ink-line text-paper-dim hover:text-paper"
            )}
          >
            Season {s}
          </button>
        ))}
      </div>

      <div className="divide-y divide-ink-line border-y border-ink-line">
        {current.map((ep) => (
          <div key={ep.id} className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="eyebrow shrink-0 text-gold">
              S{String(ep.season).padStart(2, "0")}E{String(ep.number ?? 0).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h4 className="font-display text-base text-paper">{ep.name}</h4>
                {ep.airdate && <span className="font-mono text-xs text-paper-dim">{ep.airdate}</span>}
              </div>
              {stripTags(ep.summary) && (
                <p className="mt-1 line-clamp-2 text-sm text-paper-dim">{stripTags(ep.summary)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
