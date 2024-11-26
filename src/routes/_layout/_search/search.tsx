import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import SearchScreen from "../../../screen/search";
import { TOPIC } from "../../../consts";
import Loading from "../../../screen/loading";

const searchSchema = z.object({
  about: z.string().optional(),
  category: z.enum(TOPIC).optional(),
  topic: z.array(z.string()).optional(),
  location: z.string().optional(),
  list: z.boolean().default(false).optional(),
  index: z.number().optional(),
});

export const Route = createFileRoute("/_layout/_search/search")({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchScreen,
  wrapInSuspense: true,
  pendingComponent: () => <Loading />,
});
