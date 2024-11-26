import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Avatar, Breadcrumb } from "antd";
import CalendarSvgIcon from "../../assets/icons/calendar";
import fetchInterceptor from "../../config/axios";
import { Judge } from "../../type/judge";
import { cn } from "../../utils/tw";
import { formatDate } from "../../utils/date";

const breadcrumbItems = [
  {
    title: "Beranda",
    className: "cursor-pointer",
    href: "/",
  },
  {
    title: "Hakim",
    className: "font-medium text-brand-black-2",
  },
];

function TopSectionJudge() {
  const searchParams = useSearch({ from: "/_layout/judge/$tab" });
  const { data } = useSuspenseQuery({
    queryKey: ["GET_JUDGE", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<Judge>(`/judges/${searchParams.id}`),
  });

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
          <h2 className="heading-24">{data.data.data.name}</h2>
        </div>
        <div className="flex gap-1">
          <CalendarSvgIcon />
          <span className="paragraph-14 text-brand-grey-100">
            Update terbaru {formatDate(data.data.data.updatedAt)}
          </span>
        </div>
        <div className="paragraph-14 flex gap-6 pt-8">
          <Link
            to="/judge/$tab"
            params={{ tab: "analysis" }}
            search={{ id: searchParams.id }}
          >
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
          <Link
            to="/judge/$tab"
            params={{ tab: "case-list" }}
            search={{ id: searchParams.id }}
          >
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
          <Link
            to="/judge/$tab"
            params={{ tab: "custom-analysis" }}
            search={{ id: searchParams.id }}
          >
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

export default TopSectionJudge;
