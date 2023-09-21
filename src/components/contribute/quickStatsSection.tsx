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
