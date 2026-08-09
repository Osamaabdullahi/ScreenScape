import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import WatchlistButton from "@/component/WatchlistButton";

export default function MediaCard({ item, className = "" }) {
  return (
    <div className={`group relative ${className}`}>
      <Link href={item.href} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-ink-raised">
          {item.poster ? (
            <Image
              src={item.poster}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 200px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center font-display text-sm text-paper-dim">
              {item.name}
            </div>
          )}
          <span className="eyebrow absolute left-2 top-2 rounded-sm bg-ink/85 px-1.5 py-1 text-paper-dim backdrop-blur-sm">
            {item.kind === "movie" ? "Film" : "TV"}
          </span>
          {item.rating > 0 && (
            <div className="eyebrow absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-ink/85 px-1.5 py-1 text-paper backdrop-blur-sm">
              <Star className="h-3 w-3 text-gold" fill="currentColor" strokeWidth={0} />
              {item.rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="mt-2.5 border-b border-transparent pb-0.5 transition-colors group-hover:border-gold">
          <h3 className="line-clamp-1 font-display text-[15px] leading-tight text-paper">
            {item.name}
          </h3>
        </div>
      </Link>
      <div className="eyebrow mt-1 flex items-center justify-between text-paper-dim">
        <span>{[item.year, item.genres?.[0]].filter(Boolean).join(" · ") || "—"}</span>
        <WatchlistButton item={item} variant="icon" />
      </div>
    </div>
  );
}
