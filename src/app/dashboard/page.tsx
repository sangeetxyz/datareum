"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CatLoader from "@/components/CatLoader";
import { ApiSection } from "@/components/API";
import waves from "../../../public/waves.png";
import ProfileSection from "@/components/profile";
import DashHeader from "@/components/DashHeader";
import { unSigner } from "@/firebase/firebase";
import Toaster from "@/components/Toaster";
import God from "@/components/God";
import Container from "@/components/container";
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
          </div>
        </div>
        <Toaster />
      </div>
    </Container>
  );
};

export default Dashboard;
