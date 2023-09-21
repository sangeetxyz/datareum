"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
  LabelList,
} from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";

import { useAuth } from "@/context/context";
import { getDashUserData } from "@/utils/helpers";
import { userData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CatLoader from "@/components/loaders/catLoader";
import { ApiSection } from "@/components/dash/apiSection";
import { motion } from "framer-motion";
import Papa from "papaparse";
import waves from "../../../../public/waves.png";
import ProfileSection from "@/components/dash/profile";
import DashHeader from "@/components/headers/dashHeader";
import { unSigner } from "@/firebase/firebase";
import Toaster from "@/components/containers/Toaster";
import God from "@/components/dash/godSection";
import Container from "@/components/containers/container";
import ThemeButton from "@/components/custom/themeButton";
import AdminHeader from "@/components/headers/adminHeader";
import TableSection from "@/components/admin/tableSection";
import {
  BsArrowUpRight,
  BsFillCloudUploadFill,
  BsFillExclamationDiamondFill,
} from "react-icons/bs";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoCloudUpload } from "react-icons/io5";
import {
  analyzeObjectList,
  calculateColumnCounts,
  processCsvData,
} from "@/utils/csvHelpers";
import { TiTick } from "react-icons/ti";
const Contribute = () => {
  const { user } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userData | undefined>(undefined);
  const [file, setFile] = useState<null | File>(null);
  const [rawData, setRawData] = useState<object[] | null>(null);
  const [parsedData, setParsedData] = useState<object[] | null>(null);
  const [rawStats, setRawStats] = useState<{
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null>(null);
  const [parsedStats, setParsedStats] = useState<{
    objectCount: number;
    shortestObjectLength: number;
    longestObjectLength: number;
  } | null>(null);
  const waiter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  const setUserDataHelper = async () => {
    const data = await getDashUserData(user!);
    setUserData(data);
  };
  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile?.type === "text/csv" ||
      selectedFile?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      if (selectedFile) {
        Papa.parse(selectedFile, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data: any = result.data;
            setRawData(data);
            console.log(data);
            const rawAnalytics = analyzeObjectList(data);
            setRawStats(rawAnalytics);
            if (typeof data === "object") {
              const processed = processCsvData(data);
              setParsedData(processed);
              const parsedAnalytics = analyzeObjectList(processed);
              setParsedStats(parsedAnalytics);
            }
          },
        });
      }
    } else {
      console.log("wrong format");
    }
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
        {file ? (
          // has file
          <div className="bg-pink-95 mih-h-screen flex w-full flex-col items-center pt-20">
            <div className="h-full w-full max-w-6xl p-4">
              <div className="bg-red-95 h-full">
                {/* stats */}
                <QuickStatsSection
                  rawData={rawData}
                  parsedData={parsedData}
                  rawStats={rawStats}
                  parsedStats={parsedStats}
                />
                <AnalyticsSection rawData={rawData} parsedData={parsedData} />
                <RetentionSection
                  rawStats={rawStats}
                  parsedStats={parsedStats}
                />
                <FeedbackSection
                  rawStats={rawStats}
                  parsedStats={parsedStats}
                />
              </div>
            </div>
          </div>
        ) : (
          // no file
          <div className="bg-pink-95 flex h-screen w-full flex-col items-center pt-20">
            <div className="h-full w-full max-w-6xl p-4">
              <div
                onClick={(event) => {
                  fileRef.current?.click();
                }}
                className="relative flex h-full items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24">
                    <IoCloudUpload className="h-full w-full" />
                  </div>
                  <div>Select your file to get started</div>
                </div>
                <div className="absolute bottom-0 right-0 mx-2 my-1 text-sm">
                  .csv & .xlsx only
                </div>
              </div>
            </div>
            <input
              ref={fileRef}
              onChange={onFileChangeHandler}
              type="file"
              name="file"
              className="hidden"
              accept=".csv, .xlsx"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Contribute;

export const QuickStatsSection = ({
  rawData,
  parsedData,
  rawStats,
  parsedStats,
}: {
  rawData: object[] | null;
  parsedData: object[] | null;
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
      <div className="mb-4 text-xl uppercase">quick stats</div>
      <div className="bg-whit flex w-full space-x-4">
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
            <div className="text-7xl">{rawStats?.longestObjectLength}</div>
            <div className="mx-4 text-center uppercase">raw columns</div>
          </div>
          <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
            <div className="text-7xl">{rawData?.length}</div>
            <div className="mx-4 text-center uppercase">raw rows</div>
          </div>
        </div>
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
            <div className="text-7xl">{parsedStats?.longestObjectLength}</div>
            <div className="mx-4 text-center uppercase">parsed columns</div>
          </div>
          <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-zinc-950 bg-opacity-30 outline outline-1 outline-slate-700 backdrop-blur-md">
            <div className="text-7xl">{parsedData?.length}</div>
            <div className="mx-4 text-center uppercase">parsed rows</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AnalyticsSection = ({
  rawData,
  parsedData,
}: {
  rawData: object[] | null;
  parsedData: object[] | null;
}) => {
  const [data, setData] = useState<object[]>([{}]);
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean | undefined;
    payload: any;
    label: string;
  }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="flex flex-col items-center rounded-lg bg-zinc-950 p-2 text-sm outline outline-1 outline-slate-700">
          <div>{`On Row - ${label + 1}`}</div>
          <div>{`Raw Columns - ${payload[0].value}`}</div>
          <div>{`Parsed Columns - ${payload[1].value}`}</div>
        </div>
      );
    }

    return null;
  };
  useEffect(() => {
    if (!!rawData && !!parsedData) {
      setData(calculateColumnCounts(rawData, parsedData));
    }
  }, [rawData, parsedData]);
  return (
    <>
      <div className="my-2 mt-8 text-xl uppercase">analytics</div>
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={400}
            data={data.splice(0, 100)}
            margin={{
              top: -26,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip
              content={(event) => (
                <CustomTooltip
                  active={event.active}
                  label={event.label}
                  payload={event.payload}
                />
              )}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="rawColumns"
              stroke="#4E77FF"
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="parsedColumns"
              stroke="#FFDCCC"
              fill="url(#colorPv)"
            />
            <Legend
              iconType="diamond"
              payload={[
                {
                  value: "Raw Columns",
                  type: "diamond",
                  id: "rawColumns",
                  color: "#4E77FF",
                },
                {
                  value: "Parsed Columns",
                  type: "diamond",
                  id: "parsedColumns",
                  color: "#FFDCCC",
                },
              ]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export const RetentionSection = ({
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
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean | undefined;
    payload: any;
    label: string;
  }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="flex flex-col items-center rounded-lg bg-zinc-950 p-2 text-sm outline outline-1 outline-slate-700">
          <div>{` ${label} - ${payload[0].value}`}</div>
        </div>
      );
    }

    return null;
  };
  const [data, setData] = useState<object[] | null>(null);
  const CustomBarLabel = ({
    x,
    y,
    name,
    value,
  }: {
    x: number;
    y: number;
    name: string;
    value: number;
  }) => {
    return (
      <text
        x={x + 10} // Adjust the position of the label
        y={y + 28} // Place the label at the y-coordinate of the bar
        fill="#fff" // Text color
        fontSize="16px" // Text font size
        textAnchor="start"
        className="text-md text-zinc-50 " // Anchor the text to the start of the bar
      >
        {`${name} - ${value}`}
      </text>
    );
  };
  useEffect(() => {
    setData([
      {
        name: "Actual Columns",
        columns: rawStats?.longestObjectLength,
      },
      {
        name: "Maximun Retention",
        columns: parsedStats?.longestObjectLength,
      },
      {
        name: "Minimum Retention",
        columns: parsedStats?.shortestObjectLength,
      },
    ]);
  }, [parsedStats]);

  return (
    <>
      <div className="mb-2 mt-8 text-xl uppercase">column retention</div>
      <div className="flex h-48 w-full flex-col">
        <ResponsiveContainer>
          <BarChart data={data!} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" hide />
            <Tooltip
              content={(event) => (
                <CustomTooltip
                  active={event.active}
                  label={event.label}
                  payload={event.payload}
                />
              )}
            />
            <Legend
              iconType="diamond"
              payload={[
                {
                  value: "Column Numbers",
                  type: "diamond",
                  id: "columns",
                  color: "#25A494",
                },
              ]}
            />
            <Bar dataKey="columns" fill="#25A49">
              <LabelList
                dataKey="columns"
                content={(event) => {
                  return (
                    <CustomBarLabel
                      x={parseInt(event.x!.toString())}
                      y={parseInt(event.y!.toString())}
                      name={event.name!}
                      value={parseInt(event.value!.toString())}
                    />
                  );
                }}
              />
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke={"#fff"}
                  strokeWidth={2}
                  fill="#25A494"
                  style={{
                    opacity: 0.5,
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

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
      <div className="flex w-full flex-col space-y-6 rounded-xl bg-zinc-950 bg-opacity-30 p-6 outline outline-1 outline-slate-700 backdrop-blur-md">
        {rawStats?.shortestObjectLength ===
        parsedStats?.shortestObjectLength ? (
          <div className="flex w-full rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="">
              <TiTick color="#1ED760" size={28} />
            </div>
            <div className="mt-0.5">
              Every Column Name has been detected and parsed successfully!
            </div>
          </div>
        ) : rawStats?.shortestObjectLength! >
          parsedStats?.longestObjectLength! ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="pt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              We cannot identify every column of your data!
            </div>
          </div>
        ) : parsedStats?.longestObjectLength === 0 ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="pt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">none of your columns are detected!</div>
          </div>
        ) : (
          <></>
        )}
        {rawStats?.objectCount! > parsedStats?.objectCount! && (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              Overlaping Analytics shows there one or more rows which doesnt has
              a single correct column name!
            </div>
          </div>
        )}
        {rawStats?.objectCount === parsedStats?.objectCount ? (
          <div className="flex w-full rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="">
              <TiTick color="#1ED760" size={28} />
            </div>
            <div className="mt-0.5">
              Each and every row of your data has been parsed successfully!
            </div>
          </div>
        ) : rawStats?.objectCount! > parsedStats?.objectCount! ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">
              Not every row has been parsed from your data!
            </div>
          </div>
        ) : parsedStats?.objectCount === 0 ? (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
            <div className="mt-1">
              <BsFillExclamationDiamondFill color={"red"} size={20} />
            </div>
            <div className="mt-0.5">None of your rows has been parsed!</div>
          </div>
        ) : (
          <></>
        )}
        {parsedStats?.shortestObjectLength! < 10 && (
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
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
          <div className="flex w-full space-x-2 rounded-lg bg-slate-900 bg-opacity-70 p-4 outline outline-1 outline-slate-600">
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
