import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DetailsModal = ({MovieObj, isOpen, onClose}) => {


  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${MovieObj.id}?api_key=2742575c79cfcfb59b3768166cfe37d2&language=en-US`).then(function(response){
    setMovieDetails(response);
    console.log(response);
    setLoading(false);
  }).catch(function(err) {
    console.log("Cannot call api", err);
  })
  },[isOpen])

  if(!isOpen) return null;

  return (
    <>
    {loading == true ? (<div>loading . . .</div>) : (<div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"></div>
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 gap-4 text-white rounded-xl shadow-lg p-6 flex max-w-3xl w-full">
          <div className='poster w-1/3'>
            <img className='w-60 rounded-md' src={`https://image.tmdb.org/t/p/w500${movieDetails.data.poster_path}`}/>
            <div
                className="flex items-center text-white bottom-0 right-[-1px] p-2 text-[20px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20
">
                <i class="text-amber-400 text-[15px] fa-solid m-1 fa-star"></i>
                {movieDetails.data.vote_average.toFixed(1)}
              </div>
          </div>
          <div className='w-2/3'>
            <h2 className="text-2xl font-semibold mb-2">{movieDetails.data.title}</h2>
            <p className='font-bold text-gray-400'>Overview</p>
            <p className="mb-6">{movieDetails.data.overview}</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
            </div>
        </div>
      </div>
    </div>)}
    </>
  )
}

export default DetailsModal