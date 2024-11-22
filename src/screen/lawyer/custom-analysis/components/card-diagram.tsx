import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card } from "../../../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../components/ui/chart";

type CardDiagram = {
  rejected: number;
  granted: number;
  partially: number;
};

export default function CardDiagram({
  granted,
  partially,
  rejected,
}: CardDiagram) {
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
    empty: {
      label: "No Data",
      color: "hsl(var(--chart-empty))",
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => {
    const data = [
      { key: "rejected", data: rejected, fill: "var(--color-rejected)" },
      { key: "granted", data: granted, fill: "var(--color-granted)" },
      { key: "partially", data: partially, fill: "var(--color-partially)" },
    ];

    const total = data.reduce((acc, curr) => acc + curr.data, 0);

    // Add a fallback segment if total is 0
    return total === 0
      ? [{ key: "empty", data: 1, fill: "var(--color-empty)" }]
      : data;
  }, [granted, partially, rejected]);

  const totalValue = useMemo(() => {
    if (chartData[0].key === "empty") return 0;
    return chartData.reduce((acc, curr) => acc + curr.data, 0);
  }, [chartData]);

  return (
    <Card title="Putusan" className="h-full max-h-[290px] w-full">
      <div className="flex h-full items-center justify-start">
        <div className="aspect-square h-full w-auto">
          <ChartContainer
            config={chartConfig}
            className="h-6/6 !aspect-square w-auto"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="border-0 bg-white"
                    style={{ boxShadow: " 0px 4px 20px 0px #0000001A" }}
                    formatter={(value, name) => {
                      if (name === "empty") {
                        return (
                          <div className="flex items-center gap-1">
                            <div
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: "var(--color-empty)" }}
                            />
                            <div className="font-work">No Data Available</div>
                          </div>
                        );
                      }

                      const config =
                        chartConfig[name as keyof typeof chartConfig];
                      return (
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
                            {config?.label || name}:
                            <span className="font-semibold">{` ${value} (${(((value as number) * 100) / totalValue).toFixed()}%)`}</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="data"
                nameKey="key"
                innerRadius={45}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 15}
                            className="font-work text-[11px] text-brand-black"
                          >
                            Total Putusan
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 8}
                            className="font-work text-[34px] font-semibold text-brand-black"
                          >
                            {totalValue}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div>
          {Object.entries(chartConfig).map(([key, val]) => {
            const chartEntry = chartData.find((data) => data.key === key);
            if (val.label === "No Data") return;
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
