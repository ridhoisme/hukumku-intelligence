import { Link } from "@tanstack/react-router";
import { Card } from "../../../components/ui/card";
import { LawyersCases } from "../../../type/lawyer";
import CardSearch from "../components/card-search";
import { getMostFrequentValue } from "../../../utils/array";
import EmptyData from "../components/empty-data";

type ListLawyer = {
  data: LawyersCases;
};

export default function ListLawyer({ data }: ListLawyer) {
  return (
    <Card title="Advokat" id="advokat">
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
      {data.meta.pagination.total === 0 && <EmptyData bordered={false} />}
      <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
        <Link
          className="hover:text-brand-green-100"
          to="/search"
          search={{ category: "Advokat" }}
        >
          Lihat semua advokat
        </Link>
      </div>
    </Card>
  );
}
