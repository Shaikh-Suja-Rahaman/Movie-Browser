import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TiltedCard from '../animations/TiltedCard';
import { Calendar, Clock, Award, Users, Tag, Globe, Star, X, Landmark } from 'lucide-react';
import { MovieContext } from "../context/MovieContext";


const DetailsModal = ({ MovieObj, isOpen, onClose }) => {
  const { watchList, handleDeleteFromWatchList, handleAddToWatchList } = useContext(MovieContext);

  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  function doesContain(MovieObj) {
    if (!watchList || !Array.isArray(watchList)) {
      return false; // Return false if watchList is undefined or not an array
    }
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === MovieObj.id) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!isOpen) return;

    // Reset states when modal opens
    setLoading(true);
    setMovieDetails(null);
    setCredits(null);

    // Fetch movie details
    const fetchData = async () => {
      try {
        const [detailsResponse, creditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${MovieObj.id}?api_key=2742575c79cfcfb59b3768166cfe37d2&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${MovieObj.id}/credits?api_key=2742575c79cfcfb59b3768166cfe37d2&language=en-US`)
        ]);

        setMovieDetails(detailsResponse.data);
        setCredits(creditsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Cannot call API", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, MovieObj.id]);

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="scrollbar-hide fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm " onClick={onClose}></div>

      {loading ? (
        <div className="relative bg-gray-900 rounded-xl p-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-xl">Loading movie details...</p>
          </div>
        </div>
      ) : (
        <div className="relative bg-gray-900 text-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 scrollbar-hide">
          {/* Header with backdrop */}

          {movieDetails.backdrop_path === null ? (

              <div
            className="relative h-30 bg-cover bg-center rounded-t-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-t-xl"></div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 bg-gray-900/50 hover:bg-gray-900 p-2 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h2 className="text-4xl font-bold tracking-tight">{movieDetails.title}</h2>
              {movieDetails.tagline && (
                <p className="text-gray-300 italic mt-2">{movieDetails.tagline}</p>
              )}
            </div>
            </div>


          ) : (

            <div
            className="relative h-100 bg-cover bg-center rounded-t-xl"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-t-xl"></div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 bg-gray-900/50 hover:bg-gray-900 p-2 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h2 className="text-4xl font-bold tracking-tight">{movieDetails.title}</h2>
              {movieDetails.tagline && (
                <p className="text-gray-300 italic mt-2">{movieDetails.tagline}</p>
              )}
            </div>
            </div>

          )}





          <div className="p-6 flex flex-col md:flex-row gap-6">
            {/* Left column - Poster and rating */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="mb-6">
                <TiltedCard
                  imageSrc={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  captionText={movieDetails.title}
                  containerHeight="400px"
                  containerWidth="270px"
                  imageHeight="400px"
                  imageWidth="270px"
                  rotateAmplitude={7}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>

              {/* Rating card */}
              <div className="bg-gray-800 rounded-xl p-4 gap-2 w-full">



                {doesContain(MovieObj) ? (
  <div className=" bottom-2 flex justify-center left-2 ">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteFromWatchList(MovieObj.id);
      }}
      className="flex mb-4 items-center gap-2 px-3 py-3 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
    >
      <i className="fa-solid fa-heart"></i>
      <span>Added to watchlist</span>
    </button>
  </div>
) : (
  <div className=" bottom-2 flex justify-center left-2">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleAddToWatchList(MovieObj);
      }}
      className="flex mb-4 items-center gap-2 px-3 py-3 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
    >
      <i className="fa-regular fa-heart"></i>
      <span>Add to watchlist</span>
    </button>
  </div>
)}




                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-yellow-500">
                      <span  className=" flex flex-col items-center text-3xl font-bold"><Star className=" text-yellow-500" fill="currentColor" size={24} />{movieDetails.vote_average.toFixed(1)}</span>

                    </div>
                  </div>

                </div>

                <div className="text-center">
                  <p className="text-gray-400">
                    <span className="font-semibold">{movieDetails.vote_count.toLocaleString()}</span> votes
                  </p>
                </div>

              </div>
            </div>

            {/* Right column - Details */}
            <div className="md:w-2/3">
              {/* Overview section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{movieDetails.overview}</p>
              </div>

              {/* Key details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Release date */}
                <div className="flex items-start space-x-3">
                  <Calendar className="text-blue-400 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-400">Release Date</h4>
                    <p className="text-gray-300">{formatDate(movieDetails.release_date)}</p>
                  </div>
                </div>

                {/* Runtime */}
                <div className="flex items-start space-x-3">
                  <Clock className="text-blue-400 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-400">Runtime</h4>
                    <p className="text-gray-300">{formatRuntime(movieDetails.runtime)}</p>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex items-start space-x-3">
                  <Tag className="text-blue-400 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-400">Genres</h4>
                    <p className="text-gray-300">
                      {movieDetails.genres.map(genre => genre.name).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-start space-x-3">
                  <Globe className="text-blue-400 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-400">Languages</h4>
                    <p className="text-gray-300">
                      {movieDetails.spoken_languages.map(lang => lang.english_name).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Budget (if available) */}
                {movieDetails.budget > 0 && (
                  <div className="flex items-start space-x-3">
                    <Award className="text-blue-400 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-blue-400">Budget</h4>
                      <p className="text-gray-300">{formatCurrency(movieDetails.budget)}</p>
                    </div>
                  </div>
                )}

                {/* Revenue (if available) */}
                {movieDetails.revenue > 0 && (
                  <div className="flex items-start space-x-3">
                    <Landmark className="text-blue-400 flex-shrink-0" size={20}/>
                    {/* <Award className="text-blue-400 flex-shrink-0" size={20} /> */}
                    <div>
                      <h4 className="font-medium text-blue-400">Revenue</h4>
                      <p className="text-gray-300">{formatCurrency(movieDetails.revenue)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cast section */}
              {credits && credits.cast && credits.cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                    <Users className="mr-2" size={20} />
                    Cast
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {credits.cast.slice(0, 6).map(person => (
                      <div key={person.id} className="bg-gray-800 rounded-lg p-2 flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          {person.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                              <span className="text-xs text-gray-400">{person.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-medium truncate">{person.name}</p>
                          <p className="text-sm text-gray-400 truncate">{person.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Production companies */}
              {movieDetails.production_companies && movieDetails.production_companies.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Production Companies</h3>
                  <div className="flex flex-wrap gap-4">
                    {movieDetails.production_companies.map(company => (
                      <div key={company.id} className="flex items-center bg-gray-800 rounded-lg p-3">
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${company.logo_path}`}
                            alt={company.name}
                            className="h-6 mr-2 object-contain"
                          />
                        ) : null}
                        <span>{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer with actions */}

        </div>
      )}
    </div>
  );
};

export default DetailsModal;