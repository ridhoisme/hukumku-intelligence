import { Case } from "./case";
import { LocationProps } from "./location";
import { TopicProps } from "./topic";
import { ResultMeta } from "./type";

export type GeneralProps = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Generals = {
  data: GeneralProps[];
  meta: ResultMeta;
};

export type GeneralsCases = {
  data: (GeneralProps & {
    plaintiff_cases: (Case & { topic: TopicProps; location: LocationProps })[];
    defendant_cases: (Case & { topic: TopicProps; location: LocationProps })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};
