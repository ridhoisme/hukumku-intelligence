import { createFileRoute } from "@tanstack/react-router";
import TopSectionTopic from "../../screen/topic/top-section";
import Analysis from "../../screen/topic/analysis";
import { z } from "zod";
import ListCase from "../../screen/topic/list-case";

const searchSchema = z.object({
  id: z.string(),
  location: z.string().optional(),
  lawyer_enemy: z.string().optional(),
  topic: z.string().optional(),
  judge: z.string().optional(),
});

export const Route = createFileRoute("/_layout/topic/$tab")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const { tab } = Route.useParams({});

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionTopic />
      {tab === "analysis" && <Analysis />} {tab === "case-list" && <ListCase />}
    </div>
  );
}
