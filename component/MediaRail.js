import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MediaCard from "@/component/cards/MediaCard";

export default function MediaRail({ eyebrow, title, items, viewAllHref }) {
  if (!items?.length) return null;

  return (
    <section className="mx-auto max-w-content px-5 py-10">
      <div className="mb-5 flex items-end justify-between border-b border-ink-line pb-4">
        <div>
          {eyebrow && <p className="eyebrow mb-1.5 text-gold">{eyebrow}</p>}
          <h2 className="font-display text-2xl text-paper">{title}</h2>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="eyebrow hidden items-center gap-1 text-paper-dim hover:text-paper sm:flex"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      <div className="rail -mx-5 flex gap-4 overflow-x-auto px-5 pb-2">
        {items.map((item) => (
          <MediaCard key={`${item.kind}-${item.id}`} item={item} className="w-[42vw] flex-none sm:w-[180px]" />
        ))}
      </div>
    </section>
  );
}
