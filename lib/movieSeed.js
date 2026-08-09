// OMDb has no "browse" or "trending" endpoint — only lookup by id/title and
// title search. So the movie side of the catalogue is seeded from a curated
// list of well-regarded films across genres, each fetched by IMDb id and
// cached for a day. Ids that fail (typo, removed, rate-limited) are simply
// dropped by getMoviePool() rather than breaking the page.
export const MOVIE_SEED_IDS = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather Part II
  "tt0468569", // The Dark Knight
  "tt0050083", // 12 Angry Men
  "tt0108052", // Schindler's List
  "tt0167260", // The Lord of the Rings: The Return of the King
  "tt0110912", // Pulp Fiction
  "tt0060196", // The Good, the Bad and the Ugly
  "tt0137523", // Fight Club
  "tt0109830", // Forrest Gump
  "tt0080684", // The Empire Strikes Back
  "tt1375666", // Inception
  "tt0167261", // The Lord of the Rings: The Two Towers
  "tt0073486", // One Flew Over the Cuckoo's Nest
  "tt0099685", // Goodfellas
  "tt0133093", // The Matrix
  "tt0038650", // It's a Wonderful Life
  "tt0102926", // The Silence of the Lambs
  "tt0114369", // Se7en
  "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
  "tt0317248", // City of God
  "tt0114814", // The Usual Suspects
  "tt0076759", // Star Wars
  "tt0088763", // Back to the Future
  "tt0245429", // Spirited Away
  "tt0118799", // Life Is Beautiful
  "tt0816692", // Interstellar
  "tt0910970", // WALL-E
  "tt0338013", // Eternal Sunshine of the Spotless Mind
  "tt0482571", // The Prestige
  "tt0407887", // The Departed
  "tt0172495", // Gladiator
  "tt0209144", // Memento
  "tt0361748", // Inglourious Basterds
  "tt0993846", // The Wolf of Wall Street
  "tt0120815", // Saving Private Ryan
  "tt0180093", // Requiem for a Dream
  "tt0078748", // Alien
  "tt0034583", // Casablanca
  "tt0057012", // Dr. Strangelove
  "tt0053125", // North by Northwest
  "tt0054215", // Psycho
  "tt0081505", // The Shining
  "tt0047396", // Rear Window
  "tt0095327", // Grave of the Fireflies
  "tt0405094", // The Lives of Others
  "tt0119217", // Good Will Hunting
  "tt0117951", // Trainspotting
  "tt0264464", // Catch Me If You Can
  "tt0435761", // Toy Story 3
  "tt0266543", // Finding Nemo
  "tt0198781", // Monsters, Inc.
  "tt2582802", // Whiplash
  "tt2015381", // Guardians of the Galaxy
  "tt4154796", // Avengers: Endgame
  "tt0499549", // Avatar
  "tt1345836", // The Dark Knight Rises
  "tt0372784", // Batman Begins
  "tt6751668", // Parasite
  "tt5013056", // Dunkirk
  "tt1130884", // Shutter Island
  "tt0119698", // Princess Mononoke
  "tt0347149", // Howl's Moving Castle
  "tt7286456", // Joker
  "tt0126029", // Shrek
  "tt0112573", // Braveheart
  "tt0071853", // Monty Python and the Holy Grail
  "tt0091763", // Platoon
  "tt0075314", // Taxi Driver
  "tt0078788", // Apocalypse Now
  "tt0047296", // On the Waterfront
  "tt0056172", // Lawrence of Arabia
  "tt0053291", // Some Like It Hot
  "tt0031381", // Gone with the Wind
  "tt0083658", // Blade Runner
  "tt1856101", // Blade Runner 2049
  "tt0113277", // Heat
  "tt0169547", // American Beauty
  "tt0120689", // The Green Mile
  "tt0093058", // Full Metal Jacket
  "tt0075148", // Rocky
  "tt3783958", // La La Land
  "tt0120338", // Titanic
  "tt1285016", // The Social Network
  "tt0268978", // A Beautiful Mind
  "tt1049413", // Up
  "tt2380307", // Coco
  "tt2096673", // Inside Out
  "tt0099785", // Home Alone
  "tt0088247", // The Terminator
  "tt0103064", // Terminator 2: Judgment Day
  "tt0083866", // E.T. the Extra-Terrestrial
  "tt2543164", // Arrival
  "tt0457430", // Pan's Labyrinth
  "tt0107048", // Groundhog Day
  "tt2278388", // The Grand Budapest Hotel
  "tt0477348", // No Country for Old Men
  "tt0469494", // There Will Be Blood
  "tt0093779", // The Princess Bride
];
