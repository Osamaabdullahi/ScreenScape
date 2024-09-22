"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, User, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/?search=${encodeURIComponent(searchQuery)}`);
  };

  // const handleAuth = () => {
  //   // Toggle authentication state (for demonstration purposes)
  //   setIsAuthenticated(!isAuthenticated);
  //   router.push("sighin");
  // };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500   bg-gradient-to-b from-gray-900 to-black ${
        isScrolled ? "bg-black" : "bg-transparent"
      }}
      `}
      style={{
        padding: "10px 0 15px 0 ",
        position: "fixed",
        top: 0,
        zIndex: 1,
        // backgroundColor: "black",
        left: 0,
        right: 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span
                style={{ margin: "0 50px 0 0 " }}
                className="text-red-600 text-2xl font-bold"
              >
                ScreenScape
              </span>
            </Link>
            <div className="hidden md:block ml-8   mobile">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/Tvshows"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  TV Shows
                </Link>
                <Link
                  href="/movies"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Movies
                </Link>
                <Link
                  href="/newpopular"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  New & Popular
                </Link>
                <Link
                  href="/mylist"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  My List
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center mobile">
            <form onSubmit={handleSearch} className="mr-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </form>
            {isAuthenticated ? (
              <>
                <button className="text-gray-300 hover:text-white p-1">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="text-gray-300 hover:text-white p-1 ml-4">
                  <User className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link href="sighin">
                <button
                  // onClick={handleAuth}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>{" "}
          <div className="md:hidden flex items-center bar">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && <MobileNav />}
    </nav>
  );
};

export default Navbar;

const MobileNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/?search=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <>
      <div className="md:hidden bg-black transition-all duration-300">
        <div className="px-4 py-3 space-y-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </form>

          <Link href="/" className="block text-gray-300 hover:text-white">
            Home
          </Link>
          <Link
            href="/Tvshows"
            className="block text-gray-300 hover:text-white"
          >
            TV Shows
          </Link>
          <Link href="/movies" className="block text-gray-300 hover:text-white">
            Movies
          </Link>
          <Link
            href="/newpopular"
            className="block text-gray-300 hover:text-white"
          >
            New & Popular
          </Link>
          <Link href="/mylist" className="block text-gray-300 hover:text-white">
            My List
          </Link>

          {isAuthenticated ? (
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-white">
                <Bell className="h-6 w-6" />
              </button>
              <button className="text-gray-300 hover:text-white">
                <User className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
