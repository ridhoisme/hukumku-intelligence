import { Link } from "@tanstack/react-router";
import { Card } from "../../../components/ui/card";
import { TopicsCases } from "../../../type/topic";
import CardSearch from "../components/card-search";
import EmptyData from "../components/empty-data";

type ListTopic = {
  data: TopicsCases;
};

export default function ListTopic({ data }: ListTopic) {
  return (
    <Card title="Topik" id="topik">
      <div className="grid grid-cols-3 gap-[18px] p-4">
        {data.data.map((val) => {
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
              showDetail={false}
              document={val.cases.length}
              showAvatar={false}
              updatedAt={val.updatedAt}
              title={val.name}
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
          search={{ category: "Topik" }}
        >
          Lihat semua topik
        </Link>
      </div>
    </Card>
  );
}
