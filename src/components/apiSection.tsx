"use client";
import { tokenGenerator } from "@/utils/helpers";
import { APIProps } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "antd";
import {
  BiSolidCopy,
  BiSolidLockAlt,
  BiSolidLockOpenAlt,
} from "react-icons/bi";
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsFillExclamationDiamondFill,
} from "react-icons/bs";
import { toast } from "react-toastify";

export const ApiSection: React.FC<APIProps> = ({ userData }) => {
  const router = useRouter();
  const [isNew, setIsNew] = useState(false);
  const [reveal, setReveal] = useState(true);
  const [inputState, setInputState] = useState("password");
  const [token, setToken] = useState<string>(
    userData.token === "initial"
      ? "This is not your api key. Click on the generate button."
      : "",
  );
  useEffect(() => {
    if (userData.token === "initial") {
      setIsNew(true);
    } else {
      setToken(userData.token!);
      setIsNew(false);
    }
  }, []);
  return (
    <div>
      <div className="my-4 text-xl uppercase">api token</div>
      <div className="relative rounded-xl bg-zinc-950 bg-opacity-30 outline outline-2 outline-gray-700 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-between space-y-4 px-6 py-6 md:flex-row md:space-y-0">
          <div className="text-center text-xl font-bold">
            Generate your secret API token now!
          </div>
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={async () => {
              if (!isNew) {
                toast.error("You already have your token!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  pauseOnFocusLoss: false,
                  theme: "dark",
                });
                console.log("you already have your token");
              } else {
                if (userData.canDownload) {
                  await tokenGenerator(userData);
                } else {
                  toast.error("You don't have API access!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    theme: "dark",
                  });
                  console.log("you dont have api access");
                }
              }
            }}
            className="cursor-pointer rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-4 py-2 text-sm uppercase"
          >
            generate
          </motion.div>
        </div>
        <div className="bg-yellow-80 flex items-center justify-center px-4">
          <input
            defaultValue={token}
            type={inputState}
            className="h-8 w-[600px] rounded-l-lg bg-gray-300 px-3 text-center font-mono font-bold text-gray-800  focus:outline-none lg:w-[700px] xl:w-[800px]"
          />
          <div
            className="flex h-8 cursor-pointer items-center rounded-r-lg bg-gray-700 px-2"
            onClick={() => {
              if (inputState === "password") {
                setInputState("text");
              } else {
                setInputState("password");
              }
            }}
          >
            {inputState === "password" ? (
              <Tooltip title={"Reveal API token"} arrow={false}>
                <BsEyeFill size={25} />
              </Tooltip>
            ) : (
              <Tooltip title={"Hide API token"} arrow={false}>
                <BsEyeSlashFill size={25} />
              </Tooltip>
            )}
          </div>
          <motion.div
            className="cursor-pointer px-2"
            onClick={() => {
              toast.success("API token copied to clipboard!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss: false,
                theme: "dark",
              });
              navigator.clipboard.writeText(token);
              console.log("text copied");
            }}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            <Tooltip title={"Copy to clipboard"} arrow={false}>
              <BiSolidCopy size={30} color="#2DD4BF" />
            </Tooltip>
          </motion.div>
        </div>
        <div className="px-6 py-8">
          <div className="flex items-start space-x-2">
            <div className="pt-[2px]">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className=" select-none text-justify">
              <span className="font-bold">Caution - </span>You should never
              share your API token with anyone. This token is unresetable.
              Please read our API{" "}
              <span
                className="cursor-pointer underline"
                onClick={() => {
                  router.push("/docs");
                }}
              >
                documentation
              </span>{" "}
              to know more.
            </div>
          </div>
        </div>
        <AnimatePresence>
          {reveal && (
            <motion.div
              initial={{
                opacity: 0.5,
              }}
              animate={{
                backdropFilter: `blur(5px)  brightness(100%)`,
                opacity: 1,
              }}
              exit={{
                backdropFilter: `blur(0px)  brightness(70%)`,
                opacity: 0,
              }}
              transition={{
                duration: 1,
              }}
              onClick={() => {
                if (userData.canDownload) {
                  setReveal(false);
                } else {
                  toast.error("You don't have API access!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    theme: "dark",
                  });
                  console.log("dont have api access");
                }
              }}
              className="absolute top-0 flex h-full w-full items-center justify-center rounded-xl bg-black bg-opacity-70 backdrop-blur-[5px]"
            >
              <motion.div
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1,
                }}
                className="shadow-l cursor-pointer rounded-full bg-gray-800 p-2 uppercase text-gray-200 shadow-black outline outline-1 outline-gray-200"
              >
                {userData.canDownload ? (
                  <BiSolidLockOpenAlt size={30} />
                ) : (
                  <BiSolidLockAlt size={30} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};
