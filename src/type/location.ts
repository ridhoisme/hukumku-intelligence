import { Case } from "./case";
import { TopicProps } from "./topic";
import { ResultMeta } from "./type";

export type LocationProps = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Locations = {
  data: LocationProps[];
  meta: ResultMeta;
};

export type LocationsCases = {
  data: (LocationProps & {
    cases: (Case & { topic: TopicProps; location: LocationProps })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};
