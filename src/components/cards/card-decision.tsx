import { useMemo } from "react";
import { Pie, PieChart } from "recharts";
import { Card } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type CardDecision = {
  rejected: number;
  granted: number;
  partially: number;
};

export default function CardDecision({
  granted,
  partially,
  rejected,
}: CardDecision) {
  const chartConfig = {
    granted: {
      label: "Dikabulkan Total",
      color: "hsl(var(--chart-1))",
    },
    rejected: {
      label: "Ditolak",
      color: "hsl(var(--chart-2))",
    },
    partially: {
      label: "Dikabulkan Sebagian",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => {
    return [
      {
        key: "rejected",
        data: rejected,
        fill: "var(--color-rejected)",
      },
      { key: "granted", data: granted, fill: "var(--color-granted)" },
      { key: "partially", data: partially, fill: "var(--color-partially)" },
    ];
  }, [granted, partially, rejected]);

  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.data, 0);
  }, [chartData]);

  return (
    <Card title="Putusan" className="h-full w-full max-w-[473px]">
      <div className="flex h-full w-10/12 items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[220px] flex-1"
        >
          <PieChart className="h-full w-full">
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="border-0 bg-white"
                  style={{ boxShadow: " 0px 4px 20px 0px #0000001A" }}
                  formatter={(value, name) => (
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-[--color-bg]"
                        style={
                          {
                            "--color-bg": `var(--color-${name})`,
                          } as React.CSSProperties
                        }
                      />
                      <div className="font-work">
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}{" "}
                        :
                        <span className="font-semibold">{` ${value} (${(((value as number) * 100) / totalValue).toFixed()}%)`}</span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="data"
              nameKey="key"
              innerRadius={35}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
        <div>
          {Object.entries(chartConfig).map(([key, val]) => {
            const chartEntry = chartData.find((data) => data.key === key);

            return (
              <div
                className="flex items-center gap-1 font-work font-medium"
                key={key}
              >
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: chartEntry?.fill || val.color }}
                ></div>
                <span>{val.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
