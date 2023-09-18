"use client";

import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Ether3D from "../three/ether";
import { Josefin_Sans } from "next/font/google";

const inter = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const Hero = (props: { setVariant: (data: string) => void }) => {
  const [text, helper] = useTypewriter({
    words: ["safety", "privacy", "security", "data"],
    loop: false,
  });
  return (
    <div className={`${inter.className} relative h-screen`}>
      <div className="h-screen bg-gradient-to-bl from-gray-800 via-gray-950 to-black md:bg-gradient-to-l"></div>
      <div className="absolute top-0 flex h-screen w-full justify-center">
        {/* for pc */}
        <div className="hidden h-full w-full max-w-6xl grid-cols-8 lg:grid">
          <div className="col-span-5 h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div
                onMouseEnter={() => {
                  props.setVariant("hero");
                }}
                onMouseLeave={() => {
                  props.setVariant("default");
                }}
                className="w-[500px]"
              >
                <div className="pb-2 text-5xl uppercase text-gray-300">
                  we provide
                </div>
                <div className="flex text-8xl font-extrabold uppercase ">
                  <div className="bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 bg-clip-text text-8xl uppercase text-transparent">
                    {text}
                  </div>
                  <Cursor cursorColor="white" />
                </div>
                <div className="text-5xl uppercase text-gray-300">
                  to the health
                </div>
                <div className="text-5xl uppercase text-gray-300">system.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex h-full w-full items-center justify-center">
            <div className="h-full w-full pt-14">
              <Ether3D size={2} />
            </div>
          </div>
        </div>
        {/* for mobile */}
        <div className="flex h-full w-full items-center justify-center lg:hidden">
          <div className="flex h-full w-full flex-col items-center justify-around">
            <div className="h-full w-full pt-32">
              <Ether3D size={3} />
            </div>
            <div className="items-cente flex h-full w-full justify-center">
              <div
                onMouseEnter={() => {
                  props.setVariant("hero");
                }}
                onMouseLeave={() => {
                  props.setVariant("default");
                }}
                className="md:w-[500px]"
              >
                <div className="pb-2 text-center text-4xl uppercase md:text-5xl">
                  we provide
                </div>
                <div className="flex justify-center text-6xl font-extrabold uppercase md:text-8xl ">
                  <div className="bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 bg-clip-text text-center uppercase text-transparent">
                    {text}
                  </div>
                  <Cursor cursorColor="white" />
                </div>
                <div className="text-center text-4xl uppercase md:text-5xl">
                  to the health
                </div>
                <div className="text-center text-4xl uppercase md:text-5xl">
                  system.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
