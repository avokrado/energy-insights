import React from "react";
import { Spinner } from "../../spinner/spinner";
import { cn } from "@/utils/cn";
import type { BarChartProps } from "./bar-chart";

const BarChart = React.lazy(() => import("./bar-chart"));

export default function BarChartClient({
  className,
  chartData,
}: {
  className?: string;
  chartData: BarChartProps["chartData"];
}) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={cn(
        "h-[500px] w-full border-2 border-red-500 flex justify-center items-center",
        className
      )}
    >
      <React.Suspense fallback={<Spinner />}>
        <BarChart chartData={chartData} />
      </React.Suspense>
    </div>
  );
}
