import BarChartClient from "@/components/consumption-bar-graph";

import ConsumptionLineGraph from "@/components/consumption-line-graph";
import type { Route } from "./+types/dashboard";
import { getReadings } from "@/services/api";
import { formatReadingsForBarGraph } from "@/utils/format";
import { formatReadingsForLineGraph } from "@/utils/format";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const date =
    url.searchParams.get("date") || new Date().toISOString().split("T")[0];
  const days = url.searchParams.get("days") || "7";

  const readings = await getReadings();

  const barChartData = formatReadingsForBarGraph(readings, new Date(date));
  const lineChartData = formatReadingsForLineGraph(readings, Number(days));

  return {
    readings,
    barChartData,
    lineChartData,
    date,
    days,
  };
}

export default function Dashboard({
  loaderData: { barChartData, lineChartData, date, days },
}: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-2xl font-bold">Energy consumption insights</h1>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="w-full lg:w-1/2">
          <ConsumptionLineGraph data={lineChartData} defaultDays={days} />
        </div>
        <div className="w-full lg:w-1/2">
          <BarChartClient data={barChartData} defaultDate={date} />
        </div>
      </div>
    </>
  );
}
