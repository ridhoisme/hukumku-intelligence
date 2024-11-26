import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import fetchInterceptor from "../../../../../config/axios";
import { TopicCases } from "../../../../../type/topic";
import { transformData } from "../../../../../utils/array";
import { qs } from "../../../../../utils/qs";
import TableLocationColumns from "./columns";

export default function TableListLocation() {
  const searchParams = useSearch({ from: "/_layout/topic/$tab" });
  const queryString = qs({
    populate: {
      cases: {
        fields: ["title", "info"],
        populate: {
          location: {
            fields: ["name"],
          },
        },
      },
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_TOPIC_LOCATIONS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<TopicCases>(
        `/topics/${searchParams.id}${queryString}`,
      ),
  });

  const location = data.data.data.cases.map((c) => {
    return {
      name: c.location.name,
      info: c.info,
      id: c.location.documentId,
    };
  });

  const transformed = transformData(location);

  return (
    <Card className="" title="Daftar Lokasi Pengadilan">
      <Table
        pagination={{
          total: transformed.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 5,
          defaultCurrent: 1,
          locale: { items_per_page: "" },
          position: ["bottomCenter"],
          pageSizeOptions: [5, 10, 20, 40, 100],
        }}
        className="m-4 font-work"
        rowKey={"id"}
        dataSource={transformed}
        columns={TableLocationColumns()}
      />
    </Card>
  );
}
