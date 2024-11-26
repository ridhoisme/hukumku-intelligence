import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import { useSearch } from "@tanstack/react-router";
import { qs } from "../../../../../utils/qs";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchInterceptor from "../../../../../config/axios";
import { JudgeCases } from "../../../../../type/judge";
import { transformData } from "../../../../../utils/array";
import TableTopicColumns from "./columns";

export default function TableListTopic() {
  const searchParams = useSearch({ from: "/_layout/judge/$tab" });
  const queryString = qs({
    populate: {
      cases: {
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
    queryKey: ["GET_JUDGE_TOPICS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<JudgeCases>(
        `/judges/${searchParams.id}${queryString}`,
      ),
  });

  const topic = data.data.data.cases.map((c) => {
    return {
      name: c.topic.name,
      info: c.info,
      id: c.topic.documentId,
    };
  });

  const transformed = transformData(topic);
  return (
    <Card className="" title="Daftar Topik">
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
        columns={TableTopicColumns()}
      />
    </Card>
  );
}
