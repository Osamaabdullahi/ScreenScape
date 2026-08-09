"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import MediaCard from "@/component/cards/MediaCard";
import { useWatchlistStore } from "@/store";

export default function WatchlistPage() {
  const items = useWatchlistStore((s) => s.items);

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <p className="eyebrow mb-2 text-paper-dim">Saved on this device</p>
      <h1 className="font-display text-3xl text-paper">Your watchlist</h1>

      {items.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-4 border border-dashed border-ink-line py-16 text-center">
          <Bookmark className="h-6 w-6 text-paper-dim" strokeWidth={1.4} />
          <p className="max-w-xs text-paper-dim">
            Nothing saved yet. Tap the bookmark on any show or film to keep it here.
          </p>
          <div className="flex gap-4">
            <Link href="/shows" className="eyebrow border-b border-gold pb-0.5 text-paper">
              Browse shows
            </Link>
            <Link href="/movies" className="eyebrow border-b border-gold pb-0.5 text-paper">
              Browse films
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <MediaCard key={`${item.kind}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
