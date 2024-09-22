import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                CineVerse
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
    </>
  );
}

export default Footer;
