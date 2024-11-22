import { Case } from "./case";
import { LocationProps } from "./location";
import { TopicProps } from "./topic";
import { ResultMeta } from "./type";

export type JudgeProps = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Judges = {
  data: JudgeProps[];
  meta: ResultMeta;
};

export type JudgesCases = {
  data: (JudgeProps & {
    cases: (Case & { topic: TopicProps; location: LocationProps })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};
