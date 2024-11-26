import { Link } from "@tanstack/react-router";
import { Card } from "../../../components/ui/card";
import { LocationsCases } from "../../../type/location";
import CardSearch from "../components/card-search";
import EmptyData from "../components/empty-data";

type ListLocation = {
  data: LocationsCases;
};

export default function ListLocation({ data }: ListLocation) {
  return (
    <Card title="Lokasi Pengadilan" id="lokasi">
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
            <Link
              to="/location/$tab"
              params={{ tab: "analysis" }}
              search={{ id: val.documentId }}
              className="hover:text-inherit"
            >
              <CardSearch
                key={val.documentId}
                showDetail={false}
                showAvatar={false}
                title={val.name}
                updatedAt={val.updatedAt}
                rejected={rejected}
                partially={partially}
                granted={granted}
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
          search={{ category: "Lokasi" }}
        >
          Lihat semua lokasi
        </Link>
      </div>
    </Card>
  );
}
