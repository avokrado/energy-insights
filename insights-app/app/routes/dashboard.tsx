import BarChartClient from "@/components/consumption-bar-graph";

import ConsumptionLineGraph from "@/components/consumption-line-graph";
import type { Route } from "./+types/dashboard";
import { getReadings } from "@/services/api";

export async function loader() {
  const readings = await getReadings();

  return { readings };
}

export default function Dashboard({
  loaderData: { readings },
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="w-full lg:w-1/2">
        <ConsumptionLineGraph title="Consumption by device" data={readings} />
      </div>
      <div className="w-full lg:w-1/2">
        <BarChartClient title="Consumption by device" data={readings} />
      </div>
    </div>
  );
}
