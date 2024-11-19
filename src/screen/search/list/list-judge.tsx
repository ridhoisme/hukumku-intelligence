import { Link } from "@tanstack/react-router";
import { Card } from "../../../components/ui/card";
import { JudgesCases } from "../../../type/judge";
import CardSearch from "../components/card-search";
import { getMostFrequentValue } from "../../../utils/array";
import EmptyData from "../components/empty-data";

type ListJudge = {
  data: JudgesCases;
};

export default function ListJudge({ data }: ListJudge) {
  return (
    <Card title="Hakim" id="hakim">
      <div className="grid grid-cols-3 gap-[18px] p-4">
        {data.data.map((val) => {
          const locations = val.cases.map((val) => val.location.name);
          const topics = val.cases.map((val) => val.topic.name);
          const rejected = val.cases.filter(
            (val) => val.info === "Ditolak",
          ).length;
          const granted = val.cases.filter(
            (val) => val.info === "Dikabulkan Total",
          ).length;
          const partially = val.cases.filter(
            (val) => val.info === "Dikabulkan Sebagian",
          ).length;

          return (
            <CardSearch
              key={val.documentId}
              location={getMostFrequentValue(locations) ?? ""}
              updatedAt={val.updatedAt}
              title={val.name}
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
          search={{ category: "Hakim" }}
        >
          Lihat semua hakim
        </Link>
      </div>
    </Card>
  );
}
