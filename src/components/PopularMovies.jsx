import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from 'axios';
import Pagination from "./Pagination";
import {useContext} from "react";
import { MovieContext } from "../context/MovieContext";




function PopularMovies() {

  const {watchList, handleAddToWatchList} = useContext(MovieContext)

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const pageNext = () =>{
    setPage(page+1);
  }

  const pagePrev = () => {
    if(page>1){
      setPage(page-1);
    }
  }


  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2742575c79cfcfb59b3768166cfe37d2&language=en-US&page=1${page}`).then(function(response) {
      // console.log(response.data.results);
      // console.log(response)
      setMovies(response.data.results);
      setLoading(false);

    }).catch(function(err) {
      console.log("Cannot call TMDB API", err);
    }) //get is to get the data //axis makes an async call,  so its a promise effect call
  }, [page]) //this use effect runs only when you change the page
  console.log(movies); //this movies in actually an array

  return (
    <>

    <div>
      {/* <div className="flex justify-center m-8">
        <h1 className="font-oswald text-white text-4xl">TRENDING MOVIES</h1>
      </div> */}

      <div className="flex justify-evenly m-3 flex-wrap gap-20">
       {loading == true ? <div>LOADING</div> : movies.map((movieObj,i) => (
        <MovieCard key={`${page}-${i}`} movieObj={movieObj} handleAddToWatchList={handleAddToWatchList} watchList={watchList}/> //key={`${page}-${i}`}
      ))}
       </div>

       <Pagination pageNext={pageNext} pagePrev={pagePrev} page={page}/>
       </div>
    </>
  )
}

export default PopularMovies;