import { Case } from "./case";
import { Location } from "./location";
import { Topic } from "./topic";
import { ResultMeta } from "./type";

export type General = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Generals = {
  data: General[];
  meta: ResultMeta;
};

export type GeneralsCases = {
  data: (General & {
    plaintiff_cases: (Case & { topic: Topic; location: Location })[];
    defendant_cases: (Case & { topic: Topic; location: Location })[];
  })[];
  meta: ResultMeta;
};
