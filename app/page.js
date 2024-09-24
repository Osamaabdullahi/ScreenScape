"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaPlay,
  FaStar,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaQuoteLeft,
  FaChevronDown,
} from "react-icons/fa";
import Navbar from "@/component/Navbar";
import MovieList from "@/component/cards/MovieList";

const moviesOne = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    rating: 8.8,
    image:
      "https://i.pinimg.com/474x/b0/ae/a4/b0aea49646879a043ad9f6ec3002e99f.jpg",
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    rating: 9.3,
    image:
      "https://i.pinimg.com/474x/bb/0e/f9/bb0ef99b7d71bb27e22f57d2156b7b5d.jpg",
    genre: "Drama",
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    rating: 9.0,
    image:
      "https://i.pinimg.com/474x/ea/a2/6e/eaa26e2c3bfa234c3cdd3c4d9fabad35.jpg",
    genre: "Action",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    rating: 8.9,
    image:
      "https://i.pinimg.com/474x/89/41/e7/8941e71464be8fe81ade92a86817338e.jpg",
    genre: "Crime",
  },
  {
    id: 5,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    rating: 8.8,
    image:
      "https://i.pinimg.com/474x/02/6b/0d/026b0d4dab1abe1c5f4460d6a45ae2ab.jpg",
    genre: "Drama",
  },
];

const movies = [...moviesOne, ...moviesOne, ...moviesOne];

const upcomingMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    releaseDate: "2024-03-15",
    image:
      "https://i.pinimg.com/474x/0c/b4/22/0cb4227980a65c6e8a135525e0b601ec.jpg",
  },
  {
    id: 2,
    title: "Oppenheimer",
    releaseDate: "2024-07-21",
    image:
      "https://i.pinimg.com/474x/77/9d/a3/779da30964fb69b47c4f03138d482f9d.jpg",
  },
  {
    id: 3,
    title: "Mission: Impossible 8",
    releaseDate: "2024-07-07",
    image:
      "https://i.pinimg.com/474x/bf/83/b9/bf83b924c49a3a10d145fb1bfd6a078b.jpg",
  },
];

const reviews = [
  {
    id: 1,
    user: "John D.",
    movie: "Inception",
    content: "Mind-bending and visually stunning. Nolan at his best!",
  },
  {
    id: 2,
    user: "Sarah M.",
    movie: "The Shawshank Redemption",
    content: "A timeless classic that never fails to inspire.",
  },
];

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Thriller",
  "Animation",
  "Adventure",
  "Fantasy",
  "Crime",
  "Documentary",
];

export default function HomePage() {
  const [showGenres, setShowGenres] = useState(false);
  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getMovies = async () => {
    const url = "https://yts.mx/api/v2/list_movies.json?quality=3D";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setMovies(data.data.movies);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (!Movies) {
    return <div className="text-gray-900">Loading....</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="pt-11">
        <section className="relative h-screen homecont">
          <Image
            src={Movies[0]?.large_cover_image}
            alt="Featured Movie"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
          <div
            style={{ width: "100%" }}
            className="absolute bottom-0 left-0 p-16 w-2/3  "
          >
            <h2 className="text-6xl font-bold mb-4 hometext">
              {Movies[0]?.title}
            </h2>
            <p className="text-xl mb-6 line-clamp-3">
              {movies[0]?.description_full}
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <span className="bg-gray-800 text-sm px-3 py-1 rounded-full">
                Sci-Fi
              </span>
              <span className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" /> 8.6
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" /> {Movies[0]?.runtime}min
              </span>
            </div>
            <Link href={`/watch/?id=${Movies[0]?.id}`}>
              <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center text-lg font-semibold">
                <FaPlay className="mr-2" /> Watch Now
              </button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Trending Now</h2>
            <a
              href="/movies"
              className="text-red-600 hover:underline flex items-center text-lg"
            >
              View All <FaChevronRight className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Movies.map((movie, index) => (
              <Link href={`/watch/?id=${movie.id}`}>
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-80">
                    <Image
                      src={movie.medium_cover_image}
                      alt={movie.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="font-semibold text-xl mb-1">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-2">
                        {/* {movie.Director} */}
                      </p>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {movie.genres[0]}{" "}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <MovieList Movies={Movies} title={"Trending Now"} />

        <section className="bg-gray-800 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-8">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingMovies.map((movie, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-64">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center text-gray-400">
                      <FaCalendarAlt className="mr-2" />
                      <span>{movie.releaseDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-8">User Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <FaQuoteLeft className="text-red-600 text-3xl mb-4" />
                <p className="text-lg mb-4">{review.content}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.user}</span>
                  <span className="text-gray-400">on {review.movie}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-red-600 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8">
              Subscribe to our newsletter for the latest movie news and
              exclusive offers
            </p>
            <form className="max-w-lg mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-700 text-gray-900"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-r-full hover:bg-gray-800 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                ScreenScape
              </h3>
              <p className="text-gray-400">
                Your ultimate destination for movies and TV shows
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    Movies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    TV Shows
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    My List
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition duration-300"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition duration-300"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition duration-300"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400 border-t border-gray-800 pt-8">
            <p>&copy; 2024 CineVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
