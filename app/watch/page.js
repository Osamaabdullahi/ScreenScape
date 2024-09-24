"use client";
import React, { useState, useEffect } from "react";
import Display from "../../component/Display";
import Navbar from "@/component/Navbar";
import MovieList from "@/component/cards/MovieList";
import Footer from "@/component/Footer";

function Page() {
  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getMovies = async () => {
    const url = "https://yts.mx/api/v2/list_movies.json?quality=3D";
    const response = await fetch(url);
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response.ok) {
      setMovies(data.data.movies);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (!Movies) {
    return <div>Loading.....</div>;
  }
  return (
    <>
      <Navbar />
      <Display />
      <MovieList Movies={Movies} title={"Related  Movies"} />
      <Footer />
    </>
  );
}

export default Page;
