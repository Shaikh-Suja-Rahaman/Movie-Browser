import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';
import Pagination from './Pagination';
import MovieCard from './MovieCard';

const Search = () => {
  const { watchList, handleAddToWatchList, searchQuery } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const pagePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  React.useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query: searchQuery,
          api_key: '2742575c79cfcfb59b3768166cfe37d2',
          page: page,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Cannot call TMDB API', err);
        setLoading(false);
      });
  }, [searchQuery, page]);

  return (
    <>
      <div>
        {loading ? (
          <div className='flex flex-col justify-center items-center'>
            <div className="m-5 h-16 w-16 border-4 border-blue-800 rounded-full animate-spin border-t-transparent"></div>
            <div className="text-white text-center">Loading...</div>
          </div>
        ) : !movies?.length && searchQuery ? (
          <div className="text-white text-center m-5 text-2xl">No results found</div>
        ) : (
          <>
          <div className="text-white flex justify-center m-5 text-2xl">
  <h1 className="mr-2">Showing Results for</h1>
  <span className="font-bold text-gray-300">{searchQuery}</span>
</div>


          <div className="flex justify-evenly m-3 mt-10 flex-wrap gap-20">
            {movies.map((movieObj, i) => (
              <MovieCard
                key={`${page}-${i}`}
                movieObj={movieObj}
                handleAddToWatchList={handleAddToWatchList}
                watchList={watchList}
              />
            ))}
          </div>
          </>
        )}
        {totalPages === 1 ? (
          <>

          </>
        ) : (
          <>
            <Pagination pageNext={pageNext} pagePrev={pagePrev} page={page} />
          </>
        )

        }

      </div>
    </>
  );
};

export default Search;