"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import MediaCard from "@/component/cards/MediaCard";
import { searchShows } from "@/lib/tvmaze";
import { fromShow } from "@/lib/normalize";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesConfigured, setMoviesConfigured] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setShows([]);
      setMovies([]);
      return;
    }
    setLoading(true);
    const handle = setTimeout(() => {
      Promise.all([
        searchShows(q)
          .then((r) => (r || []).map((entry) => fromShow(entry.show)))
          .catch(() => []),
        fetch(`/api/movies/search?q=${encodeURIComponent(q)}`)
          .then((r) => r.json())
          .then((data) => {
            setMoviesConfigured(data.configured !== false);
            return data.results || [];
          })
          .catch(() => []),
      ])
        .then(([showResults, movieResults]) => {
          setShows(showResults);
          setMovies(movieResults);
        })
        .finally(() => setLoading(false));
    }, 350);
    return () => clearTimeout(handle);
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && !loading && shows.length === 0 && movies.length === 0;

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <p className="eyebrow mb-2 text-paper-dim">Search</p>
      <h1 className="font-display text-3xl text-paper">Find a show or film by name</h1>

      <div className="relative mt-8 max-w-lg">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-dim" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “The Wire”, “Parasite”, “Fleabag”…"
          className="w-full rounded-sm border border-ink-line bg-ink-raised py-3 pl-11 pr-4 text-paper placeholder:text-paper-dim focus:border-gold focus:outline-none"
        />
      </div>

      <div className="mt-10 space-y-12">
        {loading && <p className="text-paper-dim">Searching…</p>}

        {noResults && <p className="text-paper-dim">No titles matched &ldquo;{query}&rdquo;.</p>}

        {shows.length > 0 && (
          <div>
            <p className="eyebrow mb-4 text-gold">TV shows</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {shows.map((item) => (
                <MediaCard key={`show-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        )}

        {movies.length > 0 && (
          <div>
            <p className="eyebrow mb-4 text-gold">Films</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {movies.map((item) => (
                <MediaCard key={`movie-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        )}

        {hasQuery && !loading && !moviesConfigured && (
          <p className="eyebrow text-paper-dim">
            Film search is off — add <span className="text-paper">OMDB_API_KEY</span> to{" "}
            <span className="text-paper">.env.local</span> to search films too.
          </p>
        )}
      </div>
    </div>
  );
}
