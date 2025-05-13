import React,{useState} from "react";
import FadeContent from '../animations/FadeContent'
import ClickSpark from '../animations/ClickSpark';
import TiltedCard from '../animations/TiltedCard';
import DetailsModal from "./DetailsModal";
import {useContext} from "react";
import { MovieContext } from "../context/MovieContext";

function MovieCard({ movieObj, handleAddToWatchList, watchList }) {
  //write a function which checks if a movie id exists in the watchList or not, if it exists, don't add the movie to the watchList, to avoid dublicated
  const [isModalOpen, setIsModalOpen] = useState(false);
    const {handleDeleteFromWatchList} = useContext(MovieContext)

  const showMovieDetail = () =>{
    setIsModalOpen(true);
  }
  //handleDeleteFromWatchList


  function doesContain(movieObj) {
    if (!watchList || !Array.isArray(watchList)) {
      return false; // Return false if watchList is undefined or not an array
    }
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
    <FadeContent blur={true} duration={500} easing="ease-out" initialOpacity={0}>

    <div className="cursor-pointer scale-105 w-[200px] rounded-lg overflow-hidden hover:brightness-90 transition-all duration-200 ease-in-out" >


        <div
          onClick={()=>showMovieDetail()}
          className="relative h-[40vh] w-[200px] bg-center bg-cover"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w500${movieObj.poster_path}")`,
          }}
        >
          <div
  className="absolute text-white top-0 left-0 w-full p-1 text-center bg-gray-500/30 backdrop-blur-sm"
>
  {movieObj.title}
</div>
          {doesContain(movieObj) ? (
            <div className="absolute text-red-500 bottom-0 left-0 w-full p-2 text-2xl">

              <i
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFromWatchList(movieObj.id);
                }}
                className="hover:text-red-600 fa-solid fa-heart hover:cursor-pointer"

              ></i>
                            {/*  */}

              <div
                className="absolute flex items-center text-white bottom-0 right-[-1px] p-2 text-[20px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-100"

              >
                <i class="text-amber-400 text-[15px] fa-solid m-1 fa-star"></i>
                {typeof movieObj.vote_average === "number"
    ? movieObj.vote_average.toFixed(1)
    : "N/A"}
              </div>
            </div>


          ) : (
            <div className="absolute text-white bottom-0 left-0 w-full p-2 text-2xl">

              <i
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWatchList(movieObj);
                }}
                class="fa-regular fa-heart hover:cursor-pointer"
              ></i>

              <div
                className="absolute flex items-center text-white bottom-0 right-[-1px] p-2 text-[20px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20
"
              >
                <i className="text-amber-400 text-[15px] fa-solid m-1 fa-star"></i>
                {typeof movieObj.vote_average === "number"
    ? movieObj.vote_average.toFixed(1)
    : "N/A"}
              </div>

            </div>
          )}
        </div>


      </div>
    </FadeContent>
    <DetailsModal
    MovieObj={movieObj}
    isOpen={isModalOpen} //checking if modal is open or not
    onClose={()=> setIsModalOpen(false)} //what to do when
    />



    </>
  );
}

export default MovieCard;
