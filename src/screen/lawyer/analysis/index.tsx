import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import fetchInterceptor from "../../../config/axios";
import { LawyerAnalysis } from "../../../type/lawyer";
import CardDecision from "./components/card-decision";
import CardIndexPoint from "./components/card-index-point";
import CardTopCategory from "./components/card-top-category";
import CardTotalCase from "./components/card-total-case";
import TableListClient from "./components/table-general";
import TableListJudge from "./components/table-judge";
import TableListLawyer from "./components/table-lawyer";
import TableListLocation from "./components/table-location";
import TableListTopic from "./components/table-topic";

export default function Analysis() {
  const searchParams = useSearch({ from: "/_layout/lawyer/$tab" });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_LAWYERS_ANALYSIS", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<LawyerAnalysis>(
        `/analysis-lawyer/${searchParams.id}`,
      ),
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="flex h-[296px] w-full max-w-brand-lg gap-6">
        <CardDecision
          granted={data.data.data.case_granted}
          rejected={data.data.data.case_rejected}
          partially={data.data.data.case_partialy}
        />
        <div className="grid h-full w-full max-w-[17.5rem] grid-rows-2 gap-6">
          <CardTotalCase total={data.data.data.total_case} />
          <CardIndexPoint />
        </div>
        <CardTopCategory
          judge={data.data.data.top_judge}
          lawyer={data.data.data.top_lawyer_enemy}
          location={data.data.data.top_location}
          topic={data.data.data.top_topic}
        />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLawyer />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListJudge />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListTopic />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListClient />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLocation />
      </div>
    </div>
  );
}
