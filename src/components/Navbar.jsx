import React from "react";
import movieLogo from "../assets/movie_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function Navbar() {
  const { search, setSearch, searchRef } = useContext(MovieContext);

  return (
    <>
      <div className="fixed top-0 w-full z-50 font-sans border-s-gray-900 backdrop-blur-lg h-auto shadow-lg">
        <div className="p-4 flex items-center justify-between text-gray-400">
          <div className="flex gap-3 text-2xl items-center">
            <Link to="/">
              <img className="w-[40px] invert" src={movieLogo} alt="Logo" />
            </Link>
            <Link
              to="/"
              className="bg-transparent hover:text-white ml-3 px-3 py-1 rounded-4xl transition-all duration-200 ease-in-out
              hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            >
              MOVIES
            </Link>
            <Link
              to="/watchlist"
              className="bg-transparent hover:text-white px-3 py-1 rounded-4xl transition-all duration-200 ease-in-out
              hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            >
              WATCHLIST
            </Link>
            <Link
              to="/recommendations"
              className="bg-transparent hover:text-white px-3 py-1 rounded-4xl transition-all duration-200 ease-in-out
              hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            >
              AI RECOMMENDATIONS
            </Link>
          </div>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              ref = {searchRef}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Movie ..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-gray-400"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg"></i>
          </div>
        </div>
      </div>
      {/* Add margin-top to the main content */}
      <div className="mt-20"></div>
    </>
  );
}

export default Navbar;
