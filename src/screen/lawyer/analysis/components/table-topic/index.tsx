import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import TableTopicColumns from "./columns";
import { transformData } from "../../../../../utils/array";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchInterceptor from "../../../../../config/axios";
import { LawyerCases } from "../../../../../type/lawyer";
import { useSearch } from "@tanstack/react-router";
import { qs } from "../../../../../utils/qs";

export default function TableListTopic() {
  const searchParams = useSearch({ from: "/_layout/lawyer/$tab" });
  const queryString = qs({
    populate: {
      defendant_cases: {
        fields: ["title", "info"],
        populate: {
          topic: {
            fields: ["name"],
          },
        },
      },
      plaintiff_cases: {
        fields: ["title", "info"],
        populate: {
          topic: {
            fields: ["name"],
          },
        },
      },
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_LAWYERS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<LawyerCases>(
        `/lawyers/${searchParams.id}${queryString}`,
      ),
  });

  const plaintiff_cases = data.data.data.plaintiff_cases;
  const defendant_cases = data.data.data.defendant_cases;

  const plaintiff_topic = plaintiff_cases.map((c) => {
    return {
      name: c.topic.name,
      info: c.info,
      id: c.topic.documentId,
    };
  });

  const defendant_topic = defendant_cases.map((c) => {
    switch (c.info) {
      case "Dikabulkan Total":
        return {
          name: c.topic.name,
          id: c.topic.documentId,
          info: "Ditolak",
        };
      case "Ditolak":
        return {
          name: c.topic.name,
          id: c.topic.documentId,
          info: "Dikabulkan Total",
        };
      default:
        return {
          name: c.topic.name,
          id: c.topic.documentId,
          info: c.info,
        };
    }
  });
  const transformed = transformData([...plaintiff_topic, ...defendant_topic]);

  return (
    <Card className="" title="Daftar Topik">
      <Table
        rowKey={"id"}
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
        columns={TableTopicColumns()}
      />
    </Card>
  );
}
