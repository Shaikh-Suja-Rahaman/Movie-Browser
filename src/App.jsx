import { useState,useEffect } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Divider from './components/Divider';
import Watchlist from './components/Watchlist';
import Tabs from './Tabs';
// import FadeContent from './animations/FadeContent'


import Banner from './components/Banner';
import PopularMovies from './components/PopularMovies';

import Navbar from './components/Navbar';

function App() {

  // const [watchList, setWatchList] = useState([]);


  // useEffect(() => {
  //   const savedMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
  //   setWatchList(savedMovies)
  // }, [])


  // function handleAddToWatchList(movieobj){

  //   const updatedWatchList = [...watchList,movieobj];
  //   setWatchList(updatedWatchList);
  //   localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchList))

  //   console.log(updatedWatchList);
  // }

  return(

      <BrowserRouter>

        <Navbar/>
        <Divider/>
        <Routes>
          <Route path='/' element={
            <>
              {/* <Banner/><Movies/>  yet to be added*/}
              <Banner/>
              <Divider/>
              {/* <FadeContent blur={true} duration={500} easing="ease-out" initialOpacity={0}> */}
              {/* <Movies handleAddToWatchList={handleAddToWatchList} watchList={watchList}/> */}
              {/* </FadeContent> */}
              <Tabs/>
            </>
          }/>
          <Route path='/watchlist' element={

            <>
              <Watchlist/>
            </>
          }
          />

        </Routes>

      </BrowserRouter>

      // <Navbar/>


  )
}

export default App
