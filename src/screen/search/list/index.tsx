import { useSuspenseQueries } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { TOPIC } from "../../../consts";
import { searchGeneral } from "../../../queries/general";
import { searchJudge } from "../../../queries/judge";
import { searchLawyer } from "../../../queries/lawyer";
import { searchLocation } from "../../../queries/location";
import { searchTopic } from "../../../queries/topic";
import { GeneralsCases } from "../../../type/general";
import { JudgesCases } from "../../../type/judge";
import { LawyersCases } from "../../../type/lawyer";
import { LocationsCases } from "../../../type/location";
import { TopicsCases } from "../../../type/topic";
import { cn } from "../../../utils/tw";
import EmptyData from "../components/empty-data";
import SearchInput from "../components/search-input";
import ListGeneral from "./list-general";
import ListJudge from "./list-judge";
import ListLawyer from "./list-lawyer";
import ListLocation from "./list-location";
import ListTopic from "./list-topic";

export default function List() {
  const searchParams = useSearch({ from: "/_layout/_search/search" });

  const result = useSuspenseQueries({
    queries: [
      searchLawyer<LawyersCases>(searchParams.about ?? ""),
      searchJudge<JudgesCases>(searchParams.about ?? ""),
      searchTopic<TopicsCases>(searchParams.about ?? ""),
      searchGeneral<GeneralsCases>(searchParams.about ?? ""),
      searchLocation<LocationsCases>(searchParams.about ?? ""),
    ],
    combine: (result) => {
      return {
        lawyer: result[0].data.data,
        judge: result[1].data.data,
        topic: result[2].data.data,
        general: result[3].data.data,
        location: result[4].data.data,
      };
    },
  });

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-brand-grey-300 px-[50px] py-16">
      <div className="w-full max-w-brand-lg space-y-6">
        <SearchInput defaultValue={searchParams.about} />
        {result.general.meta.pagination.total === 0 &&
        result.lawyer.meta.pagination.total === 0 &&
        result.judge.meta.pagination.total === 0 &&
        result.location.meta.pagination.total === 0 &&
        result.topic.meta.pagination.total === 0 ? (
          <EmptyData />
        ) : (
          <div className="flex gap-6">
            <div className="h-[225px] w-full max-w-[185px] rounded-[10px] border border-black/10 bg-white py-4">
              <h4 className="pl-3 font-work text-base font-semibold leading-6 text-brand-black">
                Menampilkan Daftar
              </h4>
              <div className="flex flex-col">
                {TOPIC.map((val, i) => (
                  <div
                    key={i}
                    onClick={() => scrollToElement(val.toLocaleLowerCase())}
                    className={cn(
                      "cursor-pointer py-2 pl-3 font-work text-sm",
                      i == 0 && "border-l-[3px] border-brand-green-100",
                    )}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-[46px]">
              <ListLawyer data={result.lawyer} />
              <ListJudge data={result.judge} />
              <ListTopic data={result.topic} />
              <ListGeneral data={result.general} />
              <ListLocation data={result.location} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
