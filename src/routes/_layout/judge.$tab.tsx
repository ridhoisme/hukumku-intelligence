import { createFileRoute } from "@tanstack/react-router";
import Analysis from "../../screen/judge/analysis";
import TopSectionJudge from "../../screen/judge/top-section";
import { z } from "zod";
import ListCase from "../../screen/judge/list-case";
import CustomAnalysis from "../../screen/judge/custom-analysis";

const searchSchema = z.object({
  id: z.string(),
  location: z.string().optional(),
  lawyer: z.string().optional(),
  topic: z.string().optional(),
  judge: z.string().optional(),
});

export const Route = createFileRoute("/_layout/judge/$tab")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const { tab } = Route.useParams({});

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionJudge />
      {tab === "analysis" && <Analysis />}
      {tab === "case-list" && <ListCase />}
      {tab === "custom-analysis" && <CustomAnalysis />}
    </div>
  );
}
