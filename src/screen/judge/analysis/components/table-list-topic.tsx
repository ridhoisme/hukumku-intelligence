import { Table, TableColumnsType } from "antd";
import TableHead from "../../../../components/table/table-head";
import { Card } from "../../../../components/ui/card";
import useColumnSearch from "../../../../hooks/useColumnSearch";

type Topic = {
  id: string;
  name: string;
  full_granted: number;
  partially_granted: number;
  rejected: number;
  total_case: number;
};

export default function TableListTopic() {
  const data: Topic[] = [
    {
      id: "1",
      full_granted: 50,
      rejected: 50,
      partially_granted: 200,
      total_case: 300,
      name: "Perceraian",
    },
    {
      id: "2",
      full_granted: 500,
      rejected: 100,
      partially_granted: 100,
      total_case: 700,
      name: "Perceraian",
    },
  ];

  const columns: TableColumnsType<Topic> = [
    {
      title: () => <TableHead title="Nama Topik" />,
      dataIndex: "name",
      key: "name",
      width: 287,
      filterSearch: true,
      filterMode: "menu",
      ellipsis: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      ...useColumnSearch({ dataIndex: "name", href: "#" }),
    },
    {
      title: () => <TableHead title="Mengabulkan Total" bgDot="bg-granted" />,
      dataIndex: "full_granted",
      key: "full_granted",
      showSorterTooltip: false,
      sorter: (a, b) => a.full_granted - b.full_granted,
      render: (val, rec) => `${((val / rec.total_case) * 100).toFixed()}%`,
      width: 161,
      align: "center",
    },
    {
      title: () => <TableHead title="Ditolak" bgDot="bg-rejected" />,
      dataIndex: "rejected",
      key: "rejected",
      showSorterTooltip: false,
      sorter: (a, b) => a.rejected - b.rejected,
      render: (val, rec) => `${((val / rec.total_case) * 100).toFixed()}%`,
      width: 161,
      align: "center",
    },
    {
      title: () => (
        <TableHead title="Mengabulkan Sebagian" bgDot="bg-partially" />
      ),
      dataIndex: "partially_granted",
      key: "partially_granted",
      showSorterTooltip: false,
      sorter: (a, b) => a.partially_granted - b.partially_granted,
      render: (val, rec) => `${((val / rec.total_case) * 100).toFixed()}%`,
      width: 161,
      align: "center",
    },
    {
      title: () => <TableHead title="Total Kasus" noWrapTitle />,
      dataIndex: "total_case",
      key: "total_case",
      showSorterTooltip: false,
      sorter: (a, b) => a.partially_granted - b.partially_granted,
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
              width: `${((rec.full_granted / rec.total_case) * 100).toFixed()}%`,
            }}
          />
          <div
            className={`h-full bg-rejected`}
            style={{
              width: `${((rec.rejected / rec.total_case) * 100).toFixed()}%`,
            }}
          />
          <div
            className={`h-full bg-partially`}
            style={{
              width: `${((rec.partially_granted / rec.total_case) * 100).toFixed()}%`,
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Card className="" title="Daftar Topik">
      <Table<Topic>
        pagination={{
          total: 3000,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 5,
          defaultCurrent: 1,
          locale: { items_per_page: "" },
          position: ["bottomCenter"],
          pageSizeOptions: [5, 10, 20, 40, 100],
        }}
        className="m-4 font-work"
        dataSource={data}
        rowKey={"id"}
        columns={columns}
      />
    </Card>
  );
}