import React from "react";
import bannerImage from "../assets/avengers_infinity_war_ver45_xlg.jpg"
function Banner() {

  return (
    <div
      className="w-[100%] h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
    </div>
  );
}

export default Banner;