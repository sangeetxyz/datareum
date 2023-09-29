import React from "react";
import waves from "../../../public/waves.png";
import hero from "../../../public/hero.svg";
import av1 from "../../../public/avatar-1.png";
import av3 from "../../../public/avatar-3.png";
import av4 from "../../../public/avatar-4.png";
import av5 from "../../../public/avatar-5.png";
import av6 from "../../../public/avatar-6.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import Magnetic from "../containers/magnetic";
const HeroSection = (props: { setVariant: (data: string) => void }) => {
  return (
    <div className="relative">
      <div className="h-screen bg-black">
        <img
          src={waves.src}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
      </div>
      <div className="bg-slate-60 absolute top-0 flex h-screen w-full justify-center pt-20 text-white xl:pt-10">
        <div className="bg-neutral-70 flex h-full w-full max-w-[94rem] flex-col justify-center xl:flex-row">
          <div className="bg-red-95 lg justify-cente flex w-full items-center justify-center md:mt-10 xl:ml-8 xl:mt-0 2xl:ml-0">
            <div className="flex flex-col items-center xl:items-start">
              <div className="lg:text-md mb-2 ml-1 text-sm uppercase 2xl:text-xl">
                keep your data safe{" "}
                <span className="text-2xl font-extrabold text-teal-400">!</span>
              </div>
              <div className="flex flex-col items-center xl:items-start">
                <div
                  className="whitespace-nowrap bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500 bg-clip-text text-4xl font-bold capitalize text-transparent sm:text-5xl lg:text-6xl 2xl:text-7xl"
                  onMouseEnter={() => {
                    props.setVariant("hero");
                  }}
                  onMouseLeave={() => {
                    props.setVariant("default");
                  }}
                >
                  Blockchain powered
                </div>
                <div
                  className="my-2 text-4xl font-bold capitalize text-teal-400 sm:text-5xl lg:text-6xl 2xl:text-7xl"
                  onMouseEnter={() => {
                    props.setVariant("hero");
                  }}
                  onMouseLeave={() => {
                    props.setVariant("default");
                  }}
                >
                  data exchange
                </div>
                <div
                  className="bg-gradient-to-l from-gray-200 via-gray-300 to-gray-500 bg-clip-text text-3xl font-bold capitalize text-transparent xs:text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl"
                  onMouseEnter={() => {
                    props.setVariant("hero");
                  }}
                  onMouseLeave={() => {
                    props.setVariant("default");
                  }}
                >
                  for the healthcare
                </div>
              </div>
              <div className="mt-7 hidden flex-col items-center space-y-4 md:flex">
                <div className="h-[2px] w-[25rem] bg-gradient-radial from-white xl:bg-gradient-to-l xl:from-transparent xl:to-white"></div>
                <div className="flex justify-center">
                  <div className="flex w-96 justify-between">
                    <div className="relative flex h-16">
                      <img
                        src={av3.src}
                        alt=""
                        className="absolute left-0 h-full rounded-full border-2"
                      />
                      <img
                        src={av1.src}
                        alt=""
                        className="absolute left-10 h-full rounded-full border-2 "
                      />
                      <img
                        src={av4.src}
                        alt=""
                        className="absolute left-[5rem] h-full rounded-full border-2"
                      />
                      <img
                        src={av5.src}
                        alt=""
                        className="absolute left-[7.5rem] h-full rounded-full border-2"
                      />
                      <img
                        src={av6.src}
                        alt=""
                        className="absolute left-[10rem] h-full rounded-full border-2"
                      />
                      <img src={av6.src} alt="" className="" />
                    </div>
                    <div className="relative flex flex-col items-start justify-center">
                      <div className="text-2xl font-bold">168K+</div>
                      <div className="">Secure Data Rows</div>
                    </div>
                  </div>
                </div>
                <div className="h-[2px] w-[25rem] bg-gradient-radial from-white to-transparent xl:bg-gradient-to-l xl:from-transparent xl:to-white"></div>
              </div>
              <div className="ml-4 mt-8 flex flex-col items-center xl:flex-row">
                <div className="relative -ml-4 flex">
                  <div className="h-24 w-24 rounded-full bg-teal-400 from-violet-500 to-teal-500"></div>
                  <div className="absolute left-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-teal-400 bg-gradient-to-tr from-violet-500 to-teal-500 xl:left-8">
                    {/* <Magnetic> */}
                    <motion.div
                      initial={{
                        x: -10,
                      }}
                      animate={{
                        x: 0,
                      }}
                      whileHover={{
                        scale: 1.2,
                      }}
                      whileTap={{
                        scale: 0.8,
                        x: 20,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <AiOutlineArrowRight size={30} />
                    </motion.div>
                    {/* </Magnetic> */}
                  </div>
                </div>
                <div className="ml-16 hidden max-w-sm text-sm xl:block">
                  Ethereum blockchain offers notable benefits in terms of
                  privacy. By leveraging cryptographic techniques and
                  decentralized architecture, Ethereum enhances user privacy in
                  several ways.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-red-90 flex w-full items-center justify-center overflow-hidden ">
            <img
              src={hero.src}
              alt=""
              className="h-full w-full xl:scale-110 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
