import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import fetchInterceptor from "../../../../../config/axios";
import { LawyerCases } from "../../../../../type/lawyer";
import { transformData } from "../../../../../utils/array";
import { qs } from "../../../../../utils/qs";
import TableJudgeColumns from "./columns";

export default function TableListJudge() {
  const searchParams = useSearch({ from: "/_layout/lawyer/$tab" });
  const queryString = qs({
    populate: {
      defendant_cases: {
        fields: ["title", "info"],
        populate: {
          judge: {
            fields: ["name"],
          },
        },
      },
      plaintiff_cases: {
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
    queryKey: ["GET_LAWYERS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<LawyerCases>(
        `/lawyers/${searchParams.id}${queryString}`,
      ),
  });

  const plaintiff_cases = data.data.data.plaintiff_cases;
  const defendant_cases = data.data.data.defendant_cases;

  const plaintiff_judge = plaintiff_cases.map((c) => {
    return {
      name: c.judge.name,
      info: c.info,
      id: c.judge.documentId,
    };
  });

  const defendant_judge = defendant_cases.map((c) => {
    switch (c.info) {
      case "Dikabulkan Total":
        return {
          name: c.judge.name,
          id: c.judge.documentId,
          info: "Ditolak",
        };
      case "Ditolak":
        return {
          name: c.judge.name,
          id: c.judge.documentId,
          info: "Dikabulkan Total",
        };
      default:
        return {
          name: c.judge.name,
          id: c.judge.documentId,
          info: c.info,
        };
    }
  });
  const transformed = transformData([...plaintiff_judge, ...defendant_judge]);

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
