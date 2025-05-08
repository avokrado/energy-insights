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
  defaultDate,
}: {
  className?: string;
  data: ReturnType<typeof formatReadingsForBarGraph>;
  defaultDate: string;
}) {
  const [date, setDate] = useQueryParam("date", defaultDate);

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  return (
    <Card className={cn(className)}>
      <div className="flex w-full items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="rounded border border-gray-300 px-2 py-1"
            aria-label="Select the date to display"
          />
        </div>
      </div>
      <div className="h-[400px] w-full flex justify-center items-center">
        <BarChart chartData={data} />
      </div>
    </Card>
  );
}
