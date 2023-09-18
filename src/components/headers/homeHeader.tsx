import { useAuth } from "@/context/context";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowRight, AiTwotoneExperiment } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import {
  AnimatePresence,
  AnimationProps,
  motion,
  useTransform,
} from "framer-motion";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsBookHalf, BsPeople } from "react-icons/bs";
import {
  MdOutlineConnectWithoutContact,
  MdOutlineContactless,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import Magnetic from "../containers/magnetic";
const HomeHeader = (props: { setVariant: (data: string) => void }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isNavOpened, setIsNavOpened] = useState(false);

  return (
    <div className="bg-slate-40 border- fixed top-0 z-10 flex h-20 w-full justify-center border-gray-700">
      <div className="bg-red-30 flex w-full max-w-[94rem] items-center justify-between px-4 2xl:pl-0 2xl:pr-0">
        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center">
            <FaEthereum size={28} color="white" />
            <div
              className="text-xl uppercase text-white md:text-2xl lg:text-3xl"
              onClick={() => {
                router.push("/");
              }}
            >
              datareum
            </div>
          </div>
        </div>
        <div className="hidden space-x-10 text-sm uppercase lg:flex">
          <Magnetic>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onMouseEnter={() => {
                props.setVariant("hover");
              }}
              onMouseLeave={() => {
                props.setVariant("default");
              }}
              onClick={() => {
                router.push("/docs");
              }}
            >
              docs
            </motion.div>
          </Magnetic>
          <Magnetic>
            {" "}
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onMouseEnter={() => {
                props.setVariant("hover");
              }}
              onMouseLeave={() => {
                props.setVariant("default");
              }}
              onClick={() => {
                router.push("/explore");
              }}
            >
              explore
            </motion.div>
          </Magnetic>
          <Magnetic>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onMouseEnter={() => {
                props.setVariant("hover");
              }}
              onMouseLeave={() => {
                props.setVariant("default");
              }}
              onClick={() => {
                router.push("/docs");
              }}
            >
              privacy
            </motion.div>
          </Magnetic>
          <Magnetic>
            {" "}
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onMouseEnter={() => {
                props.setVariant("hover");
              }}
              onMouseLeave={() => {
                props.setVariant("default");
              }}
              onClick={() => {
                router.push("/contact");
              }}
            >
              contact
            </motion.div>
          </Magnetic>
          <Magnetic>
            {" "}
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onMouseEnter={() => {
                props.setVariant("hover");
              }}
              onMouseLeave={() => {
                props.setVariant("default");
              }}
              onClick={() => {
                router.push("/about");
              }}
            >
              about
            </motion.div>
          </Magnetic>
        </div>
        {/* <Magnetic> */}
        <motion.div
          className="hidden items-center rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-4 py-3 lg:flex"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => {
            if (!user) {
              router.push("/signin");
            } else {
              router.push("/dashboard");
            }
          }}
        >
          <div className="mx-1 text-sm uppercase">
            {user ? "dashboard" : "join now"}
          </div>
          <AiOutlineArrowRight size={20} />
        </motion.div>
        {/* </Magnetic> */}
        <div className=" lg:hidden">
          <RiMenu4Fill
            size={35}
            onClick={() => {
              setIsNavOpened(true);
            }}
          />
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
                  <div className="text-xl font-bold uppercase">login</div>
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
                    x: -100,
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
                    contact
                  </div>
                  <MdOutlineContactless size={25} />
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
                  <div className="mr-1 text-xl font-bold uppercase">about</div>
                  <BsPeople size={25} />
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

export default HomeHeader;
