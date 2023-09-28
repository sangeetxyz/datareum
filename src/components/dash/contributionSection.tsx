"use client";

import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsFillExclamationDiamondFill } from "react-icons/bs";
import { toast } from "react-toastify";

export const ContributionSection = ({ userData }: { userData: userData }) => {
  const router = useRouter();
  return (
    <div>
      <div className="my-4 text-xl uppercase">contribution</div>
      <div className="rounded-xl bg-zinc-950 bg-opacity-30 outline outline-2 outline-gray-700 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-between p-6 md:flex-row">
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
            className="mt-4 flex cursor-pointer items-center space-x-2 rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-center text-sm uppercase md:mt-0 xl:mt-0"
            onClick={() => {
              if (userData.canContribute) {
                router.push("/dashboard/contribute");
              } else {
                toast.error("You dont have permission!", {
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
              }
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
              <span className="font-bold">Caution - </span>We only accept .CSV
              files and we only proceess a certain type of schema of data and
              data types. Please learn more on the{" "}
              <span
                className="cursor-pointer underline"
                onClick={() => {
                  router.push("/docs");
                }}
              >
                documentation
              </span>{" "}
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
