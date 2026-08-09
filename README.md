# ScreenScape

A TV and film discovery/recommendation site combining two APIs:

- **[TVmaze](https://www.tvmaze.com/api)** — TV shows, cast, episodes, schedules. Free, no key needed.
- **[OMDb API](https://www.omdbapi.com)** — movies. Free tier, 1,000 requests/day, needs an API key.

OMDb has no "browse all movies" endpoint, only lookup-by-id and title
search — so the movie side of the catalogue (browse, recommend, homepage
rails) is seeded from a curated list of well-known films (`lib/movieSeed.js`),
fetched by IMDb id and cached for 24h server-side to stay well under the
daily request limit. Movie search and detail pages hit OMDb live.

## Set up your OMDb key

1. Get a free key at https://www.omdbapi.com/apikey.aspx
2. Open `.env.local` and set:
   ```
   OMDB_API_KEY=your_key_here
   ```
3. Restart the dev server.

Without a key, TV features work exactly as before — movie pages show a
plain "not connected" notice instead of erroring, and movie sections
just don't render.

## Pages

- `/` — masthead, today's on-air ticker (TV), a featured pick, TV + film genre index, highly-rated rails for both
- `/shows`, `/movies` — browse, filter by genre, sort by rating or name
- `/shows/[id]`, `/movies/[id]` — full detail, cast, TV episode guide, cross-media "you might also like"
- `/search` — live search across both TVmaze and OMDb
- `/schedule` — a given day's TV broadcast listings by country
- `/recommend` — pick TV / film / both, up to three genres, and a mood — get nine shortlisted titles
- `/watchlist` — shows and films saved to this browser (stored locally, no account)

## Stack

Next.js 14 (App Router), Tailwind CSS, Zustand (local watchlist),
lucide-react icons. The OMDb key stays server-side: client tools (search,
recommend) call local `/api/movies/*` routes rather than OMDb directly.

## Run it

```bash
npm install
npm run dev
```
