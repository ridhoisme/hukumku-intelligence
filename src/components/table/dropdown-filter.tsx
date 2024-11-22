import { Button, Input, InputRef, Space } from "antd";
import { FilterConfirmProps } from "antd/es/table/interface";

export const renderFilterDropdown = (
  placeholder: string,
  searchInput: React.RefObject<InputRef>,
  selectedKeys: React.Key[],
  setSelectedKeys: (selectedKeys: React.Key[]) => void,
  handleSearch: (selectedKeys: string[], confirm: () => void) => void,
  clearFilters: (() => void) | undefined,
  handleReset: (clearFilters: () => void) => void,
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  confirm: (param?: FilterConfirmProps) => void,
) => {
  return (
    <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={placeholder}
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
            confirm();
            setSearchText(selectedKeys[0] as string);
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  );
};
