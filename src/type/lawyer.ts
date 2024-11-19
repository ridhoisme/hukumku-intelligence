import { Case } from "./case";
import { Location } from "./location";
import { Topic } from "./topic";
import { ResultMeta } from "./type";

export type Lawyer = {
  id: number;
  documentId: string;
  name: string;
  work_place: string;
  is_active: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Lawyers = {
  data: Lawyer[];
  meta: ResultMeta;
};

export type LawyersCases = {
  data: (Lawyer & {
    plaintiff_cases: (Case & { topic: Topic; location: Location })[];
    defendant_cases: (Case & { topic: Topic; location: Location })[];
  })[];
  meta: ResultMeta;
};
