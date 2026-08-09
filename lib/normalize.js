import { stripTags } from "@/lib/tvmaze";

// A normalized media item — the common shape every card, rail, grid and the
// watchlist store work with, regardless of whether it came from TVmaze or
// OMDb: { kind, id, href, name, poster, genres, rating, year, summary }

export function fromShow(show) {
  return {
    kind: "show",
    id: show.id,
    href: `/shows/${show.id}`,
    name: show.name,
    poster: show.image?.medium || show.image?.original || null,
    genres: show.genres || [],
    rating: typeof show.rating?.average === "number" ? show.rating.average : 0,
    year: show.premiered ? show.premiered.slice(0, 4) : null,
    summary: stripTags(show.summary),
  };
}

export function fromMovie(movie) {
  const genres =
    movie.Genre && movie.Genre !== "N/A" ? movie.Genre.split(",").map((g) => g.trim()) : [];
  const rating =
    movie.imdbRating && movie.imdbRating !== "N/A" ? parseFloat(movie.imdbRating) : 0;
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null;

  return {
    kind: "movie",
    id: movie.imdbID,
    href: `/movies/${movie.imdbID}`,
    name: movie.Title,
    poster,
    genres,
    rating,
    year: movie.Year ? movie.Year.slice(0, 4) : null,
    summary: movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "",
  };
}
