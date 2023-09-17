"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CatLoader from "@/components/catLoader";
import { ApiSection } from "@/components/apiSection";
import { motion } from "framer-motion";
import waves from "../../../../public/waves.png";
import ProfileSection from "@/components/profile";
import DashHeader from "@/components/dashHeader";
import { unSigner } from "@/firebase/firebase";
import Toaster from "@/components/Toaster";
import God from "@/components/godSection";
import Container from "@/components/container";
import ThemeButton from "@/components/themeButton";
import AdminHeader from "@/components/adminHeader";
import TableSection from "@/components/tableSection";
const Contribute = () => {
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
  ) : !userData.isGod ? (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center justify-center text-zinc-50">
        <div className="text-2xl">
          Are you a <span className="font-bold">GOD</span>?
        </div>
        <div className="text-xl">{"- nah!"}</div>
        <div className="text-2xl">
          Go back{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => {
              router.push("/");
            }}
          >
            home.
          </span>
        </div>
      </div>
    </div>
  ) : (
    // <CatLoader/>

    <Container>
      <div className="relative min-h-screen w-full">
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black">
          <img
            src={waves.src}
            alt="waves"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <AdminHeader />
        <div className="bg-pink-95 flex min-h-screen w-full flex-col items-center pt-20">
          <div className="h-full w-full max-w-6xl px-4">
            {/* <TableSection columns={columns} data={allUsersData} /> */}
            <div className="mt-4 h-full rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-zinc-500 backdrop-blur-sm">
              <div>asd</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contribute;
