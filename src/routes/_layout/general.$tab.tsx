import { createFileRoute } from "@tanstack/react-router";
import TopSectionGeneral from "../../screen/general/top-section";
import Analysis from "../../screen/general/analysis";
import { z } from "zod";
import ListCase from "../../screen/general/list-case";
import CustomAnalysis from "../../screen/general/custom-analysis";

const searchSchema = z.object({
  id: z.string(),
  location: z.string().optional(),
  lawyer: z.string().optional(),
  topic: z.string().optional(),
  judge: z.string().optional(),
});

export const Route = createFileRoute("/_layout/general/$tab")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const { tab } = Route.useParams({});

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionGeneral />
      {tab === "analysis" && <Analysis />}
      {tab === "case-list" && <ListCase />}
      {tab === "custom-analysis" && <CustomAnalysis />}
    </div>
  );
}
