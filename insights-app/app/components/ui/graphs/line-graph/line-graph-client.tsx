import React from "react";
import { Spinner } from "../../spinner/spinner";
import { cn } from "@/utils/cn";

const LineGraph = React.lazy(() => import("./line-graph"));

export default function LineGraphClient({
  className,
  chartData,
}: {
  className?: string;
  chartData: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
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
        <LineGraph chartData={chartData} />
      </React.Suspense>
    </div>
  );
}
