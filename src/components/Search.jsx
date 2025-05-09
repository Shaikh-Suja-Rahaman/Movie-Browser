import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';
import Pagination from './Pagination';
import MovieCard from './MovieCard';

const Search = () => {
  const { watchList, handleAddToWatchList, searchTerm } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        if (!searchTerm) {
          setMovies([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              query: searchTerm,
              api_key: '2742575c79cfcfb59b3768166cfe37d2',
              page: page
            }
          }
        );

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  return (
    <>
      <div>
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : !movies?.length ? (
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