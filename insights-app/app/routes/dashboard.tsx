import BarChartClient from "@/components/consumption-bar-graph";

import ConsumptionLineGraph from "@/components/consumption-line-graph";
import type { Route } from "./+types/dashboard";
import { getReadings } from "@/services/api";
import React from "react";
export async function loader() {
  const readings = await getReadings();

  return { readings };
}

export default function Dashboard({
  loaderData: { readings },
}: Route.ComponentProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Energy consumption insights</h1>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="w-full lg:w-1/2">
          {isClient && <ConsumptionLineGraph data={readings} />}
        </div>
        <div className="w-full lg:w-1/2">
          {isClient && <BarChartClient data={readings} />}
        </div>
      </div>
    </>
  );
}
