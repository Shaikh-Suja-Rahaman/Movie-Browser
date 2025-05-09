import { createContext, useState, useEffect, useRef} from "react";

export const MovieContext = createContext();

function MovieContextProvider({children}) {

  const [watchList, setWatchList] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
    setWatchList(savedMovies)
  }, [])

  function handleAddToWatchList(movieobj){

    if(watchList.includes(movieobj)) return;
    const updatedWatchList = [...watchList,movieobj];
    setWatchList(updatedWatchList);
    localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchList))

    console.log(updatedWatchList);
  }

  function handleDeleteFromWatchList(movieId){
    setWatchList(prevList => prevList.filter(movie => movie.id != movieId))
  }

  return(
    <>
      <MovieContext.Provider value={{watchList, setWatchList, handleAddToWatchList, handleDeleteFromWatchList, searchRef}}>
        {children}
      </MovieContext.Provider>
    </>
  )
}

export default MovieContextProvider;