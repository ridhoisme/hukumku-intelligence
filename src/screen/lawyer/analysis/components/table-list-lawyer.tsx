import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Table, TableColumnsType } from "antd";
import TableHead from "../../../../components/table/table-head";
import { Card } from "../../../../components/ui/card";
import fetchInterceptor from "../../../../config/axios";
import useColumnSearch from "../../../../hooks/useColumnSearch";
import { LawyerCases } from "../../../../type/lawyer";
import { transformDataLawyer } from "../../../../utils/array";
import { qs } from "../../../../utils/qs";

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
    queryKey: ["GET_LAWYERS", searchParams.id, queryString],
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

  const transformed = transformDataLawyer([
    ...plaintiff_lawer,
    ...defendant_lawer,
  ]);

  const columns: TableColumnsType = [
    {
      title: () => <TableHead title=" Nama Advokat" />,
      dataIndex: "lawyer_name",
      key: "lawyer_name",
      width: 287,
      filterSearch: true,
      filterMode: "menu",
      ellipsis: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      render: (val, rec) => (
        <Link
          className="font-work text-sm font-medium text-brand-blue-100"
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.id }}
        >
          {val}
        </Link>
      ),
      ...useColumnSearch({ dataIndex: "name", href: "#" }),
    },
    {
      title: () => <TableHead title="Dikabulkan Total" bgDot="bg-granted" />,
      dataIndex: "granted",
      key: "granted",
      showSorterTooltip: false,
      sorter: (a, b) => a.granted - b.granted,
      render: (val, rec) => `${((val / rec.total_cases) * 100).toFixed()}%`,
      width: 161,
      align: "center",
    },
    {
      title: () => <TableHead title="Ditolak" bgDot="bg-rejected" />,
      dataIndex: "rejected",
      key: "rejected",
      showSorterTooltip: false,
      sorter: (a, b) => a.rejected - b.rejected,
      render: (val, rec) => `${((val / rec.total_cases) * 100).toFixed()}%`,
      width: 161,
      align: "center",
    },
    {
      title: () => (
        <TableHead title="Dikabulkan Sebagian" bgDot="bg-partially" />
      ),
      dataIndex: "partially",
      key: "partially",
      showSorterTooltip: false,
      sorter: (a, b) => a.partially - b.partially,
      render: (val, rec) => `${((val / rec.total_cases) * 100).toFixed()}%`,
      width: 161,
      align: "center",
    },
    {
      title: () => <TableHead title="Total Kasus" noWrapTitle />,
      dataIndex: "total_cases",
      key: "total_cases",
      showSorterTooltip: false,
      sorter: (a, b) => a.total_cases - b.total_cases,
      width: 161,
      align: "center",
    },
    {
      title: null,
      key: "diagram",
      width: 161,
      align: "center",
      render: (_, rec) => (
        <div className="flex h-4 w-full">
          <div
            className={`h-full bg-granted`}
            style={{
              width: `${((rec.granted / rec.total_cases) * 100).toFixed()}%`,
            }}
          />
          <div
            className={`h-full bg-rejected`}
            style={{
              width: `${((rec.rejected / rec.total_cases) * 100).toFixed()}%`,
            }}
          />
          <div
            className={`h-full bg-partially`}
            style={{
              width: `${((rec.partially / rec.total_cases) * 100).toFixed()}%`,
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Card className="" title="Daftar Advokat">
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
        columns={columns}
      />
    </Card>
  );
}
