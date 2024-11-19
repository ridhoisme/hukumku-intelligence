import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar, Tooltip } from "antd";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import CalendarSvgIcon from "../../../assets/icons/calendar";
import { ChartConfig, ChartContainer } from "../../../components/ui/chart";
import { InfoCircleOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/date";

type CardSearchProps = {
  document?: number;
  showDetail?: boolean;
  showAvatar?: boolean;
  title: string;
  location?: string;
  createdAt?: string;
  updatedAt: string;
  topic?: string;
  granted?: number;
  rejected?: number;
  partially?: number;
};

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

export default function CardSearch({
  document,
  showDetail = true,
  showAvatar = true,
  title,
  location = "",
  topic,
  rejected = 0,
  granted = 0,
  partially = 0,
  updatedAt,
}: CardSearchProps) {
  const navigate = useNavigate();

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
    <div
      onClick={() =>
        navigate({ to: "/lawyer/$tab", params: { tab: "analysis" } })
      }
      className="flex h-full w-full flex-col rounded-[10px] border border-black/10 bg-white"
    >
      <div className="h-full w-full flex-1 space-y-3 p-4">
        <div className="flex items-center gap-4">
          {showAvatar && (
            <div>
              <Avatar size={50} className="aspect-square" />
            </div>
          )}
          <Link className="line-clamp-2 font-work font-semibold text-brand-blue-100 hover:text-brand-blue-100/75">
            {title}
          </Link>
        </div>
        <div className="space-y-3">
          {showDetail && (
            <>
              <div className="font-work">
                <span className="text-[10px] leading-3 text-brand-grey-100">
                  Top Topik
                </span>
                <div className="text-xs font-medium leading-[14px]">
                  {topic}
                </div>
              </div>
              <div className="font-work">
                <Tooltip
                  color="#fff"
                  placement="topLeft"
                  title={() => (
                    <div className="font-work text-sm text-brand-black">
                      <strong>Index Point :</strong> Semakin tinggi angka
                      persentase, maka semakin baik.
                    </div>
                  )}
                  arrow={false}
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] leading-3 text-brand-grey-100">
                        Index Point
                      </span>
                      <InfoCircleOutlined className="text-[10px] text-black text-opacity-25 hover:bg-none" />
                    </div>
                  </div>
                </Tooltip>
                <div className="text-xs font-medium leading-[14px]">
                  Coming Soon
                </div>
              </div>
              <div className="font-work">
                <span className="text-[10px] leading-3 text-brand-grey-100">
                  Top Lokasi
                </span>
                <div className="text-xs font-medium leading-[14px]">
                  {location}
                </div>
              </div>
            </>
          )}
          {document && (
            <div className="font-work">
              <span className="text-sm font-medium text-brand-black">
                {`${document} Dokumen`}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 font-work">
          <CalendarSvgIcon className="size-2" />
          <span className="text-[8px] text-brand-grey-100">
            Update terbaru {formatDate(updatedAt)}
          </span>
        </div>
      </div>
      <div className="relative flex h-[74px] w-full flex-row border-t border-black/10 px-4 py-3">
        <ChartContainer
          config={chartConfig}
          className="absolute right-2 top-0 aspect-square h-full max-h-[74px] flex-1"
        >
          <PieChart className="h-full w-full">
            <Pie
              data={chartData}
              dataKey="data"
              nameKey="key"
              innerRadius={15}
              strokeWidth={10}
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
                          y={(viewBox.cy || 0) - 3}
                          className="fill-foreground text-[10px] font-bold"
                        >
                          {totalValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-brand-grey-100 text-[6px]"
                        >
                          Kasus
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div>
          {Object.entries(chartConfig).map(([key, val]) => {
            const chartEntry = chartData.find((data) => data.key === key);

            return (
              <div
                className="flex items-center gap-1 font-work text-[9px]"
                key={key}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: chartEntry?.fill || val.color }}
                ></div>
                <span>{val.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
