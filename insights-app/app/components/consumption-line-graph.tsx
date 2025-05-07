import React from "react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/utils/cn";
import { Card } from "./ui/card";
import { formatReadingsForLineGraph } from "@/utils/format";
import type { Reading } from "@/types/reading";
import { useQueryParam } from "@/hooks/use-query-params";

const LineGraph = React.lazy(() => import("./ui/graphs/line-graph"));

export default function ConsumptionLineGraph({
  className,
  data,
}: {
  className?: string;
  data: Reading[];
}) {
  const [days, setDays] = useQueryParam("days", "7"); // ← default 7
  const chartData = formatReadingsForLineGraph(data, Number(days));

  // Render only on client
  if (typeof window === "undefined") return null;

  return (
    <Card className={cn(className)}>
      <div className="flex w-full items-center justify-end gap-2">
        <select
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1"
          aria-label="Select the number of days to display"
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>
      </div>
      <div className="h-[400px] w-full flex justify-center items-center">
        <React.Suspense fallback={<Spinner />}>
          <LineGraph chartData={chartData} />
        </React.Suspense>
      </div>
    </Card>
  );
}
