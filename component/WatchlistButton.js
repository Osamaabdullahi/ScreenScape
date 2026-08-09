"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useWatchlistStore } from "@/store";

export default function WatchlistButton({ item, variant = "icon" }) {
  const saved = useWatchlistStore((s) => s.has(item.kind, item.id));
  const toggle = useWatchlistStore((s) => s.toggle);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(item);
  };

  if (variant === "full") {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 rounded-sm border border-ink-line px-4 py-2.5 text-sm text-paper transition-colors hover:border-gold"
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4 text-gold" strokeWidth={1.6} />
        ) : (
          <Bookmark className="h-4 w-4" strokeWidth={1.6} />
        )}
        {saved ? "On your watchlist" : "Add to watchlist"}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
      className="text-paper-dim transition-colors hover:text-gold"
    >
      {saved ? (
        <BookmarkCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
      ) : (
        <Bookmark className="h-3.5 w-3.5" strokeWidth={1.8} />
      )}
    </button>
  );
}
