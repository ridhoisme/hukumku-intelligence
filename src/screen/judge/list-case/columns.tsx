import { SearchOutlined } from "@ant-design/icons";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { InputRef, TableColumnsType } from "antd";
import { useRef, useState } from "react";
import { renderFilterDropdown } from "../../../components/table/dropdown-filter";
import TableHead from "../../../components/table/table-head";
import { getLocations } from "../../../queries/location";
import { getTopics } from "../../../queries/topic";
import { JudgeListCaseProps } from "../../../type/judge";
import { Locations } from "../../../type/location";
import { Topics } from "../../../type/topic";
import { cn } from "../../../utils/tw";

export default function JudgeListCaseColumns() {
  const [searchText, setSearchText] = useState<string>("");
  const searchInput = useRef<InputRef>(null);
  const result = useSuspenseQueries({
    queries: [getTopics<Topics>(), getLocations<Locations>()],
    combine: (res) => ({
      topic: res[0].data.data.data,
      location: res[1].data.data.data,
    }),
  });

  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const columns: TableColumnsType<JudgeListCaseProps> = [
    {
      title: () => <TableHead title="Judul" />,
      dataIndex: "title",
      key: "title",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) =>
        renderFilterDropdown(
          "Search case title",
          searchInput,
          selectedKeys,
          setSelectedKeys,
          handleSearch,
          clearFilters,
          handleReset,
          searchText,
          setSearchText,
          confirm,
        ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined className={cn(filtered && "text-brand-black")} />
      ),
      onFilter: (value, record) => {
        const recordValue = record["title"];
        if (typeof recordValue === "string") {
          return recordValue
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        return false;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (val, rec) => (
        <Link
          className="line-clamp-3 font-work text-sm font-medium text-brand-blue-100"
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.documentId }}
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => <TableHead title="Topik" noWrapTitle />,
      dataIndex: "topic",
      key: "topic",
      align: "left",
      filterSearch: true,
      onFilter: (value, record) => record.topic.startsWith(value as string),
      filters: result.topic.map((t) => ({ value: t.name, text: t.name })),
    },
    {
      title: () => <TableHead title="Role" noWrapTitle />,
      dataIndex: "role",
      key: "role",
      align: "left",
      filters: [
        {
          text: "Hakim Ketua",
          value: "Hakim Ketua",
        },
      ],
      render: () => "Hakim Ketua",
    },
    {
      title: () => <TableHead title="Nama Klien" noWrapTitle />,
      dataIndex: "client_name",
      key: "client_name",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) =>
        renderFilterDropdown(
          "Search client name",
          searchInput,
          selectedKeys,
          setSelectedKeys,
          handleSearch,
          clearFilters,
          handleReset,
          searchText,
          setSearchText,
          confirm,
        ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined className={cn(filtered && "text-brand-black")} />
      ),
      onFilter: (value, record) => {
        const searchValue = (value as string).toLowerCase();
        const recordFields = [record["plaintiff"], record["defendant"]];
        return recordFields.some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(searchValue),
        );
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
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
      title: () => <TableHead title="Advokat Penggugat" noWrapTitle />,
      dataIndex: "plaintiff_lawyer",
      key: "plaintiff_lawyer",
      align: "left",
      filterSearch: true,
      width: 200,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) =>
        renderFilterDropdown(
          "Search lawyer name",
          searchInput,
          selectedKeys,
          setSelectedKeys,
          handleSearch,
          clearFilters,
          handleReset,
          searchText,
          setSearchText,
          confirm,
        ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined className={cn(filtered && "text-brand-black")} />
      ),
      onFilter: (value, record) => {
        const recordValue = record["plaintiff_lawyer"];
        if (typeof recordValue === "string") {
          return recordValue
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        return false;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (val, rec) => (
        <Link
          className="line-clamp-3 font-work text-sm font-medium text-brand-blue-100"
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.plaintiff_lawyer_documentId }}
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => <TableHead title="Advokat Tergugat" noWrapTitle />,
      dataIndex: "defendant_lawyer",
      key: "defendant_lawyer",
      align: "left",
      filterSearch: true,
      width: 200,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) =>
        renderFilterDropdown(
          "Search lawyer name",
          searchInput,
          selectedKeys,
          setSelectedKeys,
          handleSearch,
          clearFilters,
          handleReset,
          searchText,
          setSearchText,
          confirm,
        ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined className={cn(filtered && "text-brand-black")} />
      ),
      onFilter: (value, record) => {
        const recordValue = record["defendant_lawyer"];
        if (typeof recordValue === "string") {
          return recordValue
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        return false;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (val, rec) => (
        <Link
          className="line-clamp-3 font-work text-sm font-medium text-brand-blue-100"
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.defendant_lawyer_documentId }}
        >
          {val}
        </Link>
      ),
    },
    {
      title: () => <TableHead title="Keterangan" noWrapTitle />,
      dataIndex: "info",
      key: "info",
      align: "left",
      onFilter: (value, record) => record.info.startsWith(value as string),
      filters: [
        {
          text: "Menolak",
          value: "Ditolak",
        },
        {
          text: "Mengabulkan Sebagian",
          value: "Dikabulkan Sebagian",
        },
        {
          text: "Mengabulkan Total",
          value: "Dikabulkan Total",
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
            <span className="w-min text-left leading-5">
              {val
                .replace("Dikabulkan", "Mengabulkan")
                .replace("Ditolak", "Menolak")}
            </span>
          </div>
        );
      },
    },
    {
      title: () => <TableHead title="Index Point" noWrapTitle />,
      dataIndex: "index_point",
      key: "index_point",
      render: () => `-`,
      align: "center",
    },
    {
      title: () => <TableHead title="Lokasi" noWrapTitle />,
      dataIndex: "location",
      key: "location",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) =>
        renderFilterDropdown(
          "Search location",
          searchInput,
          selectedKeys,
          setSelectedKeys,
          handleSearch,
          clearFilters,
          handleReset,
          searchText,
          setSearchText,
          confirm,
        ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined className={cn(filtered && "text-brand-black")} />
      ),
      onFilter: (value, record) => {
        const recordValue = record["location"];
        if (typeof recordValue === "string") {
          return recordValue
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        return false;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (val) => <span className="line-clamp-3">{val}</span>,
    },
  ];
  return columns;
}
