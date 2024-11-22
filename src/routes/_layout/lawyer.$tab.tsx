import { createFileRoute } from "@tanstack/react-router";
import TopSectionLawyer from "../../screen/lawyer/top-section";
import Analysis from "../../screen/lawyer/analysis";
import ListCase from "../../screen/lawyer/list-case";
import { z } from "zod";
import CustomAnalysis from "../../screen/lawyer/custom-analysis";

const searchSchema = z.object({
  id: z.string(),
});

export const Route = createFileRoute("/_layout/lawyer/$tab")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
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
