"use client";

import { useState } from "react";
import MediaCard from "@/component/cards/MediaCard";

const PAGE_SIZE = 24;

export default function MediaGrid({ items, emptyMessage = "Nothing matches that filter yet." }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (!items.length) {
    return <p className="py-16 text-center text-paper-dim">{emptyMessage}</p>;
  }

  const shown = items.slice(0, visible);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {shown.map((item) => (
          <MediaCard key={`${item.kind}-${item.id}`} item={item} />
        ))}
      </div>
      {visible < items.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="eyebrow rounded-sm border border-ink-line px-6 py-3 text-paper transition-colors hover:border-gold"
          >
            Show more ({items.length - visible} left)
          </button>
        </div>
      )}
    </div>
  );
}
