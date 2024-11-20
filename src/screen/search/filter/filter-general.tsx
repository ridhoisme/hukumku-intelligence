import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Pagination } from "antd";
import { filterGeneral } from "../../../queries/general";
import { GeneralsCases } from "../../../type/general";
import CardSearch from "../components/card-search";
import EmptyData from "../components/empty-data";

export default function FilterGeneral() {
  const searchParams = useSearch({ from: "/_layout/_search/search" });
  const { data } = useSuspenseQuery(
    filterGeneral<GeneralsCases>({
      search: searchParams.about ?? "",
      location: searchParams.location ?? "",
      topics: searchParams.topic ?? "",
    }),
  );

  return data.data.meta.pagination.total === 0 ? (
    <EmptyData />
  ) : (
    <>
      <span className="font-work text-sm text-brand-black">
        Menampilkan {data.data.meta.pagination.total} hasil
      </span>
      <div className="grid w-full grid-cols-3 gap-[18px]">
        {data.data.data.map((val) => {
          const defendant_cases = val.defendant_cases.map((caseItem) => {
            switch (caseItem.info) {
              case "Dikabulkan Total":
                return { ...caseItem, info: "Ditolak" };
              case "Ditolak":
                return { ...caseItem, info: "Dikabulkan Total" };
              default:
                return caseItem;
            }
          });

          const cases = [...defendant_cases, ...val.plaintiff_cases];
          const rejected = cases.filter((val) => val.info === "Ditolak").length;
          const granted = cases.filter(
            (val) => val.info === "Dikabulkan Total",
          ).length;
          const partially = cases.filter(
            (val) => val.info === "Dikabulkan Sebagian",
          ).length;

          return (
            <CardSearch
              key={val.documentId}
              location={val.top_location}
              title={val.name}
              updatedAt={val.updatedAt}
              topic={val.top_topic}
              rejected={rejected}
              granted={granted}
              partially={partially}
            />
          );
        })}
      </div>
      {data.data.meta.pagination.pageCount > 1 && (
        <Pagination
          showSizeChanger={false}
          align="center"
          defaultCurrent={1}
          total={data.data.meta.pagination.total}
        />
      )}
    </>
  );
}
