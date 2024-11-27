import { SearchOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { InputRef, TableColumnsType } from "antd";
import { useRef, useState } from "react";
import { renderFilterDropdown } from "../../../components/table/dropdown-filter";
import TableHead from "../../../components/table/table-head";
import { LawyerListCaseProps } from "../../../type/lawyer";
import { cn } from "../../../utils/tw";
import { useSuspenseQueries } from "@tanstack/react-query";
import { getTopics } from "../../../queries/topic";
import { Topics } from "../../../type/topic";
import { getLocations } from "../../../queries/location";
import { Locations } from "../../../type/location";

export default function LawyerListCaseColumns() {
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

  const columns: TableColumnsType<LawyerListCaseProps> = [
    {
      title: () => <TableHead title="Judul" />,
      dataIndex: "title",
      key: "title",
      align: "left",
      fixed: "left",
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
      render: (val) => (
        <div
          className="line-clamp-3 font-work text-sm font-medium text-brand-blue-100"
          // to="/lawyer/$tab"
          // params={{ tab: "analysis" }}
          // search={{ id: rec.documentId }}
        >
          {val}
        </div>
      ),
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
        const recordValue = record["client_name"];
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
          to="/general/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.client_documentId }}
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
      onFilter: (value, record) => record.role.startsWith(value as string),
      filters: [
        {
          text: "Penggugat",
          value: "Penggugat",
        },
        {
          text: "Tergugat",
          value: "Tergugat",
        },
      ],
    },
    {
      title: () => <TableHead title="Advokat Lawan" noWrapTitle />,
      dataIndex: "lawyer_enemy",
      key: "lawyer_enemy",
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
        const recordValue = record["lawyer_enemy"];
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
          search={{ id: rec.lawyer_enemy_documentId }}
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
          text: "Ditolak",
          value: "Ditolak",
        },
        {
          text: "Dikabulkan Sebagian",
          value: "Dikabulkan Sebagian",
        },
        {
          text: "Dikabulkan Total",
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
            <span className="w-min text-left leading-5">{val}</span>
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
    {
      title: () => <TableHead title="Hakim" noWrapTitle />,
      dataIndex: "judge",
      key: "judge",
      align: "left",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) =>
        renderFilterDropdown(
          "Search judge name",
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
        const recordValue = record["judge"];
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
          to="/judge/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.judge_documentId }}
        >
          {val}
        </Link>
      ),
    },
  ];
  return columns;
}
