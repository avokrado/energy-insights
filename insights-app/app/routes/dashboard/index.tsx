import React from "react";
import type { Reading } from "@/types/reading";
import type { Route } from "./+types";
import LineGraphClient from "@/components/ui/graphs/line-graph/line-graph-client";
import {
  formatReadingsForBarGraph,
  formatReadingsForLineGraph,
} from "@/utils/format";
import BarChartClient from "@/components/ui/graphs/bar-chart/bar-chart-client";

export async function loader() {
  const res = await fetch(`http://localhost:3000/readings`);
  const data = await res.json();
  return { readings: data as Reading[] };
}

export default function Dashboard({
  loaderData: { readings },
}: Route.ComponentProps) {
  const lineGraphData = formatReadingsForLineGraph(readings, 7);
  const barChartData = formatReadingsForBarGraph(readings);
  console.log("barChartData", barChartData);
  return (
    <div className="flex gap-4 w-full">
      <LineGraphClient chartData={lineGraphData} />
      <BarChartClient chartData={barChartData} />
    </div>
  );
}
