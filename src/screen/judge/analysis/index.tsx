import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import fetchInterceptor from "../../../config/axios";
import { JudgeAnalysis } from "../../../type/judge";
import CardTopCategory from "./components/card-top-category";
import TableListLawyer from "./components/table-lawyer";
import TableListLocation from "./components/table-location";
import CardDecision from "../../../components/cards/card-decision";
import CardTotalCase from "../../../components/cards/card-total-case";
import CardIndexPoint from "../../../components/cards/card-index-point";
import TableListTopic from "./components/table-topic";
import TableListClient from "./components/table-general";

export default function Analysis() {
  const searchParams = useSearch({ from: "/_layout/judge/$tab" });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_JUDGE_ANALYSIS", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<JudgeAnalysis>(
        `/analysis-judge/${searchParams.id}`,
      ),
  });

  const {
    case_granted,
    case_partialy,
    case_rejected,
    top_lawyer,
    top_location,
    top_topic,
    total_case,
  } = data.data.data;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="flex h-[296px] w-full max-w-brand-lg gap-6">
        <CardDecision
          granted={case_granted}
          partially={case_partialy}
          rejected={case_rejected}
        />
        <div className="grid h-full w-full max-w-[17.5rem] grid-rows-2 gap-6">
          <CardTotalCase total={total_case} />
          <CardIndexPoint />
        </div>
        <CardTopCategory
          lawyer={top_lawyer}
          location={top_location}
          topic={top_topic}
        />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLawyer />
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
