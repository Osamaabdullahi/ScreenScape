"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import TvshowsList from "@/component/cards/TvshowList";
import { useSearchParams } from "next/navigation";
import { FaPlay } from "react-icons/fa";

const defaultImage =
  "https://yts.mx/assets/images/movies/spider_man_no_way_home_2021/background.jpg";

function Page() {
  const [Movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [Details, setDetails] = useState(null);
  const searchParams = useSearchParams();
  const [isVideoStarted, setIsVideoStarted] = useState(false);

  const id = searchParams.get("id");

  const getMovies = async () => {
    const url = `https://api.tvmaze.com/shows`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setMovies(data.slice(0, visibleCount));
    }
  };

  const getMoviesDetails = async () => {
    const url = `https://api.tvmaze.com/shows/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setDetails(data);
    }
  };

  useEffect(() => {
    getMovies();
    getMoviesDetails();
  }, [id]);

  const handleVideoPlay = () => {
    setIsVideoStarted(true);
  };

  if (!Details) {
    return <div className="text-gray-900">Loading....</div>;
  }

  return (
    <>
      <Navbar />
      <div
        className="bg-black min-h-screen "
        style={{ backgroundColor: "black", padding: "5rem 0 0 0 " }}
      >
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1">
            {/* Video/Poster Section */}
            <div className="relative w-full">
              {!isVideoStarted && (
                <div className="relative aspect-w-16 aspect-h-9  ">
                  <img
                    src={
                      Details?.image.original
                        ? Details?.image.original
                        : defaultImage
                    }
                    alt={`${Details?.name} Poster`}
                    className="w-full h-screen object-cover rounded-lg shadow-lg"
                    // style={{ width: "100%", height: "100vh" }}
                  />
                  {/* Play button overlay */}
                  <button
                    onClick={handleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <FaPlay color="white" size={100} />
                  </button>
                </div>
              )}
              {isVideoStarted && (
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    className="w-full h-full rounded-lg"
                    controls
                    autoPlay
                    src={"/movie.mp4"}
                    style={{ width: "100%" }}
                  ></video>
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="mt-6 pb-10">
              <h2 className="font-extrabold text-white mb-4   text-4xl ">
                {Details?.name}
              </h2>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <span>{Details?.premiered}</span>
                <span className="mx-2">•</span>
                <span>{Details.runtime} min</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {Details?.summary}
              </p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Director
                </h3>
                {/* <p className="text-gray-300">{movie.director}</p> */}
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Cast</h3>
                {/* <p className="text-gray-300">{movie.cast.join(", ")}</p> */}
              </div>
              <div className="flex flex-wrap gap-2">
                {Details.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TvshowsList Movies={Movies} title={"Related  Tv shows"} />
      <Footer />
    </>
  );
}

export default Page;
