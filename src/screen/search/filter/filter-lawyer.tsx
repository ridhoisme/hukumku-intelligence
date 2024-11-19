import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Pagination } from "antd";
import { getLawyers } from "../../../queries/lawyer";
import { LawyersCases } from "../../../type/lawyer";
import { getMostFrequentValue } from "../../../utils/array";
import CardSearch from "../components/card-search";
import EmptyData from "../components/empty-data";

export default function FilterLawyer() {
  const searchParams = useSearch({ from: "/_layout/_search/search" });
  const { data } = useSuspenseQuery(
    getLawyers<LawyersCases>({
      pagination: {
        pageSize: 9,
      },
      populate: {
        plaintiff_cases: {
          populate: {
            topic: {
              fields: "name",
            },
            location: {
              fields: "name",
            },
          },
        },
        defendant_cases: {
          populate: {
            topic: {
              fields: "name",
            },
            location: {
              fields: "name",
            },
          },
        },
      },
      filters: {
        $or: [
          {
            plaintiff_cases: {
              id: {
                $notNull: true,
              },
              topic: {
                $or: [
                  {
                    name: {
                      $containsi: searchParams.about ?? "",
                    },
                  },
                  ...(searchParams.topic ? searchParams.topic : []).map(
                    (val) => ({
                      name: {
                        $containsi: val,
                      },
                    }),
                  ),
                ],
              },
              location: {
                name: {
                  $containsi: searchParams.location ?? "",
                },
              },
            },
          },
          {
            defendant_cases: {
              id: {
                $notNull: true,
              },
              topic: {
                $or: [
                  {
                    name: {
                      $containsi: searchParams.about ?? "",
                    },
                  },
                  ...(searchParams.topic ? searchParams.topic : []).map(
                    (val) => ({
                      name: {
                        $containsi: val,
                      },
                    }),
                  ),
                ],
              },
              location: {
                name: {
                  $containsi: searchParams.location ?? "",
                },
              },
            },
          },
        ],
      },
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

          let cases = [
            ...defendant_cases.filter((val) =>
              val.topic.name.toLowerCase().includes(searchParams.about ?? ""),
            ),
            ...val.plaintiff_cases.filter((val) =>
              val.topic.name.toLowerCase().includes(searchParams.about ?? ""),
            ),
          ];

          if (searchParams.location) {
            cases = cases.filter(
              (val) => val.location.name === searchParams.location,
            );
          }

          if (
            Array.isArray(searchParams.topic) &&
            searchParams.topic.length > 0
          ) {
            cases = cases.filter((val) =>
              searchParams.topic?.includes(val.location.name),
            );
          }

          const locations = cases.map((val) => val.location.name);
          const topics = cases.map((val) => val.topic.name);
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
              location={getMostFrequentValue(locations) ?? ""}
              title={val.name}
              updatedAt={val.updatedAt}
              topic={getMostFrequentValue(topics) ?? ""}
              rejected={rejected}
              granted={granted}
              partially={partially}
            />
          );
        })}
      </div>
      <Pagination
        showSizeChanger={false}
        align="center"
        defaultCurrent={1}
        total={data.data.meta.pagination.total}
      />
    </>
  );
}
