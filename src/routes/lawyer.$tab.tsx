import { createFileRoute } from "@tanstack/react-router";
import Analysis from "../screen/lawyer/analysis";
import TopSectionLawyer from "../screen/lawyer/top-section";

export const Route = createFileRoute("/lawyer/$tab")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tab } = Route.useParams({});

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionLawyer />
      {tab === "analysis" ? <Analysis /> : <>custom analisis</>}
    </div>
  );
}
