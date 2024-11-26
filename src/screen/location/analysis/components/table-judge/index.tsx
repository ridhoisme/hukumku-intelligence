import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import fetchInterceptor from "../../../../../config/axios";
import { TopicCases } from "../../../../../type/topic";
import { transformData } from "../../../../../utils/array";
import { qs } from "../../../../../utils/qs";
import TableJudgeColumns from "./columns";

export default function TableListJudge() {
  const searchParams = useSearch({ from: "/_layout/location/$tab" });
  const queryString = qs({
    populate: {
      cases: {
        fields: ["title", "info"],
        populate: {
          judge: {
            fields: ["name"],
          },
        },
      },
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_TOPIC_JUDGE", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<TopicCases>(
        `/locations/${searchParams.id}${queryString}`,
      ),
  });

  const judge = data.data.data.cases.map((c) => {
    return {
      name: c.judge.name,
      info: c.info,
      id: c.judge.documentId,
    };
  });

  const transformed = transformData(judge);

  return (
    <Card className="" title="Daftar Hakim">
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
        columns={TableJudgeColumns()}
      />
    </Card>
  );
}
