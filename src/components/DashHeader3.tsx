"use client";
import React, { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsBookHalf } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  AnimationProps,
  motion,
  useTransform,
} from "framer-motion";
import { AiTwotoneExperiment } from "react-icons/ai";
import { useAuth } from "@/context/context";
const Header = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  return (
    <div className="fixed top-0 z-10 w-full">
      {/* for pc */}
      <div className="flex w-full items-center justify-center border-b border-gray-700 backdrop-blur-md">
        <div className="flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center">
            <FaEthereum size={28} color="white" />
            <div
              className="cursor-pointer font-mono text-3xl uppercase text-white"
              onClick={() => {
                router.push("/");
              }}
            >
              datereum
            </div>
          </div>
          <div className="mr-4 hidden items-center space-x-8 md:flex">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="cursor-pointer uppercase"
              onClick={() => {
                router.push("/explore");
              }}
            >
              explore
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="cursor-pointer uppercase"
              onClick={() => {
                router.push("/docs");
              }}
            >
              docs
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="cursor-pointer uppercase"
              onClick={() => {
                router.push("/privacy");
              }}
            >
              privacy
            </motion.div>
            {/* <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="uppercase"
              onClick={() => {
                router.push("/privacy");
              }}
            >
              help
            </motion.div> */}
          </div>
          <div className="md:hidden">
            <RiMenu4Fill
              size={30}
              onClick={() => {
                setIsNavOpened(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* for mobile */}
      <AnimatePresence>
        {isNavOpened ? (
          <motion.div
            key={"mobile_menu"}
            initial={{
              backdropFilter: `blur(0px) brightness(100%)`,
            }}
            animate={{
              backdropFilter: `blur(15px)  brightness(70%)`,
            }}
            exit={{
              backdropFilter: `blur(0px) brightness(100%)`,
            }}
            transition={{
              duration: 1,
            }}
            className="fixed top-0 h-screen w-screen"
          >
            <div
              className="flex h-full w-full items-center justify-center"
              onClick={() => {
                setIsNavOpened(false);
              }}
            >
              <div className="bg-yellow-60 flex w-64 flex-col items-center space-y-4 py-4">
                <motion.div
                  id="started"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="flex cursor-pointer items-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!user) {
                      router.push("/signin");
                    } else {
                      router.push("/dashboard");
                    }
                  }}
                >
                  <div className="text-xl font-bold uppercase">get started</div>
                  <BiRightArrowAlt size={28} />
                </motion.div>
                <motion.div
                  id="docs"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 100,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="flex cursor-pointer items-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push("/docs");
                  }}
                >
                  <div className="mr-2 text-xl font-bold uppercase">docs</div>
                  <BsBookHalf size={23} />
                </motion.div>
                <motion.div
                  id="docs"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="flex cursor-pointer items-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push("/docs");
                  }}
                >
                  <div className="mr-2 text-xl font-bold uppercase">
                    explore
                  </div>
                  <AiTwotoneExperiment size={23} />
                </motion.div>
                <motion.div
                  id="privacy"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 100,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="flex cursor-pointer items-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push("/privacy");
                  }}
                >
                  <div className="mr-1 text-xl font-bold uppercase">
                    privacy
                  </div>
                  <MdOutlinePrivacyTip size={25} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
