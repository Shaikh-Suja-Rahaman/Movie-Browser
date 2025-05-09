import React, { useState } from 'react';
import TopRated from './components/TopRated';
import PopularMovies from './components/PopularMovies';
import Upcoming from './components/Upcoming';
import './Tabs.css';
import Dock from './animations/Dock';
import { VscFlame, VscStarFull, VscCalendar } from 'react-icons/vsc';
import NowPlaying from './components/NowPlaying';

function Tabs() {
  const [activeComponent, setActiveComponent] = useState("PopularMovies");

  return (
    <>
    <div className="flex text-lg m-12 gap-4 text-white justify-center">
  <button
    className={`px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-md ${
      activeComponent === "PopularMovies" ? "border-blue-500 text-blue-400" : ""
    }`}
    onClick={() => setActiveComponent("PopularMovies")}
  >
    Popular
  </button>
  <button
    className={`px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-md ${
      activeComponent === "TopRated" ? "border-yellow-400 text-yellow-300" : ""
    }`}
    onClick={() => setActiveComponent("TopRated")}
  >
    Top Rated
  </button>
  <button
    className={`px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-md ${
      activeComponent === "Upcoming" ? "border-purple-500 text-purple-300" : ""
    }`}
    onClick={() => setActiveComponent("Upcoming")}
  >
    Upcoming
  </button>
  <button
    className={`px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-md ${
      activeComponent === "NowPlaying" ? "border-green-400 text-green-300" : ""
    }`}
    onClick={() => setActiveComponent("NowPlaying")}
  >
    Now Playing
  </button>
</div>


      <div>
        {activeComponent === "PopularMovies" && <div><PopularMovies/></div>}
        {activeComponent === "TopRated" && <div><TopRated/></div>}
        {activeComponent === "Upcoming" && <div><Upcoming/></div>}
        {activeComponent === "NowPlaying" && <div><NowPlaying/></div>}
      </div>


    </>
  );

}

export default Tabs;