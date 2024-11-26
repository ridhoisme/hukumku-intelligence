import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import fetchInterceptor from "../../../config/axios";
import { GeneralAnalysis } from "../../../type/general";
import CardIndexPoint from "./components/card-index-point";
import CardPerdata from "./components/card-perdata";
import CardPidana from "./components/card-pidana";
import CardTopCategory from "./components/card-top-category";
import CardTotalCase from "./components/card-total-case";
import TableListLawyer from "./components/table-lawyer";
import CardDecision from "./components/card-decision";
import TableListJudge from "./components/table-judge";
import TableListTopic from "./components/table-topic";
import TableListLocation from "./components/table-location";

export default function Analysis() {
  const searchParams = useSearch({ from: "/_layout/general/$tab" });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_GENERAL_ANALYSIS", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<GeneralAnalysis>(
        `/analysis-general/${searchParams.id}`,
      ),
  });

  const {
    case_granted,
    case_partialy,
    case_rejected,
    top_lawyer,
    top_location,
    top_topic,
    top_judge,
    total_case,
    civil_case,
    criminal_case,
  } = data.data.data;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="grid h-[123px] w-full max-w-brand-lg grid-cols-4 gap-6">
        <CardPerdata total={civil_case} />
        <CardPidana total={criminal_case} />
        <CardTotalCase total={total_case} />
        <CardIndexPoint />
      </div>
      <div className="grid h-[296px] w-full max-w-brand-lg grid-cols-2 gap-6">
        <CardDecision
          granted={case_granted}
          partially={case_partialy}
          rejected={case_rejected}
        />
        <CardTopCategory
          judge={top_judge}
          lawyer={top_lawyer}
          location={top_location}
          topic={top_topic}
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
        <TableListLocation />
      </div>
    </div>
  );
}
