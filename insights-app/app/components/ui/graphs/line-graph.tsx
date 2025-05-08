import { useIsClient } from "@/hooks/use-is-client";
import { ResponsiveLine } from "@nivo/line";
import { Spinner } from "../spinner";

export interface LineGraphProps {
  chartData: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
}

export default function LineGraph({ chartData }: LineGraphProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <Spinner />;
  }

  if (chartData.length === 0) {
    return <div>No data to display</div>;
  }
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 20, right: 100, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear" }}
      axisLeft={{
        legend: "kWh",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={8}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor={{ from: "seriesColor" }}
      useMesh={true}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          symbolSize: 12,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
