import { SearchOutlined } from "@ant-design/icons";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Input } from "antd";

const { Search } = Input;
const routeApi = getRouteApi("/_layout/_search/search");

export default function SearchInput() {
  const navigate = useNavigate({ from: "/search" });
  const search = routeApi.useSearch();

  const handleSearch = (val: string) =>
    navigate({
      to: "/search",
      search: { ...search, about: val === "" ? undefined : val },
    });

  return (
    <Search
      prefix={<SearchOutlined classID="text-[#787872]" />}
      placeholder="Search"
      enterButton={<SearchOutlined className="text-3xl" />}
      onSearch={handleSearch}
    />
  );
}
