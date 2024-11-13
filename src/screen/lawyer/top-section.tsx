import { Avatar, Breadcrumb } from "antd";
import CalendarSvgIcon from "../../assets/icons/calendar";
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/tw";

const breadcrumbItems = [
  {
    title: "Beranda",
    className: "cursor-pointer",
  },
  {
    title: "Advokat",
    className: "font-medium text-brand-black-2",
  },
];

function TopSectionLawyer() {
  return (
    <div className="flex h-full w-full justify-center bg-white px-[50px]">
      <div className="w-full max-w-brand-lg space-y-3 pt-11">
        <Breadcrumb
          className="paragraph-14 text-brand-grey-100"
          separator=">"
          items={breadcrumbItems}
        />
        <div className="flex items-center gap-3">
          <Avatar size={64} />
          <h2 className="heading-24">
            Fritz Paris Junior Hutapea, S.H., LL. B.
          </h2>
        </div>
        <div className="flex gap-1">
          <CalendarSvgIcon />
          <span className="paragraph-14 text-brand-grey-100">
            Data terbaru dari 10/10/2020 - 10/10/2024
          </span>
        </div>
        <div className="paragraph-14 flex gap-6 pt-8">
          <Link to="/lawyer/$tab" params={{ tab: "analysis" }}>
            {({ isActive }) => (
              <div
                className={cn(
                  "h-8 cursor-pointer hover:text-brand-black-2",
                  isActive &&
                    "border-b-2 border-brand-green-100 font-semibold text-brand-green-100",
                )}
              >
                Analisis
              </div>
            )}
          </Link>
          <Link to="/lawyer/$tab" params={{ tab: "case-list" }}>
            {({ isActive }) => (
              <div
                className={cn(
                  "h-8 cursor-pointer hover:text-brand-black-2",
                  isActive &&
                    "border-b-2 border-brand-green-100 font-semibold text-brand-green-100",
                )}
              >
                List Kasus
              </div>
            )}
          </Link>
          <Link to="/lawyer/$tab" params={{ tab: "custom-analysis" }}>
            {({ isActive }) => (
              <div
                className={cn(
                  "h-8 cursor-pointer hover:text-brand-black-2",
                  isActive &&
                    "border-b-2 border-brand-green-100 font-semibold text-brand-green-100",
                )}
              >
                Custom Analisis
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopSectionLawyer;
