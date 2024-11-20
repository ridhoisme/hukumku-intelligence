import StepUp from "../../../../assets/icons/step-up";

export default function CardTotalCase({ total }: { total: number }) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[10px] bg-white p-4 font-work">
      <div className="text-sm font-medium text-brand-grey-200">TOTAL KASUS</div>
      <div className="text-[2rem] font-semibold text-brand-black">{total}</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-brand-green-200">80%</span>
          <StepUp />
        </div>
        <span className="text-sm text-brand-grey-100">Dari awal kerja</span>
      </div>
    </div>
  );
}
