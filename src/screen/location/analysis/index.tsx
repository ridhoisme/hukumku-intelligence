import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import CardDecision from "../../../components/cards/card-decision";
import CardIndexPoint from "../../../components/cards/card-index-point";
import CardTotalCase from "../../../components/cards/card-total-case";
import fetchInterceptor from "../../../config/axios";
import { LocationAnalysis } from "../../../type/location";
import CardTopCategory from "./components/card-top-category";
import TableListClient from "./components/table-general";
import TableListJudge from "./components/table-judge";
import TableListLawyer from "./components/table-lawyer";
import TableListTopic from "./components/table-topic";

export default function Analysis() {
  const searchParams = useSearch({ from: "/_layout/location/$tab" });

  const { data } = useSuspenseQuery({
    queryKey: ["GET_LOCATAION_ANALYSIS", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<LocationAnalysis>(
        `/analysis-location/${searchParams.id}`,
      ),
  });

  const {
    case_granted,
    case_partialy,
    case_rejected,
    top_lawyer,
    top_topic,
    top_judge,
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
          <CardTotalCase
            total={total_case}
            growText="Naik Sebesar"
            revertGrowFlow
          />
          <CardIndexPoint />
        </div>
        <CardTopCategory
          judge={top_judge}
          lawyer={top_lawyer}
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
        <TableListClient />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListTopic />
      </div>
    </div>
  );
}
