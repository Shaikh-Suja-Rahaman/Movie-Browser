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

  function handleDeleteFromWatchList(movieId) {
  const updatedWatchList = watchList.filter(movie => movie.id !== movieId);
  setWatchList(updatedWatchList);
  // Update localStorage after deleting
  localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchList));
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