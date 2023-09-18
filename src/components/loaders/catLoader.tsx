import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import cat from "../../../public/cat.json";

const CatLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
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
