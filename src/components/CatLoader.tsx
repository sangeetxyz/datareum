import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import cat from "../../public/cat.json";

const CatLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-950">
      <Player
        autoplay
        loop
        src={cat}
        style={{ height: "100px", width: "100px" }}
      ></Player>
    </div>
  );
};

export default CatLoader;
