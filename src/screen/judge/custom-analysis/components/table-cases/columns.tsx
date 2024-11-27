import { Link } from "@tanstack/react-router";
import { TableColumnsType } from "antd";
import TableHead from "../../../../../components/table/table-head";
import { JudgeListCaseProps } from "../../../../../type/judge";

export default function TableCasesColumns() {
  const infoFilter = [
    {
      key: "Dikabulkan Sebagian",
      color: "--color-partially",
    },
    {
      key: "Dikabulkan Total",
      color: "--color-granted",
    },
    {
      key: "Ditolak",
      color: "--color-rejected",
    },
  ];

  const columns: TableColumnsType<JudgeListCaseProps> = [
    {
      title: () => (
        <TableHead className="w-[200px]" noWrapTitle title="Judul" />
      ),
      dataIndex: "title",
      key: "title",
      filterSearch: true,
      filterMode: "menu",
      ellipsis: true,
      fixed: "left",
      render: (val) => (
        <div
          className="font-work text-sm font-medium text-brand-blue-100"
          // to="/general/$tab"
          // params={{ tab: "analysis" }}
          // search={{ id: rec.documentId }}
        >
          {val}
        </div>
      ),
    },
    {
      title: () => (
        <TableHead noWrapTitle className="w-[150px]" title="Nama Pihak" />
      ),
      dataIndex: "client",
      key: "client",
      render: (_, rec) => (
        <div className="space-y-4 font-work text-sm">
          <div className="flex flex-col">
            <span className="">Penggugat :</span>
            <Link
              to="/general/$tab"
              params={{ tab: "analysis" }}
              search={{ id: rec.plaintiff_documentId }}
              className="font-medium text-brand-blue-100"
            >
              {rec.plaintiff}
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="">Tergugat :</span>
            <Link
              to="/general/$tab"
              params={{ tab: "analysis" }}
              search={{ id: rec.defendant_documentId }}
              className="font-medium text-brand-blue-100"
            >
              {rec.defendant}
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: () => (
        <TableHead noWrapTitle className="w-[150px]" title="Topik" />
      ),
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: () => (
        <TableHead noWrapTitle className="w-[150px]" title="Advokat Tergugat" />
      ),
      dataIndex: "defendant_lawyer",
      key: "defendant_lawyer",
      render: (val, rec) => (
        <Link
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.defendant_lawyer_documentId }}
          className="font-medium text-brand-blue-100"
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => (
        <TableHead
          noWrapTitle
          className="w-[150px]"
          title="Advokat Penggugat"
        />
      ),
      dataIndex: "plaintiff_lawyer",
      key: "plaintiff_lawyer",
      render: (val, rec) => (
        <Link
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.plaintiff_lawyer_documentId }}
          className="font-medium text-brand-blue-100"
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => (
        <TableHead noWrapTitle className="w-[150px]" title="Lokasi" />
      ),
      dataIndex: "location",
      key: "location",
    },
    {
      title: () => (
        <TableHead noWrapTitle className="w-[150px]" title="Keterangan" />
      ),
      dataIndex: "info",
      key: "info",
      onFilter: (value, record) => record.info.startsWith(value as string),
      filters: infoFilter.map((t) => ({ value: t.key, text: t.key })),
      render: (val) => {
        const bg = infoFilter.find((v) => v.key === val);

        return (
          <div className="flex items-center gap-2">
            <div>
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: `var(${bg?.color})` }}
              ></div>
            </div>
            <span>{val}</span>
          </div>
        );
      },
    },
    {
      title: () => (
        <TableHead noWrapTitle className="w-[150px]" title="Index Point" />
      ),
      dataIndex: "index",
      key: "index",
      render: () => "-",
    },
  ];
  return columns;
}
