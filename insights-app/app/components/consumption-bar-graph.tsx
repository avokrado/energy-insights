import React from "react";
import { Spinner } from "./ui/spinner/spinner";
import { cn } from "@/utils/cn";
import { Card } from "./ui/card/card";

import { formatReadingsForBarGraph } from "@/utils/format";
import type { Reading } from "@/types/reading";
import { useQueryParam } from "@/hooks/use-query-params";

const BarChart = React.lazy(() => import("./ui/graphs/bar-chart/bar-chart"));

export default function BarChartClient({
  className,
  data,
  title,
}: {
  className?: string;
  data: Reading[];
  title?: string;
}) {
  const [date, setDate] = useQueryParam("date");

  // Set the default date to today
  React.useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const barChartData = formatReadingsForBarGraph(data, new Date(date || ""));

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const date = new Date(e.target.value);
    setDate(date.toISOString().split("T")[0]);
  }

  if (typeof window === "undefined") return null;

  return (
    <Card className={cn(className)}>
      {title && <h2 className="text-2xl text-center">{title}</h2>}
      <div className="mb-4 flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <input
            type="date"
            id="date"
            value={date || ""}
            onChange={handleDateChange}
            className="rounded border border-gray-300 px-2 py-1"
            aria-label="Select the date to display"
          />
        </div>
      </div>
      <div className="h-[400px] w-full flex justify-center items-center">
        <React.Suspense fallback={<Spinner />}>
          <BarChart chartData={barChartData} />
        </React.Suspense>
      </div>
    </Card>
  );
}
