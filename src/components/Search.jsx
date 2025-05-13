import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';
import Pagination from './Pagination';
import MovieCard from './MovieCard';

const Search = () => {
  const { watchList, handleAddToWatchList } = useContext(MovieContext);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue);
      setPage(1); // Reset to first page on new search
    }
  };

  const pageNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const pagePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
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
      <div className="flex justify-center my-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="p-2 rounded w-1/2"
          placeholder="Search for movies and press Enter..."
        />
      </div>
      <div>
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : !movies?.length && searchQuery ? (
          <div className="text-white text-center">No results found</div>
        ) : (
          <div className="flex justify-evenly m-3 flex-wrap gap-20">
            {movies.map((movieObj, i) => (
              <MovieCard
                key={`${page}-${i}`}
                movieObj={movieObj}
                handleAddToWatchList={handleAddToWatchList}
                watchList={watchList}
              />
            ))}
          </div>
        )}

        <Pagination pageNext={pageNext} pagePrev={pagePrev} page={page} />
      </div>
    </>
  );
};

export default Search;