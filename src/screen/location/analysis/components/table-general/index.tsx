import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import fetchInterceptor from "../../../../../config/axios";
import { TopicCases } from "../../../../../type/topic";
import { transformData } from "../../../../../utils/array";
import { qs } from "../../../../../utils/qs";
import TableGeneralColumns from "./columns";

export default function TableListClient() {
  const searchParams = useSearch({ from: "/_layout/location/$tab" });

  const queryString = qs({
    populate: {
      cases: {
        fields: ["title", "info"],
        populate: {
          plaintiff: {
            fields: ["name"],
          },
          defendant: {
            fields: ["name"],
          },
        },
      },
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_TOPIC_GENERAL", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<TopicCases>(
        `/locations/${searchParams.id}${queryString}`,
      ),
  });

  const plaintiff = data.data.data.cases.map((c) => {
    return {
      name: c.plaintiff.name,
      info: c.info,
      id: c.plaintiff.documentId,
    };
  });

  const defendant = data.data.data.cases.map((c) => {
    switch (c.info) {
      case "Dikabulkan Total":
        return {
          name: c.defendant.name,
          id: c.defendant.documentId,
          info: "Ditolak",
        };
      case "Ditolak":
        return {
          name: c.defendant.name,
          id: c.defendant.documentId,
          info: "Dikabulkan Total",
        };
      default:
        return {
          name: c.defendant.name,
          id: c.defendant.documentId,
          info: c.info,
        };
    }
  });

  const transformed = transformData([...plaintiff, ...defendant]);

  return (
    <Card title="Daftar Orang">
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
        dataSource={transformed}
        columns={TableGeneralColumns()}
        rowKey={"id"}
      />
    </Card>
  );
}
