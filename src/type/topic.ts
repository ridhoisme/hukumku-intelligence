import { Case } from "./case";
import { ResultMeta } from "./type";

export type TopicProps = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Topics = {
  data: TopicProps[];
  meta: ResultMeta;
};

export type TopicsCases = {
  data: (TopicProps & {
    cases: (Case & { topic: TopicProps; location: Location })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};
