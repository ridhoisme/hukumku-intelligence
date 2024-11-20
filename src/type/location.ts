import { Case } from "./case";
import { Topic } from "./topic";
import { ResultMeta } from "./type";

export type Location = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Locations = {
  data: Location[];
  meta: ResultMeta;
};

export type LocationsCases = {
  data: (Location & {
    cases: (Case & { topic: Topic; location: Location })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};
