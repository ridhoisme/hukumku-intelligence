import { createFileRoute } from "@tanstack/react-router";
import TopSectionLawyer from "../../screen/lawyer/top-section";
import Analysis from "../../screen/lawyer/analysis";
import ListCase from "../../screen/lawyer/list-case";
import { z } from "zod";
import CustomAnalysis from "../../screen/lawyer/custom-analysis";
import Loading from "../../screen/loading";

const searchSchema = z.object({
  id: z.string(),
  location: z.string().optional(),
  lawyer_enemy: z.string().optional(),
  topic: z.string().optional(),
  judge: z.string().optional(),
});

export const Route = createFileRoute("/_layout/lawyer/$tab")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
  wrapInSuspense: true,
  pendingComponent: () => <Loading />,
});

function RouteComponent() {
  const { tab } = Route.useParams({});

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionLawyer />
      {tab === "analysis" && <Analysis />}
      {tab === "case-list" && <ListCase />}
      {tab === "custom-analysis" && <CustomAnalysis />}
    </div>
  );
}
