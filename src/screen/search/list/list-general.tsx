import { Link } from "@tanstack/react-router";
import { Card } from "../../../components/ui/card";
import { GeneralsCases } from "../../../type/general";
import CardSearch from "../components/card-search";
import { getMostFrequentValue } from "../../../utils/array";
import EmptyData from "../components/empty-data";

type ListGeneral = {
  data: GeneralsCases;
};

export default function ListGeneral({ data }: ListGeneral) {
  return (
    <Card title="Umum" id="umum">
      <div className="grid grid-cols-3 gap-[18px] p-4">
        {data.data.map((val) => {
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
            <Link
              to="/general/$tab"
              params={{ tab: "analysis" }}
              search={{ id: val.documentId }}
              className="hover:text-inherit"
            >
              <CardSearch
                key={val.documentId}
                location={getMostFrequentValue(locations) ?? ""}
                updatedAt={val.updatedAt}
                title={val.name}
                rejected={rejected}
                partially={partially}
                granted={granted}
                topic={getMostFrequentValue(topics) ?? ""}
              />
            </Link>
          );
        })}
      </div>
      {data.meta.pagination.total === 0 && <EmptyData bordered={false} />}
      <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
        <Link
          className="hover:text-brand-green-100"
          to="/search"
          search={{ category: "Umum" }}
        >
          Lihat semua umum
        </Link>
      </div>
    </Card>
  );
}
