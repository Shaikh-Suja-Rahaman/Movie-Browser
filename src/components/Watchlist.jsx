import React, { useState, useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import genreMap from "../utilities/genreids";

function Watchlist() {



  const { watchList, handleDeleteFromWatchList } = useContext(MovieContext);
  const [search, setSearch] = useState("");


  // const [activeGenre, setActiveGenre] = useState("All");
  const [genreList, setGenreList] = useState(["All Genres"]);

  console.log(genreMap);

  const filteredList = watchList.filter(movieObj => {

    if (genreList === 'All Genres'){
      return movieObj.title.toLowerCase().includes(search.toLowerCase());
    }

    return movieObj.title.toLowerCase().includes(search.toLowerCase()) && ((movieObj.genre_ids || []).map(id => genreMap[id]).filter(Boolean).join(", ").includes(genreList));

  }
  );

  useEffect(()=>{

  })



  return (
    <div className="bg-black min-h-screen pb-12">

      <div className="pt-8 pb-6 px-8">
        <h1 className="text-3xl font-bold text-white mb-4 flex justify-center">My Watchlist</h1>
        <div className="flex justify-center gap-5 m-6">
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "All Genres" ? " bg-blue-950" : ""}`} onClick={()=>setGenreList("All Genres")}>All Genres</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Action" ? " bg-blue-950" : ""}`} onClick={()=>setGenreList("Action")}>Action</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Adventure" ? " bg-blue-950" : ""}`} onClick={()=>setGenreList("Adventure")}>Adventure</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Animation" ? " bg-blue-950" : ""}`} onClick={()=>setGenreList("Animation")}>Animation</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Comedy" ? " bg-blue-950" : ""}`} onClick={()=>setGenreList("Comedy")}>Comedy</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Crime" ? " bg-blue-950" : ""}`}onClick={()=>setGenreList("Crime")}>Crime</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Drama" ? " bg-blue-950" : ""}`}onClick={()=>setGenreList("Drama")}>Drama</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Family" ? " bg-blue-950" : ""}`}onClick={()=>setGenreList("Family")}>Family</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Fantacy" ? " bg-blue-950" : ""}`}onClick={()=>setGenreList("Fantacy")}>Fantacy</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Horror" ? " bg-blue-950" : ""}`}onClick={()=>setGenreList("Horror")}>Horror</button>
          <button className={`text-1xl font-bold text-white border-2 border-blue-950 p-4 rounded-3xl cursor-pointer ${genreList === "Science Fiction" ? " bg-blue-950" : ""}`}onClick={()=>setGenreList("Science Fiction")}>Sci-fi</button>

        </div>
        <div className="relative flex justify-center">
          <input
            type="text"
            value={search}
            className="p-4 pl-6 border-2 border-gray-600 text-white rounded-full w-full md:w-2/3 lg:w-1/2 text-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent shadow-lg"
            placeholder="Search in your watchlist..."
            onChange={(e) => {setSearch(e.target.value)}}
          />
          {search && (
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="px-8">
        {filteredList.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-xl">
            <table className="w-full table-auto border-collapse bg-gray-900">
              <thead>
                <tr className="bg-[rgb(37,37,37)] text-left border-b border-gray-700">
                  <th className="px-6 py-4 w-[40%] text-gray-300 font-semibold">Name</th>
                  <th className="px-6 py-4 text-gray-300 font-semibold">Rating</th>
                  <th className="px-6 py-4 text-gray-300 font-semibold">Popularity</th>
                  <th className="px-6 py-4 text-gray-300 font-semibold">Genre</th>
                  <th className="px-6 py-4 text-center w-[10%] text-gray-300 font-semibold">Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredList.map((movieObj, index) => (
                  <tr
                    className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200"
                    key={index}
                  >
                    <td className="flex items-center px-6 py-4 gap-4">
                      <div className="h-24 w-16 rounded-md overflow-hidden flex-shrink-0 shadow-md">
                        <img
                          className="h-full w-full object-cover"
                          src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                          alt={movieObj.title}
                        />
                      </div>
                      <span className="ml-2 text-white font-medium">{movieObj.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-300 mr-1">★</span>
                        <span className="text-white">{movieObj.vote_average.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{movieObj.popularity.toFixed(1)}</td>
                    <td className="px-6 py-4 text-gray-300">
  {(movieObj.genre_ids || []).map(id => genreMap[id]).filter(Boolean).join(", ")}
</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteFromWatchList(movieObj.id)}
                        className="text-white hover:text-red-400 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )).reverse()}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            {search ? "No movies match your search" : "Your watchlist is empty"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;