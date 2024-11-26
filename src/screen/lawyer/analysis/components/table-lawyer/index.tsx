import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import fetchInterceptor from "../../../../../config/axios";
import { LawyerCases } from "../../../../../type/lawyer";
import { transformData } from "../../../../../utils/array";
import { qs } from "../../../../../utils/qs";
import TableLawyerColumns from "./columns";

export default function TableListLawyer() {
  const searchParams = useSearch({ from: "/_layout/lawyer/$tab" });

  const queryString = qs({
    populate: {
      defendant_cases: {
        fields: ["title", "info"],
        populate: {
          plaintiff_lawyer: {
            fields: ["name"],
          },
        },
      },
      plaintiff_cases: {
        fields: ["title", "info"],
        populate: {
          defendant_lawyer: {
            fields: ["name"],
          },
        },
      },
    },
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_LAWYER_LAWYERS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<LawyerCases>(
        `/lawyers/${searchParams.id}${queryString}`,
      ),
  });

  const plaintiff_cases = data.data.data.plaintiff_cases;
  const defendant_cases = data.data.data.defendant_cases;

  const plaintiff_lawer = plaintiff_cases.map((c) => {
    return {
      name: c.defendant_lawyer.name,
      info: c.info,
      id: c.defendant_lawyer.documentId,
    };
  });

  const defendant_lawer = defendant_cases.map((c) => {
    switch (c.info) {
      case "Dikabulkan Total":
        return {
          name: c.plaintiff_lawyer.name,
          id: c.plaintiff_lawyer.documentId,
          info: "Ditolak",
        };
      case "Ditolak":
        return {
          name: c.plaintiff_lawyer.name,
          id: c.plaintiff_lawyer.documentId,
          info: "Dikabulkan Total",
        };
      default:
        return {
          name: c.plaintiff_lawyer.name,
          id: c.plaintiff_lawyer.documentId,
          info: c.info,
        };
    }
  });

  const transformed = transformData([...plaintiff_lawer, ...defendant_lawer]);

  return (
    <Card title="Daftar Advokat">
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
        columns={TableLawyerColumns()}
      />
    </Card>
  );
}
