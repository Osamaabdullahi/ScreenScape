"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, RotateCcw } from "lucide-react";
import MediaCard from "@/component/cards/MediaCard";
import { GENRES } from "@/lib/genres";
import { MOVIE_GENRES } from "@/lib/movieGenres";
import { getShowPool } from "@/lib/tvmaze";
import { fromShow } from "@/lib/normalize";

const TYPES = [
  { id: "both", label: "Both" },
  { id: "show", label: "TV shows" },
  { id: "movie", label: "Films" },
];

const MOODS = [
  { id: "acclaimed", label: "Something acclaimed", minRating: 8 },
  { id: "solid", label: "Something dependable", minRating: 6.5 },
  { id: "anything", label: "Doesn't matter", minRating: 0 },
];

export default function RecommendPage() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("both");
  const [genres, setGenres] = useState([]);
  const [mood, setMood] = useState(MOODS[1].id);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [note, setNote] = useState("");

  const genreOptions = Array.from(new Set([
    ...(type !== "movie" ? GENRES : []),
    ...(type !== "show" ? MOVIE_GENRES : []),
  ])).sort();

  const toggleGenre = (g) => {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 3 ? [...prev, g] : prev
    );
  };

  const runQuery = async () => {
    setLoading(true);
    setNote("");
    try {
      const minRating = MOODS.find((m) => m.id === mood)?.minRating ?? 0;
      let pool = [];

      if (type !== "movie") {
        const showPool = await getShowPool(6).catch(() => []);
        pool = pool.concat(showPool.filter((s) => s.image?.medium).map(fromShow));
      }

      if (type !== "show") {
        const res = await fetch("/api/movies/pool").then((r) => r.json()).catch(() => null);
        if (res && res.configured === false) {
          setNote("Films are off — add OMDB_API_KEY to .env.local to include them.");
        } else if (res?.results) {
          pool = pool.concat(res.results.filter((m) => m.poster));
        }
      }

      const scored = pool
        .filter((item) => item.rating >= minRating)
        .map((item) => {
          const overlap = genres.length
            ? item.genres?.filter((g) => genres.includes(g)).length ?? 0
            : 0;
          return { item, score: overlap * 10 + item.rating };
        })
        .filter((x) => genres.length === 0 || x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 9)
        .map((x) => x.item);

      setResults(scored);
    } finally {
      setLoading(false);
      setStep(3);
    }
  };

  const reset = () => {
    setType("both");
    setGenres([]);
    setMood(MOODS[1].id);
    setResults(null);
    setNote("");
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-content px-5 py-12">
      <p className="eyebrow mb-2 text-paper-dim">Three questions</p>
      <h1 className="font-display text-3xl text-paper">Find something to watch</h1>
      <p className="mt-2 max-w-lg text-paper-dim">
        Answer a few questions and ScreenScape will weigh genre and rating across TVmaze and
        OMDb to shortlist nine titles.
      </p>

      {step === 0 && (
        <div className="mt-10">
          <p className="eyebrow mb-4 text-gold">1 — TV shows, films, or both?</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setType(t.id);
                  setGenres([]);
                }}
                className={clsx(
                  "rounded-sm border px-4 py-3 text-left",
                  type === t.id ? "border-gold text-paper" : "border-ink-line text-paper-dim hover:text-paper"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="eyebrow mt-8 flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-ink"
          >
            Continue <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="mt-10">
          <p className="eyebrow mb-4 text-gold">2 — Pick up to three genres</p>
          <div className="flex flex-wrap gap-2">
            {genreOptions.map((g) => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={clsx(
                  "eyebrow rounded-sm border px-3 py-2",
                  genres.includes(g)
                    ? "border-gold text-paper"
                    : "border-ink-line text-paper-dim hover:text-paper"
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <button
            disabled={genres.length === 0}
            onClick={() => setStep(2)}
            className="eyebrow mt-8 flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-10">
          <p className="eyebrow mb-4 text-gold">3 — How much of a bet are you willing to take?</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={clsx(
                  "rounded-sm border px-4 py-3 text-left",
                  mood === m.id ? "border-gold text-paper" : "border-ink-line text-paper-dim hover:text-paper"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <button
            onClick={runQuery}
            disabled={loading}
            className="eyebrow mt-8 flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-ink disabled:opacity-60"
          >
            {loading ? "Weighing the catalogue…" : "Show my shortlist"} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="eyebrow text-gold">Your shortlist</p>
            <button onClick={reset} className="eyebrow flex items-center gap-1.5 text-paper-dim hover:text-paper">
              <RotateCcw className="h-3.5 w-3.5" /> Start over
            </button>
          </div>
          {note && <p className="eyebrow mb-6 text-paper-dim">{note}</p>}
          {results?.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {results.map((item) => (
                <MediaCard key={`${item.kind}-${item.id}`} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-paper-dim">
              Nothing cleared that bar. Try starting over with a broader mood or fewer genres.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
