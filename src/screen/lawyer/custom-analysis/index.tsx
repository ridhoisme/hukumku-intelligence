import { useSuspenseQuery } from "@tanstack/react-query";
import CardDiagram from "./components/card-diagram";
import FilterCard from "./components/filter-card";
import TableCases from "./components/table-cases";
import { useSearch } from "@tanstack/react-router";
import { qs } from "../../../utils/qs";
import fetchInterceptor from "../../../config/axios";
import { LawyerListCaseCustom } from "../../../type/lawyer";

export default function CustomAnalysis() {
  const searchParams = useSearch({ from: "/_layout/lawyer/$tab" });

  const queryString = qs({
    location: searchParams.location ?? null,
    judge: searchParams.judge ?? null,
    lawyer_enemy: searchParams.lawyer_enemy ?? null,
    topic: searchParams.topic ?? null,
  });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_LAWYERS_CUSTOM_ANALYSIS", searchParams.id, queryString],
    queryFn: async () =>
      await fetchInterceptor<LawyerListCaseCustom>(
        `/lawyer-list-case-custom/${searchParams.id}${queryString}`,
      ),
  });

  const rejected =
    data.data.data?.filter((val) => val.info === "Ditolak").length ?? 0;
  const granted =
    data.data.data?.filter((val) => val.info === "Dikabulkan Total").length ??
    0;
  const partially =
    data.data.data?.filter((val) => val.info === "Dikabulkan Sebagian")
      .length ?? 0;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="grid w-full max-w-brand-lg grid-cols-12 gap-6">
        <FilterCard />
        <div className="col-span-9 flex w-full flex-col gap-6">
          <CardDiagram
            granted={granted}
            partially={partially}
            rejected={rejected}
          />
          <TableCases data={data.data} />
        </div>
      </div>
    </div>
  );
}
