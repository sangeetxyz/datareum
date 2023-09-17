"use client";

//dM8GkzFyLM3ak9SY

import { useEffect, useState } from "react";
import { checker, signer } from "../../../firebase/firebase";
import { AiFillPhone } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/context";
import { userData } from "@/types/types";
import axios from "axios";
import { isPhoneNumber, isPhoneNumberPresent } from "@/utils/helpers";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("1212121212");
  const [isOtpClicked, setIsOtpClicked] = useState(false);
  const [OTP, setOTP] = useState("121212");
  const [allUserData, setAllUserData] = useState<userData[] | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const getAllUsersData = async () => {
    const { data } = await axios.get("http://127.0.0.1:3000/api/dev/users");
    console.log(data);
    setAllUserData(data);
  };
  const handleOtpClicked = () => {
    if (isPhoneNumber(phoneNumber)) {
      if (isPhoneNumberPresent(allUserData, phoneNumber)) {
        signer("+91" + phoneNumber).then(async (value) => {
          if (value === true) {
            setIsOtpClicked(true);
          } else {
            console.log("sms not sent");
          }
        });
      } else {
        console.log("dont have an accout");
      }
    } else {
      console.log("enter valid phone num");
    }
  };
  const handleProceedClicked = () => {
    if (OTP.length === 6) {
      checker(OTP).then(async (value) => {
        if (value === true) {
          router.push("/dashboard");
        } else {
          console.log("wrong otp");
        }
      });
    } else {
      console.log("enter otp");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
    getAllUsersData();
  }, [user]);
  return (
    <div className="h-screen bg-gradient-to-bl from-gray-900 via-gray-950 to-black md:bg-gradient-to-l">
      <div className="grid h-full grid-cols-3">
        {/* for mobile */}
        <div className="col-span-3 flex h-full flex-col items-center justify-center from-gray-900 via-gray-950 to-black xl:col-span-1 xl:bg-gradient-to-r">
          <AnimatePresence>
            {isOtpClicked ? (
              // second page
              <motion.div
                key={"second page"}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 100,
                }}
                animate={{
                  scale: 0.9,
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  delay: 0.3,
                }}
                className="flex flex-col rounded-xl bg-zinc-50 p-6"
              >
                <div
                  className="w-72 cursor-pointer text-3xl font-bold text-zinc-800"
                  onClick={() => {
                    window.location.reload();
                    router.refresh();
                  }}
                >
                  Back
                </div>
                <div className="mb-4 text-zinc-800">
                  Enter your one time password
                </div>
                <div className="my-4 flex w-full justify-center">
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                    }}
                  >
                    <FaEthereum size={100} color="#27272A" />
                  </motion.div>
                </div>
                <div className="font-bold text-zinc-800">6 Digit OTP</div>
                <div className="mt-1 flex items-center space-x-2">
                  <div className="">
                    <RiLockPasswordFill size={30} color="#27272A" />
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
                    handleProceedClicked();
                  }}
                  className="mt-6 w-full cursor-pointer rounded-xl bg-zinc-800 py-2 text-center font-bold text-zinc-100"
                >
                  Proceed
                </motion.div>
                <div className="mt-1 text-center text-sm text-zinc-800">
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
                key={"first page"}
                initial={{
                  y: 200,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  y: 0,
                  scale: 0.9,
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -100,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="flex flex-col rounded-xl bg-zinc-100 p-6"
              >
                <div className="w-72 text-3xl font-bold text-zinc-800">
                  Welcome back!
                </div>
                <div className="mb-4 text-zinc-800">
                  Access your account now
                </div>
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
                    <FaEthereum size={100} color="#27272A" />
                  </motion.div>
                </div>

                <div className="mt-2 font-bold text-zinc-800">Phone Number</div>
                <div className="mt-1 flex items-center space-x-2">
                  <div className="">
                    <AiFillPhone size={30} color="#27272A" />
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
                    handleOtpClicked();
                  }}
                  className="mt-6 w-full cursor-pointer rounded-xl bg-zinc-800 py-2 text-center font-bold text-zinc-100"
                >
                  Get OTP
                </motion.div>
                <div className="mt-1 text-center text-sm text-zinc-800">
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
        <div className="col-span-2 hidden h-full w-full bg-gradient-to-bl from-gray-800 via-gray-950 to-black outline outline-1 outline-gray-600 md:bg-gradient-to-l xl:block">
          <div className="flex h-full w-full items-center justify-center">
            <div className="mx-48 flex flex-col items-center">
              <div className="flex items-center">
                <div className="relative bottom-32">
                  <BiSolidQuoteAltLeft size={100} />
                </div>
                <div className="text-justify text-xl capitalize">
                  I gave @datereum a try this weekend and I was able to create a
                  quick dashboard to visualize the data from the PostgreSQL
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
  );
};

export default Signup;
