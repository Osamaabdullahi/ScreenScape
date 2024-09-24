import React from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function MovieList({ Movies, title }) {
  return (
    <section className="bg-gray-900 container mx-auto px-6 py-16  ">
      <div className="flex justify-between items-center mb-8  ">
        <h2 className="text-3xl font-semibold" style={{ color: "white" }}>
          {title}
        </h2>
        <a
          href="/movies"
          className="text-red-600 hover:underline flex items-center text-lg"
        >
          View All <FaChevronRight className="ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {Movies.map((movie) => (
          <Link href={`/watch/?id=${movie.id}`} key={movie.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-80">
                <Image
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white-300 font-semibold text-xl mb-1 ">
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
  );
}

export default MovieList;
