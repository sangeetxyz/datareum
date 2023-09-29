"use client";

//dM8GkzFyLM3ak9SY

import { useEffect, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/context";
import { userData } from "@/types/types";
import abstract from "../../../../public/abstract.png";

import { getAllUsersData } from "@/utils/helpers";
import waves from "../../../../public/waves.png";
import {
  handleGetOtpClickedForSignin,
  handleProceedClickedForSignin,
} from "@/utils/handlers";
import Toaster from "@/components/containers/Toaster";
import Container from "@/components/containers/container";
const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("1212121212");
  const [isOtpClicked, setIsOtpClicked] = useState(false);
  const [OTP, setOTP] = useState("121212");
  const [allUserData, setAllUserData] = useState<userData[] | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const setAllUsersDataHelper = async () => {
    const data = await getAllUsersData();
    setAllUserData(data);
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
    setAllUsersDataHelper();
  }, [user]);
  return (
    <Container>
      <div className="h-screen bg-gradient-to-bl from-gray-900 via-gray-950 to-black md:bg-gradient-to-l">
        <div className="grid h-full grid-cols-3">
          {/* for mobile */}
          <div className="relative col-span-3 flex h-full flex-col items-center justify-center from-gray-900 via-gray-950 to-black xl:col-span-1 xl:bg-gradient-to-r">
            <div className="absolute left-0 top-0 h-full w-full bg-black">
              <img
                src={waves.src}
                alt=""
                className="h-full w-full object-cover opacity-20"
              />
            </div>
            <AnimatePresence>
              {isOtpClicked ? (
                // second page
                <motion.div
                  key={"second-page"}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    scale: 0.9,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                  }}
                  className="flex flex-col rounded-xl border-2 border-gray-700 bg-zinc-950 bg-opacity-50 p-6 backdrop-blur-sm"
                >
                  <div
                    className="w-72 cursor-pointer text-3xl font-bold text-white"
                    onClick={() => {
                      window.location.reload();
                      router.refresh();
                    }}
                  >
                    Back
                  </div>
                  <div className="mb-4 text-white">
                    Enter your one time password
                  </div>
                  <div className="my-4 flex w-full justify-center">
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                      }}
                    >
                      <FaEthereum size={100} color="#2DD4BF" />
                    </motion.div>
                  </div>
                  <div className="font-bold text-white">6 Digit OTP</div>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="">
                      <RiLockPasswordFill size={30} color="#2DD4BF" />
                    </div>
                    <input
                      type="text"
                      value={OTP}
                      maxLength={6}
                      onChange={(value) => {
                        setOTP(value.target.value);
                      }}
                      placeholder="121212"
                      className="h-10 w-full rounded-xl bg-zinc-300 px-4 text-zinc-800 focus:outline-none"
                    />
                  </div>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => {
                      handleProceedClickedForSignin(OTP);
                    }}
                    className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-tr from-violet-500 to-teal-500 py-2 text-center font-bold text-zinc-100"
                  >
                    Proceed
                  </motion.div>
                  <div className="mt-1 text-center text-sm text-white">
                    Dont have an account?{" "}
                    <span
                      onClick={() => {
                        router.push("/signup");
                      }}
                      className="cursor-pointer capitalize underline"
                    >
                      sign up
                    </span>
                  </div>
                </motion.div>
              ) : (
                // first page
                <motion.div
                  key={"first-page"}
                  initial={{
                    // y: 200,
                    opacity: 0,
                    // scale: 0.9,
                  }}
                  animate={{
                    y: 0,
                    scale: 0.9,
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -200,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="flex flex-col rounded-xl border-2 border-gray-700 bg-zinc-950 bg-opacity-50 p-6 backdrop-blur-sm"
                >
                  <div className="w-72 text-3xl font-bold text-white">
                    Welcome back!
                  </div>
                  <div className="mb-4 text-white">Access your account now</div>
                  <div className="my-4 flex w-full justify-center">
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                      }}
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      <FaEthereum size={100} color="#2DD4BF" />
                    </motion.div>
                  </div>

                  <div className="mt-2 font-bold text-white">Phone Number</div>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="">
                      <AiFillPhone size={30} color="#2DD4BF" />
                    </div>
                    <input
                      type="text"
                      value={phoneNumber || ""}
                      onChange={(value) => {
                        setPhoneNumber(value.target.value);
                      }}
                      placeholder="1234567890"
                      className="h-9 w-full rounded-lg bg-zinc-300 px-4 text-zinc-800 focus:outline-none"
                    />
                  </div>

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => {
                      handleGetOtpClickedForSignin(
                        phoneNumber,
                        allUserData,
                      ).then((response) => {
                        if (response) {
                          setIsOtpClicked(true);
                        }
                      });
                    }}
                    className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-tr from-violet-500 to-teal-500 py-2 text-center font-bold text-zinc-100"
                  >
                    Get OTP
                  </motion.div>
                  <div className="mt-1 text-center text-sm text-white">
                    Dont have an account?{" "}
                    <span
                      onClick={() => {
                        router.push("/signup");
                      }}
                      className="cursor-pointer capitalize underline"
                    >
                      sign up
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* for pc */}
          <div className="relative col-span-2 hidden h-full w-full border-l border-gray-700 xl:block">
            <div className="absolute left-0 top-0 h-full w-full">
              <img
                src={abstract.src}
                alt=""
                className="h-full w-full object-center"
              />
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <div className="z-10 mx-48 flex flex-col items-center">
                <div className="flex items-center">
                  <div className="relative bottom-32">
                    <BiSolidQuoteAltLeft size={100} />
                  </div>
                  <div className="text-justify text-xl capitalize">
                    I gave @datereum a try this weekend and I was able to create
                    a quick dashboard to visualize the data from the PostgreSQL
                    instance. Its super easy to use thir API or the direct DB
                    connection. Check out the tutorial{" "}
                  </div>
                  <div className="relative top-32">
                    <BiSolidQuoteAltRight size={100} />
                  </div>
                </div>
                <div className="ml-24 mt-4 flex items-center space-x-4 self-start">
                  <img
                    src="/rolando.png"
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="capitalize">narendra rolando</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="sign-in"></div>
      </div>
    </Container>
  );
};

export default Signup;
