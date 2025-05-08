import { cn } from "@/utils/cn";
import { Card } from "./ui/card";
import { formatReadingsForLineGraph } from "@/utils/format";
import type { Reading } from "@/types/reading";
import { useQueryParam } from "@/hooks/use-query-params";
import { SelectControl, type SelectOption } from "./ui/select";
import LineGraph from "./ui/graphs/line-graph";

const dayOptions: SelectOption[] = [
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
];

export default function ConsumptionLineGraph({
  className,
  data,
}: {
  className?: string;
  data: Reading[];
}) {
  const [days, setDays] = useQueryParam("days", "7");
  const chartData = formatReadingsForLineGraph(data, Number(days));

  return (
    <Card className={cn(className)}>
      <div className="flex w-full items-center justify-end gap-2">
        <SelectControl
          id="days"
          value={days}
          onChange={setDays}
          options={dayOptions}
          ariaLabel="Select the number of days to display"
        />
      </div>
      <div className="h-[400px] w-full flex justify-center items-center">
        <LineGraph chartData={chartData} />
      </div>
    </Card>
  );
}
