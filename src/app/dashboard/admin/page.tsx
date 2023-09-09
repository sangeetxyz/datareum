"use client";

import CatLoader from "@/components/CatLoader";
import DashHeader from "@/components/DashHeader";
import Selector from "@/components/Selector";
import { useAuth } from "@/context/context";
import { unSigner } from "@/firebase/firebase";
import { userData } from "@/types/types";
import { getDashUserData } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import waves from "../../../../public/waves.png";
import { Button } from "@/components/ui/button";
import TableSection from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { columns, payments } from "@/utils/tableHelpers";



const AdminPanel = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    <Selector>
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
            <TableSection columns={columns} data={payments} />
          </div>
        </div>
      </div>
    </Selector>
  );
};

export default AdminPanel;
