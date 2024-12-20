import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, TableColumnType } from "antd";
import { useRef, useState } from "react";
import { cn } from "../utils/tw";

interface ColumnSearchProps<T> {
  dataIndex: keyof T;
}

export const useColumnSearch2 = <T extends object>({
  dataIndex,
}: ColumnSearchProps<T>): {
  columnProps: Omit<TableColumnType<T>, "render">;
  searchText: string;
  searchedColumn: keyof T | string;
} => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<keyof T | string>("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: keyof T,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  return {
    columnProps: {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${String(dataIndex)}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
                setSearchedColumn(dataIndex);
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
        const recordValue = record[dataIndex];
        if (recordValue && typeof recordValue === "string") {
          return recordValue
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        if (recordValue != null) {
          return recordValue
            .toString()
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
    },
    searchText,
    searchedColumn,
  };
};
