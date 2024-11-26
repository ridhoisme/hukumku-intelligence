import { Tooltip } from "antd";

export default function CardIndexPoint() {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[10px] bg-white p-4 font-work">
      <Tooltip
        color="#fff"
        className="bg-white"
        placement="topLeft"
        title={() => (
          <div className="font-work text-sm text-brand-black">
            <strong>Index Point :</strong> Semakin tinggi angka persentase, maka
            semakin baik.
          </div>
        )}
        arrow={false}
      >
        <div className="cursor-pointer text-sm font-medium text-brand-grey-200">
          INDEX POINT
        </div>
      </Tooltip>
      <div className="text-brand-green-300 bg-brand-grey-300 w-fit rounded-full px-3 py-[10px] text-sm font-medium">
        Coming Soon
      </div>
    </div>
  );
}
