"use client";

import { unSigner } from "@/firebase/firebase";
import { getGreeting } from "@/utils/helpers";
import { userData } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiEdit, BiSolidBusiness } from "react-icons/bi";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { GoUnverified, GoVerified } from "react-icons/go";
import { Tooltip } from "antd";
import { SiFastapi } from "react-icons/si";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import DefaultProfilePhoto from "../../../public/default-profile-photo.png";
import {
  handleProfilePhotoUpload,
  handleProfileUpdateOnDash,
} from "@/utils/handlers";
import { toast } from "react-toastify";

const ProfileSection = (props: { userData: userData }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState(props.userData.name);
  const [email, setEmail] = useState(props.userData.email);
  const [org, setOrg] = useState(props.userData.org);
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [isProUploaded, setIsProUploaded] = useState(false);
  const [isUpadateOpened, setIsUpadateOpened] = useState(false);
  const router = useRouter();
  const profilePhotoUrl = photo
    ? URL.createObjectURL(photo)
    : props.userData!.proUrl
    ? props.userData!.proUrl
    : DefaultProfilePhoto.src;
  const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);

  useEffect(() => {
    if (photo != undefined) {
      setIsConfirmationOpened(true);
    }
  }, [photo]);

  return (
    <div className="w-full rounded-xl">
      <div className="mb-4 text-xl uppercase">profile</div>

      <div className="grid grid-cols-8 rounded-xl outline outline-2 outline-gray-700">
        <div className="col-span-8 flex justify-center rounded-xl md:rounded-r-none bg-zinc-950 bg-opacity-30 p-4 backdrop-blur-md md:col-span-3">
          <div className="relative flex items-center">
            <img
              src={profilePhotoUrl}
              alt=""
              className="h-72 w-72 rounded-full border-2 border-gray-100 bg-zinc-950 object-cover md:h-64 md:w-64 lg:h-72 lg:w-72"
            />
            <div
              className="absolute bottom-5 right-5 cursor-pointer rounded-full bg-gradient-to-tr from-violet-500 to-teal-500 p-2"
              onClick={() => {
                inputRef.current?.click();
                setIsProUploaded(false);
              }}
            >
              <BiEdit color="white" size={40} />
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col justify-between rounded-b-xl bg-zinc-950 bg-opacity-30 text-gray-200 backdrop-blur-md md:col-span-5 md:rounded-r-xl md:rounded-bl-none">
          <div>
            <div className="m-4 border-b border-gray-700 pb-4 pl-2 pt-2 text-center text-2xl font-bold capitalize md:text-start">{`
                ${getGreeting()} ${props.userData!.name}!
                `}</div>
            <div className="bg-pink-95 m-4 space-y-2 pl-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSolidBusiness size={30} color="#2DD4BF" />
                  <div className="ml-4 font-semibold">
                    {props.userData!.org}
                  </div>
                </div>
                <div className="bg-green-0">
                  {props.userData!.isOrgVerified ? (
                    <Tooltip title="Organization is verified!" arrow={false}>
                      <GoVerified size={30} color={"#1ED760"} />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Organization is not verified!"
                      arrow={false}
                    >
                      <GoUnverified size={30} color={"orange"} />
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MdEmail size={30} color="#2DD4BF" />
                  <div className="ml-4 font-semibold">
                    {props.userData!.email}
                  </div>
                </div>
                <div>
                  {props.userData!.isEmailVerified ? (
                    <Tooltip title="Email is verified!" arrow={false}>
                      <GoVerified size={30} color={"#1ED760"} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Email is not verified!" arrow={false}>
                      <GoUnverified size={30} color={"orange"} />
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AiFillPhone size={30} color="#2DD4BF" />
                  <div className="ml-4 font-semibold">
                    {props.userData!.phone}
                  </div>
                </div>
                <div>
                  {props.userData!.isPhoneVerified ? (
                    <Tooltip title="Phone number is verified!" arrow={false}>
                      <GoVerified size={30} color={"#1ED760"} />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Phone number is not verified!"
                      arrow={false}
                    >
                      <GoUnverified size={30} color={"orange"} />
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <SiFastapi size={28} color="#2DD4BF" />
                  <div className="ml-4 font-semibold">API Access</div>
                </div>
                <div>
                  {props.userData!.canDownload ? (
                    <Tooltip title="You have access!" arrow={false}>
                      <GoVerified size={30} color={"#1ED760"} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="You dont have access!" arrow={false}>
                      <GoUnverified size={30} color={"orange"} />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="m-4 mb-5 flex justify-between px-1">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="cursor-pointer rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-sm uppercase"
              onClick={() => {
                setIsUpadateOpened(true);
              }}
            >
              edit profile
            </motion.div>
            <motion.div
              className="cursor-pointer rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-sm uppercase"
              onClick={() => {
                unSigner();
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              sign out
            </motion.div>
          </div>
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={async (event) => {
          setPhoto(event.target.files?.[0]);
        }}
      />
      <AnimatePresence>
        {isUpadateOpened ? (
          <motion.div
            key={"editor1"}
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
              duration: 0.5,
            }}
            className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-md"
            onClick={() => {
              setIsUpadateOpened(false);
            }}
          >
            <motion.div
              key={"editor"}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                scale: 0.9,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                rotate: -20,
                x: -100,
              }}
              transition={{
                duration: 0.5,
              }}
              className="flex flex-col rounded-xl border-2 border-gray-700 bg-zinc-950 bg-opacity-50 p-6 backdrop-blur-sm"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="w-72 text-3xl font-bold text-white">
                Update Profile
              </div>
              <div className="mb-4 text-white">Change your details now!</div>
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
              <div className="font-bold text-white">Full Name</div>
              <div className="mt-1 flex items-center space-x-2">
                <div className="">
                  <BsFillPersonFill size={30} color="#2DD4BF" />
                </div>
                <input
                  type="text"
                  value={name || ""}
                  onChange={(value) => {
                    setName(value.target.value);
                  }}
                  placeholder="John Smith"
                  className="h-8 w-full rounded-lg bg-zinc-300 px-4 text-zinc-800 focus:outline-none"
                />
              </div>
              <div className="mt-2 font-bold text-white">Email</div>
              <div className="mt-1 flex items-center space-x-2">
                <div className="">
                  <MdEmail size={30} color="#2DD4BF" />
                </div>
                <input
                  type="text"
                  value={email || ""}
                  onChange={(value) => {
                    setEmail(value.target.value);
                  }}
                  placeholder="abc@xyz.com"
                  className="h-8 w-full rounded-lg bg-zinc-300 px-4 text-zinc-800 focus:outline-none"
                />
              </div>
              <div className="mt-2 font-bold text-white">Organization</div>
              <div className="mt-1 flex items-center space-x-2">
                <div className="">
                  <BiSolidBusiness size={30} color="#2DD4BF" />
                </div>
                <input
                  type="text"
                  value={org || ""}
                  onChange={(value) => {
                    setOrg(value.target.value);
                  }}
                  placeholder="Google"
                  className="h-8 w-full rounded-lg bg-zinc-300 px-4 text-zinc-800 focus:outline-none"
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
                  handleProfileUpdateOnDash(name, org, email, props.userData);
                  toast.success("Profile updated!", {
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
                  setIsUpadateOpened(false);
                }}
                className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-tr from-violet-500 to-teal-500 py-2 text-center font-bold text-zinc-100"
              >
                Update Profile
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <></>
        )}
        {isConfirmationOpened && (
          <motion.div
            key={"editor1"}
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
              duration: 0.5,
            }}
            className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-md"
            onClick={() => {
              setPhoto(undefined);
              setIsConfirmationOpened(false);
            }}
          >
            <motion.div
              key={"editor2"}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                scale: 0.9,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                rotate: -20,
                x: -100,
              }}
              transition={{
                duration: 0.5,
              }}
              className="flex flex-col rounded-xl border-2 border-gray-700 bg-zinc-950 bg-opacity-50 p-6 backdrop-blur-sm"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="w-72 text-center text-3xl font-bold text-white">
                Update Changes ?
              </div>
              <div className="flex space-x-6">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => {
                    handleProfilePhotoUpload(
                      photo,
                      props.userData,
                      isProUploaded,
                    );
                    toast.success("Profile updated!", {
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
                    setIsProUploaded(true);
                    setIsConfirmationOpened(false);
                  }}
                  className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-tr from-violet-500 to-teal-500 py-2 text-center font-bold text-zinc-100"
                >
                  Okay
                </motion.div>
                {/* <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => {
                    setPhoto(undefined);
                    setIsConfirmationOpened(false);
                  }}
                  className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-tr from-violet-500 to-red-500 py-2 text-center font-bold text-zinc-100"
                >
                  Cancel
                </motion.div> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSection;
