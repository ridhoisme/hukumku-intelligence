import { Case } from "./case";
import { Location } from "./location";
import { Topic } from "./topic";
import { ResultMeta } from "./type";

export type Judge = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Judges = {
  data: Judge[];
  meta: ResultMeta;
};

export type JudgesCases = {
  data: (Judge & {
    cases: (Case & { topic: Topic; location: Location })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};
