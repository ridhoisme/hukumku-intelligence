import { SearchOutlined } from "@ant-design/icons";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { InputRef, TableColumnsType } from "antd";
import { useRef, useState } from "react";
import { renderFilterDropdown } from "../../../components/table/dropdown-filter";
import TableHead from "../../../components/table/table-head";
import { getLocations } from "../../../queries/location";
import { getTopics } from "../../../queries/topic";
import { LocationListCaseProps, Locations } from "../../../type/location";
import { Topics } from "../../../type/topic";
import { cn } from "../../../utils/tw";

export default function TopicListCaseColumns() {
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

  const columns: TableColumnsType<LocationListCaseProps> = [
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
      title: () => <TableHead title="Topik" noWrapTitle />,
      dataIndex: "topic",
      key: "topic",
      align: "left",
      filterSearch: true,
      onFilter: (value, record) => record.topic.startsWith(value as string),
      filters: result.topic.map((t) => ({ value: t.name, text: t.name })),
    },
    {
      title: () => <TableHead title="Nama Pihak" noWrapTitle />,
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
      title: () => <TableHead title="Nama Advokat" noWrapTitle />,
      dataIndex: "lawyer_name",
      key: "lawyer_name",
      align: "left",
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
        const searchValue = (value as string).toLowerCase();
        const recordFields = [
          record["plaintiff_lawyer"],
          record["defendant_lawyer"],
        ];
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
            <span className="">Advokat Penggugat :</span>
            <Link
              to="/lawyer/$tab"
              params={{ tab: "analysis" }}
              search={{ id: rec.plaintiff_lawyer_documentId }}
              className="font-medium text-brand-blue-100"
            >
              {rec.plaintiff_lawyer}
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="">Advokat Tergugat :</span>
            <Link
              to="/lawyer/$tab"
              params={{ tab: "analysis" }}
              search={{ id: rec.defendant_lawyer_documentId }}
              className="font-medium text-brand-blue-100"
            >
              {rec.defendant_lawyer}
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: () => <TableHead title="Nama Hakim" noWrapTitle />,
      dataIndex: "judge",
      key: "judge",
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
          to="/lawyer/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.defendant_lawyer_documentId }}
        >
          {val}
        </Link>
      ),
    },
  ];
  return columns;
}
