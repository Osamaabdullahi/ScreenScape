import React from "react";
import Navbar from "@/component/Navbar";
import Tvshows from "@/component/TvShows";
import Footer from "@/component/Footer";

function page() {
  return (
    <>
      <Navbar />
      <Tvshows />
      <Footer />
    </>
  );
}

export default page;
