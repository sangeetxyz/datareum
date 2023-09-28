"use client";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CatLoader from "@/components/loaders/catLoader";
import Papa from "papaparse";
import waves from "../../../../public/waves.png";
import { unSigner } from "@/firebase/firebase";
import Container from "@/components/containers/container";
import AdminHeader from "@/components/headers/adminHeader";
import { IoCloudUpload } from "react-icons/io5";
import { analyzeObjectList, processCsvData } from "@/utils/csvHelpers";
import { QuickStatsSection } from "@/components/contribute/quickStatsSection";
import { AnalyticsSection } from "@/components/contribute/analyticsSection";
import { RetentionSection } from "@/components/contribute/retentionSection";
import { FeedbackSection } from "@/components/contribute/feedbackSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ThemeButton from "@/components/custom/themeButton";
import {
  objectEncryptor,
  objectIdentificator,
  objectSplitter,
  objectUserDataMixer,
} from "@/utils/crypt";
import {
  handlePatientUploadToBc,
  handlePatientUploadToDb,
} from "@/utils/handlers";
import { toast } from "react-toastify";

export const AcceptButton = ({
  parsedData,
  userData,
}: {
  parsedData: object[] | null;
  userData: userData;
}) => {
  return (
    <div className="mb-4 mt-8 flex w-full items-center overflow-x-clip rounded-xl">
      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <ThemeButton title="contribute now" className="w-full" />
        </AlertDialogTrigger>
        <AlertDialogContent className="md:w-[1000px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl text-zinc-50">
              One more step
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300">
              Read the terms and policies
            </AlertDialogDescription>
            <div className="flex flex-col space-y-4 pt-2 text-zinc-100">
              <div>
                By proceeding you are affirming the accuracy and truthfulness of
                all the data shared. This commitment to data accuracy is crucial
                in advancing the healthcare sector through research and
                development on the Ethereum blockchain.
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-900">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (parsedData) {
                  const awaiter = async () => {
                    const p1 = objectEncryptor(parsedData);
                    const p2 = objectIdentificator(p1);
                    const p3 = objectSplitter(p2);
                    const p4 = objectUserDataMixer(p3.forDb, userData.phone);

                    // await handlePatientUploadToDb(p4);
                    // await handlePatientUploadToBc(p3.forBc);
                  };
                  toast.promise(
                    awaiter,
                    {
                      pending: "Uploading Data",
                      success: "Data Uploaded!",
                      error: "Rejected 🤯",
                    },
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      pauseOnFocusLoss: false,
                      theme: "dark",
                    },
                  );
                }
              }}
              className="cursor-pointer rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-center text-sm uppercase text-zinc-50 hover:opacity-90 xl:mt-0"
            >
              accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
