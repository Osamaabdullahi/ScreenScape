import { create } from "zustand";
import { persist } from "zustand/middleware";

// Watchlist entries are already-normalized media items (see lib/normalize.js)
// so the watchlist page can render them with no further fetching. Identity
// is kind+id, since a TVmaze show id and an OMDb imdbID share no namespace.
export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      has: (kind, id) => get().items.some((s) => s.kind === kind && s.id === id),

      toggle: (item) => {
        const exists = get().items.some((s) => s.kind === item.kind && s.id === item.id);
        set({
          items: exists
            ? get().items.filter((s) => !(s.kind === item.kind && s.id === item.id))
            : [item, ...get().items],
        });
      },

      remove: (kind, id) =>
        set({ items: get().items.filter((s) => !(s.kind === kind && s.id === id)) }),
    }),
    { name: "screenscape-watchlist" }
  )
);
