import { userData } from "@/types/types";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BsArrowUpRight } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { handleGetVerifiedClicked } from "@/utils/handlers";
import ThemeButton from "../custom/themeButton";
const God = (props: { userData: userData }) => {
  const router = useRouter();
  return (
    <div>
      {" "}
      {props.userData.isGod && (
        <div className="bg-red-90 flex w-full flex-col md:flex-row md:space-x-8">
          {/* admin panel */}
          <div className="bg-blue-90 w-full overflow-clip">
            <div className="my-4 text-xl uppercase">admin panel</div>
            <div className="w-full rounded-xl border-2 border-gray-700 bg-zinc-950 bg-opacity-30 p-4 outline-gray-500 backdrop-blur-md">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="text-center text-lg font-bold">
                  Access the{" "}
                  <span className="font-bol capitalize">admin panel</span> now!
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="mt-4 flex cursor-pointer items-center space-x-2 rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-center text-sm uppercase xl:mt-0"
                  onClick={() => {
                    router.push("/dashboard/admin");
                  }}
                >
                  <div>admin panel</div>
                  <BsArrowUpRight />
                </motion.div>
              </div>

              <div className="mt-4 flex justify-center">
                <div className="flex items-start">
                  <div className="-mt-1 flex shrink-0 items-start">
                    <TiTick size={28} color="#1ED760" />
                  </div>
                  <div className="text-sm">
                    You can manage the Users and do more things on the Admin
                    Panel only accessable by admins.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* god mode */}
          <div className="bg-blue-90 w-full overflow-clip">
            <div className="my-4 text-xl uppercase">god mode</div>
            <div className="w-full rounded-xl border-2 border-gray-700 bg-zinc-950 bg-opacity-30 p-4 outline-gray-500 backdrop-blur-md">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="text-center text-lg font-bold">
                  Activate the{" "}
                  <span className="font-bol capitalize">god mode</span> now!
                </div>

                <ThemeButton
                  title="get verified"
                  onClick={() => {
                    handleGetVerifiedClicked(props.userData);
                  }}
                  className="mt-4"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex items-start">
                  <div className="-mt-1 flex shrink-0 items-start">
                    <TiTick size={28} color="#1ED760" />
                  </div>
                  <div className="text-sm">
                    You can be a verified User and gain API access just by
                    clicking on the button.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default God;
