"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

const defaultImage =
  "https://yts.mx/assets/images/movies/spider_man_no_way_home_2021/background.jpg";

const MoviePlayer = () => {
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [Details, setDetails] = useState(null);
  const [MovieInfo, setMovieInfo] = useState(null);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const getMoviesDetails = async () => {
    const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setDetails(data.data.movie);
      setMovieInfo(data.data.movie);
    }
  };

  useEffect(() => {
    getMoviesDetails();
  }, [id]);

  const handleVideoPlay = () => {
    setIsVideoStarted(true);
  };

  if (!Details) {
    return <div>Loading....</div>;
  }

  return (
    <div
      className="bg-black min-h-screen "
      style={{ backgroundColor: "black", padding: "20px 0 0 0 " }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1">
          {/* Video/Poster Section */}
          <div className="relative w-full ">
            {!isVideoStarted && (
              <div className="relative aspect-w-16 aspect-h-9 ">
                <img
                  src={
                    Details?.background_image
                      ? Details?.background_image
                      : defaultImage
                  }
                  alt={`${Details?.title} Poster`}
                  className="w-full h-screen object-cover rounded-lg shadow-lg"
                  // style={{ width: "100%", height: "100vh" }}
                />
                {/* Play button overlay */}
                <button
                  onClick={handleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FaPlay color="white" size={75} />
                </button>
              </div>
            )}
            {isVideoStarted && (
              <div className="aspect-w-16 aspect-h-9">
                {/* <video
                  className="w-full h-full rounded-lg"
                  controls
                  autoPlay
                  src={"/movie.mp4"}
                  style={{ width: "100%" }}
                ></video> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/osYpGSz_0i4?si=lhoKwdLvAqK65bp8"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  style={{ width: "100%", height: "100vh" }}
                ></iframe>
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="mt-6">
            <h2 className="font-extrabold text-white mb-4   text-4xl ">
              {Details?.title}
            </h2>
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <span>{Details?.year}</span>
              <span className="mx-2">•</span>
              <span>{Details.runtime} min</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {Details?.description_full}
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
  );
};

export default MoviePlayer;
