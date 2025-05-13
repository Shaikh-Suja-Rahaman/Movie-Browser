import { useState, useEffect, useContext } from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Divider from './components/Divider';
import Watchlist from './components/Watchlist';
import Tabs from './Tabs';
import { MovieContext } from './context/MovieContext';
import Search from './components/Search';

import Banner from './components/Banner';
import PopularMovies from './components/PopularMovies';

import Navbar from './components/Navbar';

function App() {
  const { searchQuery } = useContext(MovieContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Divider />
      <Routes>

        <Route path='/' element={
          <>
            {searchQuery.trim() === "" ? (
              <>
                <Banner />
                <Divider />
                <Tabs />
              </>
            ) : (
              <Search />
            )}
          </>
        }/>
        <Route path='/watchlist' element={
          <>
          {searchQuery.trim() === "" ? (
            <>
              <Watchlist/>
            </>
            ) : (
              <Search />
            )}
          </>
        }/>
        {/* <Route path='/watchlist' element={<Watchlist />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
