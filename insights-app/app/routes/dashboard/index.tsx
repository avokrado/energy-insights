import React from "react";
import type { Reading } from "@/types/reading";
import type { Route } from "./+types";

import BarChartClient from "@/components/consumption-bar-graph";

import ConsumptionLineGraph from "@/components/consumption-line-graph";

export async function loader() {
  const res = await fetch(`http://localhost:3000/readings`);
  const data = await res.json();

  return { readings: data as Reading[] };
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
