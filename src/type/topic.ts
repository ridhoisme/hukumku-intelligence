import { Case } from "./case";
import { ResultMeta } from "./type";

export type Topic = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Topics = {
  data: Topic[];
  meta: ResultMeta;
};

export type TopicsCases = {
  data: (Topic & {
    cases: (Case & { topic: Topic; location: Location })[];
  })[];
  meta: ResultMeta;
};
