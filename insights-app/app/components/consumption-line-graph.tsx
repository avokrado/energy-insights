import React from "react";
import { Spinner } from "./ui/spinner/spinner";
import { cn } from "@/utils/cn";
import { Card } from "./ui/card/card";
import { formatReadingsForLineGraph } from "@/utils/format";
import type { Reading } from "@/types/reading";
import { useQueryParam } from "@/hooks/use-query-params";

const LineGraph = React.lazy(() => import("./ui/graphs/line-graph/line-graph"));

export default function ConsumptionLineGraph({
  className,
  data,
  title,
}: {
  className?: string;
  data: Reading[];
  title?: string;
}) {
  const [days, setDays] = useQueryParam("days", "7"); // ← default 7

  const chartData = formatReadingsForLineGraph(data, Number(days));

  if (typeof window === "undefined") return null;

  return (
    <Card className={cn(className)}>
      {title && <h2 className="text-2xl text-center">{title}</h2>}
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="days" className="text-sm font-medium">
          Last:
        </label>
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
