"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/component/Navbar";
import MovieList from "@/component/cards/MovieList";
import Footer from "@/component/Footer";

function Page() {
  const [Movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = async (page) => {
    const url = `https://yts.mx/api/v2/list_movies.json?quality=3D&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setMovies(data.data.movies);
      setTotalPages(
        data.data.movie_count > 0 ? Math.ceil(data.data.movie_count / 20) : 1
      ); // Assuming 20 movies per page
    } else {
      console.error("Failed to fetch movies");
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="bg-gray-900">
      <Navbar />
      <MovieList Movies={Movies} title={"new and popular"} />
      <div className="flex justify-center space-x-4 mt-4 bg-gray-900 ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
