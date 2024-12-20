import { Tooltip } from "antd";
import { cn } from "../../utils/tw";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ClassNameValue } from "tailwind-merge";

type TableHeadProps = {
  title: string;
  bgDot?: "bg-granted" | "bg-rejected" | "bg-partially";
  showTooltip?: boolean;
  noWrapTitle?: boolean;
  className?: ClassNameValue;
};

export default function TableHead({
  bgDot,
  title,
  showTooltip = false,
  noWrapTitle = false,
  className = "",
}: TableHeadProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 font-work text-base font-bold text-brand-black",
        className,
      )}
    >
      {bgDot && (
        <div className={cn("aspect-square size-[10px] rounded-full", bgDot)} />
      )}
      <span
        className={cn(
          "w-min text-left leading-5",
          noWrapTitle && "text-nowrap",
        )}
      >
        {title}
      </span>
      {showTooltip && (
        <Tooltip
          color="#fff"
          placement="topLeft"
          title={() => (
            <div className="font-work text-sm text-brand-black">
              <strong>Index Point :</strong> Semakin tinggi angka persentase,
              maka semakin baik.
            </div>
          )}
          arrow={false}
        >
          <InfoCircleOutlined className="text-sm text-black text-opacity-25 hover:bg-none" />
        </Tooltip>
      )}
    </div>
  );
}
