"use client";
import {
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  Cell,
} from "recharts";
import React, { useEffect, useState } from "react";

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
