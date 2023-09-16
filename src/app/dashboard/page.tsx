"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CatLoader from "@/components/catLoader";
import { ApiSection } from "@/components/apiSection";
import { motion } from "framer-motion";
import waves from "../../../public/waves.png";
import ProfileSection from "@/components/profile";
import DashHeader from "@/components/dashHeader";
import { unSigner } from "@/firebase/firebase";
import Toaster from "@/components/Toaster";
import God from "@/components/godSection";
import Container from "@/components/container";
import ThemeButton from "@/components/themeButton";
import { BsArrowUpRight, BsFillExclamationDiamondFill } from "react-icons/bs";
const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
  };

  useEffect(() => {
    waiter();
    if (!user && !isLoading) {
      router.push("/");
    } else {
      setUserDataHelper();
    }
  }, [user, isLoading]);

  return !userData ? (
    <div>
      <CatLoader />
      <div
        onClick={() => {
          unSigner();
        }}
      >
        signout
      </div>
    </div>
  ) : (
    // <CatLoader/>
    <Container>
      <div className="relative min-h-screen">
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            src={waves.src}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <DashHeader />
        <div className="bg-pink-95 flex min-h-screen w-full flex-col items-center pt-20">
          <div className="h-full w-full max-w-6xl p-4">
            <ProfileSection userData={userData} />
            <God userData={userData} />
            <ApiSection userData={userData} />
            <div className="">
              <div className="my-4 text-xl uppercase">contribution</div>
              <div className="rounded-xl bg-zinc-950 bg-opacity-30 outline outline-2 outline-gray-700 backdrop-blur-sm">
                <div className="flex items-center justify-between p-6">
                  <div className="text-xl font-bold">
                    Contrtibute to the Healthcare now!
                  </div>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="flex cursor-pointer items-center space-x-2 rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-center text-sm uppercase xl:mt-0"
                    onClick={() => {
                      router.push("/dashboard/contribute");
                    }}
                  >
                    <div>contribute</div>
                    <BsArrowUpRight />
                  </motion.div>
                </div>
                <div className="px-6 pb-8">
                  <div className="flex items-start space-x-2">
                    <div className="pt-[2px]">
                      <BsFillExclamationDiamondFill color={"red"} size={20} />
                    </div>
                    <div className=" select-none text-justify">
                      <span className="font-bold">Caution - </span>You should
                      never share your API token with anyone. This token is
                      unresetable. Please read our API{" "}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
