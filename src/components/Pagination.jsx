import React, {useState} from "react";

function Pagination({pageNext, pagePrev, page}) {


  return(
    <>
    <div className="p-3 mt-8 flex justify-center items-center bg-black gap-5">
      <i onClick={pagePrev} className=" text-white text-3xl fa-solid fa-circle-arrow-left transition-transform transform ease-in-out duration-300 hover:text-gray-400  cursor-pointer"></i>
      <div className="text-2xl text-white">
        {page}
      </div>
      <i onClick={pageNext} className= "text-white text-3xl fa-solid fa-circle-arrow-right transition-transform transform ease-in-out duration-300 hover:text-gray-400 cursor-pointer"></i>
    </div>
    </>
  )
}

export default Pagination;
