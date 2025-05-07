import { ResponsiveBar } from "@nivo/bar";

export interface BarChartProps {
  chartData: {
    deviceId: string;
    kWh: number;
  }[];
}

export default function BarChart({ chartData }: BarChartProps) {
  if (chartData.length === 0) {
    return <div>No data to display</div>;
  }
  return (
    <ResponsiveBar
      data={chartData}
      keys={["kWh"]}
      indexBy="deviceId"
      margin={{ top: 30, bottom: 30, left: 60, right: 30 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "tableau10" }}
      axisTop={null}
      animate={true}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Consumption by device (kWh)",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      ariaLabel="Device consumption bar chart"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} kWh for device: ${e.indexValue}`
      }
    />
  );
}
