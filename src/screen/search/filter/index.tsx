import { useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import EmptyData from "../components/empty-data";
import FilterCard from "../components/filter-card";
import SearchInput from "../components/search-input";
import FilterLawyer from "./filter-lawyer";

export default function Filter() {
  const searchParams = useSearch({ from: "/_layout/_search/search" });

  const render = useCallback(() => {
    switch (searchParams.category) {
      case "Advokat":
        return <FilterLawyer />;
      case "Hakim":
        return <div>test</div>;
      case "Lokasi":
        return <div>test</div>;
      case "Topik":
        return <div>test</div>;
      case "Umum":
        return <div>test</div>;
      default:
        <EmptyData />;
    }
  }, [searchParams.category]);

  return (
    <div className="flex w-full items-center justify-center bg-brand-grey-300 px-[50px] py-16">
      <div className="flex w-full max-w-brand-lg gap-6 font-work">
        <FilterCard />
        <div className="flex flex-1 flex-col space-y-6">
          <SearchInput defaultValue={searchParams.about} />
          {render()}
        </div>
      </div>
    </div>
  );
}
