import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import TableLocationColumns from "./columns";
import { useSearch } from "@tanstack/react-router";
import { qs } from "../../../../../utils/qs";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchInterceptor from "../../../../../config/axios";
import { LawyerCases } from "../../../../../type/lawyer";
import { transformData } from "../../../../../utils/array";

export default function TableListLocation() {
  const searchParams = useSearch({ from: "/_layout/lawyer/$tab" });
  const queryString = qs({
    populate: {
      defendant_cases: {
        fields: ["title", "info"],
        populate: {
          location: {
            fields: ["name"],
          },
        },
      },
      plaintiff_cases: {
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
    queryKey: ["GET_LAWYERS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<LawyerCases>(
        `/lawyers/${searchParams.id}${queryString}`,
      ),
  });

  const plaintiff_cases = data.data.data.plaintiff_cases;
  const defendant_cases = data.data.data.defendant_cases;

  const plaintiff_location = plaintiff_cases.map((c) => {
    return {
      name: c.location.name,
      info: c.info,
      id: c.location.documentId,
    };
  });

  const defendant_location = defendant_cases.map((c) => {
    switch (c.info) {
      case "Dikabulkan Total":
        return {
          name: c.location.name,
          id: c.location.documentId,
          info: "Ditolak",
        };
      case "Ditolak":
        return {
          name: c.location.name,
          id: c.location.documentId,
          info: "Dikabulkan Total",
        };
      default:
        return {
          name: c.location.name,
          id: c.location.documentId,
          info: c.info,
        };
    }
  });

  const transformed = transformData([
    ...plaintiff_location,
    ...defendant_location,
  ]);

  return (
    <Card className="" title="Daftar Lokasi Pengadilan">
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
        columns={TableLocationColumns()}
      />
    </Card>
  );
}
