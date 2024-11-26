import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import TopSectionLocation from "../../screen/location/top-section";
import Analysis from "../../screen/location/analysis";
import ListCase from "../../screen/location/list-case";

const searchSchema = z.object({
  id: z.string(),
  location: z.string().optional(),
  lawyer_enemy: z.string().optional(),
  topic: z.string().optional(),
  judge: z.string().optional(),
});

export const Route = createFileRoute("/_layout/location/$tab")({
  component: RouteComponent,
  validateSearch: (search) => searchSchema.parse(search),
});

function RouteComponent() {
  const { tab } = Route.useParams({});

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionLocation />
      {tab === "analysis" && <Analysis />} {tab === "case-list" && <ListCase />}
    </div>
  );
}
