"use client";

import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

export const FeedbackSection = ({
  rawStats,
  parsedStats,
}: {
  rawStats: {
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null;
  parsedStats: {
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null;
}) => {
  return (
    <>
      <div className="mb-4 mt-8 text-xl uppercase">feedback</div>
      <div className="flex w-full flex-col space-y-4 rounded-xl bg-zinc-950 bg-opacity-30 p-4 outline outline-1 outline-slate-700 backdrop-blur-md">
        {rawStats?.shortestObjectLength ===
        parsedStats?.shortestObjectLength ? (
          <div className="flex w-full rounded-lg bg-slate-900 bg-opacity-70 px-3 py-4 outline outline-1 outline-green-800">
            <div className="">
              <TiTick color="#1ED760" size={28} />
            </div>
            <div className="mt-0.5">
              Every Column Name has been detected and parsed successfully!
            </div>
          </div>
        ) : rawStats?.shortestObjectLength! >
          parsedStats?.longestObjectLength! ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="pt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              We cannot identify every column of your data!
            </div>
          </div>
        ) : parsedStats?.longestObjectLength === 0 ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="pt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">none of your columns are detected!</div>
          </div>
        ) : (
          <></>
        )}
        {rawStats?.objectCount! > parsedStats?.objectCount! && (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              Analytics graphs may overlap eachother due to unequal row sizes!
            </div>
          </div>
        )}
        {rawStats?.objectCount === parsedStats?.objectCount ? (
          <div className="flex w-full rounded-lg bg-slate-900 bg-opacity-70 px-3 py-4 outline outline-1 outline-green-800">
            <div className="">
              <TiTick color="#1ED760" size={28} />
            </div>
            <div className="mt-0.5">
              Each and every row of your data has been parsed successfully!
            </div>
          </div>
        ) : rawStats?.objectCount! > parsedStats?.objectCount! ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              Not every row has been parsed from your data!
            </div>
          </div>
        ) : parsedStats?.objectCount === 0 ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">None of your rows has been parsed!</div>
          </div>
        ) : (
          <></>
        )}
        {parsedStats?.shortestObjectLength! < 10 && (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              Minimum Column Retention is too low for your data!
            </div>
          </div>
        )}
        {parsedStats?.longestObjectLength! -
          parsedStats?.shortestObjectLength! >
          10 && (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-red-900">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              Column names are too diverse in your data!
            </div>
          </div>
        )}
      </div>
    </>
  );
};
