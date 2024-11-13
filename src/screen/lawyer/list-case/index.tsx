import { Pagination, Table, TableColumnsType } from "antd";
import TableHead from "../../../components/table/table-head";
import useColumnSearch from "../../../hooks/useColumnSearch";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { cn } from "../../../utils/tw";

type Case = {
  id: string;
  title: string;
  client_name: string;
  topic: string;
  role: string;
  lawyer_enemy: string;
  info: string;
  index_point: number;
  location: string;
  judge: string;
};

export default function ListCase() {
  const data: Case[] = [
    {
      id: "1",
      client_name: "Leo Herwitz",
      title:
        "Lorem ipsum dolor sit amet consectetur. Natoque ornare amet metus mi volutpat id. Viverra diam.",
      topic: "Perceraian",
      role: "Penggugat",
      lawyer_enemy: "Jaylon Mango",
      info: "Dikabulkan sebagian",
      index_point: 90,
      location: "Pengadilan Negeri Jakarta Pusat",
      judge: "Nama Hakim",
    },
    {
      id: "2",
      client_name: "Leo Herwitz",
      title:
        "Lorem ipsum dolor sit amet consectetur. Natoque ornare amet metus mi volutpat id. Viverra diam.",
      topic: "Perceraian",
      role: "Penggugat",
      lawyer_enemy: "Jaylon Mango",
      info: "Dikabulkan total",
      index_point: 50,
      location: "Pengadilan Negeri Jakarta Pusat",
      judge: "Nama Hakim",
    },
    {
      id: "3",
      client_name: "Leo Herwitz",
      title:
        "Lorem ipsum dolor sit amet consectetur. Natoque ornare amet metus mi volutpat id. Viverra diam.",
      topic: "Perceraian",
      role: "Penggugat",
      lawyer_enemy: "Jaylon Mango",
      info: "Ditolak",
      index_point: 30,
      location: "Pengadilan Negeri Jakarta Pusat",
      judge: "Nama Hakim",
    },
  ];

  const columns: TableColumnsType<Case> = [
    {
      title: () => <TableHead title="Judul" />,
      dataIndex: "title",
      key: "title",
      align: "left",
      render: (val) => (
        <Link
          className="line-clamp-2 font-work text-sm font-medium text-brand-blue-100"
          href="#"
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => <TableHead title="Nama Klien" noWrapTitle />,
      dataIndex: "client_name",
      key: "client_name",
      align: "left",
      filterSearch: true,
      onFilter: (value, record) =>
        record.client_name.startsWith(value as string),
      ...useColumnSearch({ dataIndex: "client_name", href: "#" }),
    },
    {
      title: () => <TableHead title="Topik" noWrapTitle />,
      dataIndex: "topic",
      key: "topic",
      align: "left",
      filterSearch: true,
      onFilter: (value, record) => record.topic.startsWith(value as string),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
    {
      title: () => <TableHead title="Role" noWrapTitle />,
      dataIndex: "role",
      key: "role",
      align: "left",
      onFilter: (value, record) => record.role.startsWith(value as string),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
    {
      title: () => <TableHead title="Lawyer Lawan" noWrapTitle />,
      dataIndex: "lawyer_enemy",
      key: "lawyer_enemy",
      align: "left",
      filterSearch: true,
      width: 200,
      onFilter: (value, record) =>
        record.lawyer_enemy.startsWith(value as string),
      ...useColumnSearch({ dataIndex: "lawyer_enemy", href: "#" }),
    },
    {
      title: () => <TableHead title="Keterangan" noWrapTitle />,
      dataIndex: "info",
      key: "info",
      align: "left",
      onFilter: (value, record) => record.info.startsWith(value as string),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      render: (val) => {
        const bg = String(val).toLowerCase().includes("sebagian")
          ? "bg-partially"
          : String(val).toLowerCase().includes("total")
            ? "bg-granted"
            : "bg-rejected";

        return (
          <div className="flex items-center gap-1">
            <div className={cn("aspect-square size-[10px] rounded-full", bg)} />
            <span className="w-min text-left leading-5">{val}</span>
          </div>
        );
      },
    },
    {
      title: () => <TableHead title="Index Point" noWrapTitle />,
      dataIndex: "index_point",
      key: "index_point",
      showSorterTooltip: false,
      sorter: (a, b) => a.index_point - b.index_point,
      render: (val) => `${val}%`,
      align: "left",
    },
    {
      title: () => <TableHead title="Lokasi" noWrapTitle />,
      dataIndex: "location",
      key: "location",
      align: "left",
      filterSearch: true,
      onFilter: (value, record) => record.location.startsWith(value as string),
      ...useColumnSearch({ dataIndex: "location" }),
    },
    {
      title: () => <TableHead title="Hakim" noWrapTitle />,
      dataIndex: "judge",
      key: "judge",
      align: "left",
      filterSearch: true,
      onFilter: (value, record) => record.judge.startsWith(value as string),
      ...useColumnSearch({ dataIndex: "judge", href: "#" }),
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="w-full max-w-brand-lg space-y-6">
        <div className="bg-white p-4">
          <Table<Case>
            columns={columns}
            rowKey={"id"}
            dataSource={data}
            expandable={{
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <UpOutlined onClick={(e) => onExpand(record, e)} />
                ) : (
                  <DownOutlined onClick={(e) => onExpand(record, e)} />
                ),
              expandedRowRender: () => (
                <div className="grid grid-cols-3 pl-12">
                  <div className="space-y-4">
                    <div className="text flex flex-col font-work">
                      <span className="text-sm text-brand-grey-200">
                        Nomor Kasus
                      </span>
                      <span className="text-base font-medium text-brand-black">
                        N0001
                      </span>
                    </div>
                    <div className="text flex flex-col font-work">
                      <span className="text-sm text-brand-grey-200">
                        Jenis Hukuman
                      </span>
                      <span className="text-base font-medium text-brand-black">
                        Pidana
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text flex flex-col font-work">
                      <span className="text-sm text-brand-grey-200">
                        Tanggal Mulai
                      </span>
                      <span className="text-base font-medium text-brand-black">
                        10/10/2024
                      </span>
                    </div>
                    <div className="text flex flex-col font-work">
                      <span className="text-sm text-brand-grey-200">
                        Putusan Awal
                      </span>
                      <span className="text-base font-medium text-brand-black">
                        20 Tahun Penjara
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text flex flex-col font-work">
                      <span className="text-sm text-brand-grey-200">
                        Tanggal Selesai
                      </span>
                      <span className="text-base font-medium text-brand-black">
                        10/10/2024
                      </span>
                    </div>
                    <div className="text flex flex-col font-work">
                      <span className="text-sm text-brand-grey-200">
                        Putusan Akhir
                      </span>
                      <span className="text-base font-medium text-brand-black">
                        20 Tahun Penjara
                      </span>
                    </div>
                  </div>
                </div>
              ),
            }}
            pagination={false}
          />
        </div>
        <Pagination
          total={600}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          defaultPageSize={5}
          defaultCurrent={1}
          locale={{ items_per_page: "" }}
          align="center"
          pageSizeOptions={[5, 10, 20, 40, 100]}
        />
      </div>
    </div>
  );
}
