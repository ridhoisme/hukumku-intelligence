import { useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import EmptyData from "../components/empty-data";
import FilterCard from "../components/filter-card";
import SearchInput from "../components/search-input";
import FilterLawyer from "./filter-lawyer";
import FilterJudge from "./filter-judge";
import FilterGeneral from "./filter-general";
import FilterTopic from "./filter-topic";
import FilterLocation from "./filter-location";

export default function Filter() {
  const searchParams = useSearch({ from: "/_layout/_search/search" });

  const render = useCallback(() => {
    switch (searchParams.category) {
      case "Advokat":
        return <FilterLawyer />;
      case "Hakim":
        return <FilterJudge />;
      case "Lokasi":
        return <FilterLocation />;
      case "Topik":
        return <FilterTopic />;
      case "Umum":
        return <FilterGeneral />;
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
