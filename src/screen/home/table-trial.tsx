import { useSuspenseQuery } from "@tanstack/react-query";
import { Table, TableColumnsType } from "antd";
import TableHead from "../../components/table/table-head";
import fetchInterceptor from "../../config/axios";
import { OngoingCaseProps, OngoingCases } from "../../type/case";
import { daysToToday, formatDateToShort } from "../../utils/date";

export default function TableTrial() {
  const { data: dataCase, isLoading } = useSuspenseQuery({
    queryKey: ["GET_GENERAL"],
    queryFn: async () => await fetchInterceptor<OngoingCases>(`/ongoing-cases`),
  });

  const columns: TableColumnsType<OngoingCaseProps> = [
    {
      title: () => <TableHead title="Nomor Perkara" />,
      dataIndex: "title",
      key: "title",
      width: 180,
      ellipsis: true,
      render: (val) => (
        <div className="font-work text-sm font-medium text-brand-blue-100 hover:text-brand-blue-100/80">
          {val}
        </div>
      ),
    },
    {
      title: () => <TableHead title="Tanggal Register" noWrapTitle />,
      dataIndex: "register_date",
      key: "start_date",
      width: 140,
      align: "left",
      render: (val) => formatDateToShort(val),
    },
    {
      title: () => <TableHead title="Topik Perkara" noWrapTitle />,
      dataIndex: "topic",
      key: "topic",
      width: 140,
      align: "left",
      render: (_, rec) => rec.topic,
    },
    {
      title: () => <TableHead title="Para Pihak" noWrapTitle />,
      dataIndex: "member",
      key: "member",
      width: 152,
      align: "left",
      render: (_, rec) => {
        const { plaintiff } = rec;

        return (
          <div className="flex flex-col gap-2">
            {
              <>
                <div className="font-work text-xs text-brand-black">
                  <span>Pelanggar:</span>
                  <br />
                  <span className="font-medium">{plaintiff}</span>
                </div>
              </>
            }
          </div>
        );
      },
    },
    {
      title: () => <TableHead title="Status Perkara" noWrapTitle />,
      dataIndex: "status",
      key: "status",
      width: 117,
      align: "left",
      render: () => "Sidang pertama",
    },
    {
      title: () => <TableHead title="Lama Proses" noWrapTitle />,
      dataIndex: "on_going_proccess",
      key: "on_going_proccess",
      width: 117,
      align: "left",
      render: (_, rec) => `${daysToToday(rec.register_date)} Hari`,
    },
    {
      title: () => <TableHead title="Lokasi Pengadilan" noWrapTitle />,
      dataIndex: "location",
      key: "location",
      width: 146,
      align: "left",
      render: (_, rec) => rec.location,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-[100px]">
      <section className="h-full w-full max-w-brand-lg space-y-6">
        <h1 className="font-work text-[2rem] font-semibold text-brand-black">
          Pengadilan Sidang Berjalan
        </h1>
        <div className="w-full rounded-md bg-white py-1">
          <Table
            pagination={{
              total: dataCase.data.meta.pagination.total,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 5,
              defaultCurrent: 1,
              locale: { items_per_page: "" },
              position: ["bottomCenter"],
              pageSizeOptions: [5, 10, 20, 40, 100],
              showSizeChanger: true,
            }}
            bordered={false}
            className="m-4 font-work"
            dataSource={dataCase.data.data}
            columns={columns}
            rowKey={"id"}
            key={"id"}
            loading={isLoading}
          />
        </div>
      </section>
    </div>
  );
}
