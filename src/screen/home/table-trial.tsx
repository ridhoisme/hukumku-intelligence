import { Table, TableColumnsType } from "antd";
import TableHead from "../../components/table/table-head";
import { Link } from "@tanstack/react-router";

type Trial = {
  id: string;
  nomor_perkara: string;
  date_register: string;
  topic: string;
  member: {
    penuntut_umum: string[] | null;
    terdakwa: string[] | null;
    penggugat: string[] | null;
    tergugat: string[] | null;
  };
  on_going_proccess: number;
  status: string;
  location: string;
};

export default function TableTrial() {
  const data: Trial[] = [
    {
      id: "1",
      nomor_perkara: "263/Pdt.G/2024/PN Nga",
      date_register: "06 Nov 2024",
      topic: "Perceraian",
      member: {
        penggugat: null,
        tergugat: null,
        penuntut_umum: null,
        terdakwa: null,
      },
      location: "Pengadilan Negeri Jakarta Pusat",
      status: "Sidang pertama",
      on_going_proccess: 1,
    },
    {
      id: "2",
      nomor_perkara: "263/Pdt.G/2024/PN Nga",
      date_register: "06 Nov 2024",
      topic: "Narkotika",
      member: {
        penggugat: null,
        tergugat: null,
        penuntut_umum: [
          "Kadek Cintyadewi Permana,S.H.",
          "Edwin Gama Pradana,S.H.",
        ],
        terdakwa: ["RADITA PUJI MAULANA", "EKA SAPTA FAUZI"],
      },
      location: "Pengadilan Negeri Jakarta Pusat",
      status: "Sidang pertama",
      on_going_proccess: 1,
    },
    {
      id: "3",
      nomor_perkara: "263/Pdt.G/2024/PN Nga",
      date_register: "06 Nov 2024",
      topic: "Perceraian",
      member: {
        penggugat: null,
        tergugat: null,
        penuntut_umum: null,
        terdakwa: null,
      },
      location: "Pengadilan Negeri Jakarta Pusat",
      status: "Sidang pertama",
      on_going_proccess: 1,
    },
    {
      id: "4",
      nomor_perkara: "263/Pdt.G/2024/PN Nga",
      date_register: "06 Nov 2024",
      topic: "Perceraian",
      member: {
        penggugat: null,
        tergugat: null,
        penuntut_umum: null,
        terdakwa: null,
      },
      location: "Pengadilan Negeri Jakarta Pusat",
      status: "Minutasi",
      on_going_proccess: 4,
    },
    {
      id: "5",
      nomor_perkara: "263/Pdt.G/2024/PN Nga",
      date_register: "06 Nov 2024",
      topic: "Perceraian",
      member: {
        penggugat: null,
        tergugat: null,
        penuntut_umum: null,
        terdakwa: null,
      },
      location: "Pengadilan Negeri Jakarta Pusat",
      status: "Sidang pertama",
      on_going_proccess: 1,
    },
  ];

  const columns: TableColumnsType<Trial> = [
    {
      title: () => <TableHead title="Nomor Perkara" />,
      dataIndex: "nomor_perkara",
      key: "nomor_perkara",
      width: 180,
      ellipsis: true,
      render: (val) => (
        <Link
          className="font-work text-sm font-medium text-brand-blue-100 hover:text-brand-blue-100/80"
          to="/"
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => <TableHead title="Tanggal Register" noWrapTitle />,
      dataIndex: "date_register",
      key: "date_register",
      width: 140,
      align: "left",
    },
    {
      title: () => <TableHead title="Topik Perkara" noWrapTitle />,
      dataIndex: "topic",
      key: "topic",
      width: 140,
      align: "left",
    },
    {
      title: () => <TableHead title="Para Pihak" noWrapTitle />,
      dataIndex: "member",
      key: "member",
      width: 152,
      align: "left",
      render: (_, rec) => {
        const { penggugat, penuntut_umum, terdakwa, tergugat } = rec.member;

        return (
          <div className="flex flex-col gap-2">
            {penuntut_umum && terdakwa && (
              <>
                <div className="font-work text-xs text-brand-black">
                  <span>Penuntut Umum:</span>
                  <div>
                    {penuntut_umum.map((val, i) => (
                      <span key={i}>
                        <Link
                          href="#"
                          className="text-brand-blue-100 hover:text-brand-blue-100/80"
                        >
                          {i + 1}. {val}
                        </Link>
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-work text-xs text-brand-black">
                  <span>Terdakwa:</span>
                  <div>
                    {terdakwa.map((val, i) => (
                      <span key={i}>
                        <Link
                          href="#"
                          className="text-brand-blue-100 hover:text-brand-blue-100/80"
                        >
                          {i + 1}. {val}
                        </Link>
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            {!penggugat && !tergugat && !penuntut_umum && (
              <>
                <div className="font-work text-xs text-brand-black">
                  <span>Penggugat:</span>
                  <br />
                  <span className="font-medium">Disamarkan</span>
                </div>
                <div className="font-work text-xs text-brand-black">
                  <span>Tergugat:</span>
                  <br />
                  <span className="font-medium">Disamarkan</span>
                </div>
              </>
            )}
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
    },
    {
      title: () => <TableHead title="Lama Proses" noWrapTitle />,
      dataIndex: "on_going_proccess",
      key: "on_going_proccess",
      width: 117,
      align: "left",
      render: (val) => `${val} Hari`,
    },
    {
      title: () => <TableHead title="Lokasi Pengadilan" noWrapTitle />,
      dataIndex: "location",
      key: "location",
      width: 146,
      align: "left",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-[100px]">
      <section className="h-full w-full max-w-brand-lg space-y-6">
        <h1 className="font-work text-[2rem] font-semibold text-brand-black">
          Pengadilan Sidang Berjalan
        </h1>
        <div className="w-full rounded-md bg-white py-1">
          <Table<Trial>
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
            bordered={false}
            className="m-4 font-work"
            dataSource={data}
            columns={columns}
            rowKey={"id"}
            key={"id"}
          />
        </div>
      </section>
    </div>
  );
}
