import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import fetchInterceptor from "../../../../../config/axios";
import { JudgeCases } from "../../../../../type/judge";
import { qs } from "../../../../../utils/qs";
import TableLawyerColumns from "./columns";
import { transformData } from "../../../../../utils/array";

export default function TableListLawyer() {
  const searchParams = useSearch({ from: "/_layout/judge/$tab" });

  const queryString = qs({
    populate: {
      cases: {
        fields: ["title", "info"],
        populate: {
          plaintiff_lawyer: {
            fields: ["name"],
          },
          defendant_lawyer: {
            fields: ["name"],
          },
        },
      },
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_JUDGE_LAWYERS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<JudgeCases>(
        `/judges/${searchParams.id}${queryString}`,
      ),
  });

  const plaintiff_lawer = data.data.data.cases.map((c) => {
    return {
      name: c.plaintiff_lawyer.name,
      info: c.info,
      id: c.plaintiff_lawyer.documentId,
    };
  });

  const defendant_lawer = data.data.data.cases.map((c) => {
    switch (c.info) {
      case "Dikabulkan Total":
        return {
          name: c.defendant_lawyer.name,
          id: c.defendant_lawyer.documentId,
          info: "Ditolak",
        };
      case "Ditolak":
        return {
          name: c.defendant_lawyer.name,
          id: c.defendant_lawyer.documentId,
          info: "Dikabulkan Total",
        };
      default:
        return {
          name: c.defendant_lawyer.name,
          id: c.defendant_lawyer.documentId,
          info: c.info,
        };
    }
  });

  const transformed = transformData([...plaintiff_lawer, ...defendant_lawer]);

  return (
    <Card title="Daftar Advokat Yang Pernah Berinteraksi">
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
        columns={TableLawyerColumns()}
        rowKey={"id"}
      />
    </Card>
  );
}
