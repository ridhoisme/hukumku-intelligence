import { Pagination } from "antd";
import CardSearch from "./components/card-search";
import FilterCard from "./components/filter-card";
import SearchInput from "./components/search-input";
import EmptyData from "./components/empty-data";

export default function Filter() {
  const isEmpty = true;

  return (
    <div className="flex w-full items-center justify-center bg-brand-grey-300 px-[50px] py-16">
      <div className="flex w-full max-w-brand-lg gap-6 font-work">
        <FilterCard />
        <div className="flex flex-1 flex-col space-y-6">
          <SearchInput />
          {isEmpty ? (
            <EmptyData />
          ) : (
            <>
              <span className="font-work text-sm text-brand-black">
                Menampilkan 10.000 hasil
              </span>
              <div className="grid w-full flex-1 grid-cols-3 grid-rows-3 gap-[18px]">
                <CardSearch />
                <CardSearch />
                <CardSearch />
                <CardSearch />
                <CardSearch />
                <CardSearch />
                <CardSearch />
                <CardSearch />
                <CardSearch />
              </div>
              <Pagination
                showSizeChanger={false}
                align="center"
                defaultCurrent={1}
                total={180}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
