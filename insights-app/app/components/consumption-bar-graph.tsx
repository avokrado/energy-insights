import React from "react";
import { cn } from "@/utils/cn";
import { Card } from "./ui/card";
import { formatReadingsForBarGraph } from "@/utils/format";
import type { Reading } from "@/types/reading";
import { useQueryParam } from "@/hooks/use-query-params";
import BarChart from "./ui/graphs/bar-chart";

export default function BarChartClient({
  className,
  data,
}: {
  className?: string;
  data: Reading[];
}) {
  const [date, setDate] = useQueryParam("date");

  React.useEffect(() => {
    if (!date) {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [date, setDate]);

  const barChartData = formatReadingsForBarGraph(
    data,
    date ? new Date(date) : undefined
  );

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const date = new Date(e.target.value);
    setDate(date.toISOString().split("T")[0]);
  }

  return (
    <Card className={cn(className)}>
      <div className="flex w-full items-center justify-end gap-4">
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
        <BarChart chartData={barChartData} />
      </div>
    </Card>
  );
}
