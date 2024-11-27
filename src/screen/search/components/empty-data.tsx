import Empty from "../../../assets/images/not-found.png";
import { cn } from "../../../utils/tw";

type EmptyData = {
  bordered?: boolean;
  desc?: string;
};

export default function EmptyData({ bordered = true, desc }: EmptyData) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[381px] w-full items-center justify-center rounded-[10px] border-black/10 bg-white",
        bordered && "border",
      )}
    >
      <div className="flex flex-col items-center space-y-3">
        <img src={Empty} alt="image" className="size-[200px]" />
        <h1 className="text-center font-work text-2xl font-semibold text-brand-black">
          Data tidak ditemukan
        </h1>
        <p className="w-[375px] text-center font-work text-sm text-brand-black">
          {desc}
        </p>
      </div>
    </div>
  );
}
