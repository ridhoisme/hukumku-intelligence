import { Link } from "@tanstack/react-router";
import { Button, Input, InputRef, Space, TableColumnsType } from "antd";
import TableHead from "../../../../../components/table/table-head";
import { TransformedData } from "../../../../../utils/array";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { cn } from "../../../../../utils/tw";

export default function TableTopicColumns() {
  const [searchText, setSearchText] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const columns: TableColumnsType<TransformedData> = [
    {
      title: () => <TableHead title="Nama Topik" />,
      dataIndex: "name",
      key: "name",
      width: 287,
      filterSearch: true,
      filterMode: "menu",
      ellipsis: true,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder="Search Nama Advokat"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
            className="mb-2 block"
          />
          <Space className="float-end mb-2">
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              type="link"
              className="font-work text-xs text-brand-black hover:!text-inherit disabled:text-brand-black disabled:text-opacity-20"
              disabled={!searchText}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              className="font-work text-xs font-medium text-brand-green-300 hover:!text-inherit disabled:text-brand-green-300 disabled:text-opacity-20"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined className={cn(filtered && "text-brand-black")} />
      ),
      onFilter: (value, record) => {
        const recordValue = record["name"];
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
          className="font-work text-sm font-medium text-brand-blue-100"
          to="/topic/$tab"
          params={{ tab: "analysis" }}
          search={{ id: rec.id }}
        >
          {val}
        </Link>
      ),
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

  return columns;
}
