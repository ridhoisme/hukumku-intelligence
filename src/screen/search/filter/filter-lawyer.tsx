import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Pagination } from "antd";
import { useMemo, useState } from "react";
import { filterLawyer } from "../../../queries/lawyer";
import { LawyersCases } from "../../../type/lawyer";
import CardSearch from "../components/card-search";
import EmptyData from "../components/empty-data";

export default function FilterLawyer() {
  const searchParams = useSearch({ from: "/_layout/_search/search" });
  const [page, setPage] = useState(1);

  const queryString = useMemo(() => {
    return {
      search: searchParams.about ?? "",
      location: searchParams.location ?? "",
      topics: searchParams.topic ?? "",
      pagination: {
        pageSize: 9,
        page,
      },
    };
  }, [page, searchParams.about, searchParams.location, searchParams.topic]);

  const { data, refetch } = useSuspenseQuery(
    filterLawyer<LawyersCases>(queryString),
  );

  const handleChangePage = (page: number) => {
    setPage(page);
    refetch();
  };

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
            <Link
              key={val.documentId}
              to="/lawyer/$tab"
              params={{ tab: "analysis" }}
              search={{ id: val.documentId }}
              className="hover:text-inherit"
            >
              <CardSearch
                location={val.top_location}
                title={val.name}
                updatedAt={val.updatedAt}
                topic={val.top_topic}
                rejected={rejected}
                granted={granted}
                partially={partially}
              />
            </Link>
          );
        })}
      </div>
      {data.data.meta.pagination.pageCount > 1 && (
        <Pagination
          showSizeChanger={false}
          align="center"
          total={data.data.meta.pagination.total}
          pageSize={data.data.meta.pagination.pageSize}
          onChange={handleChangePage}
        />
      )}
    </>
  );
}
