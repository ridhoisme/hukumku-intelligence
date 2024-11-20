import { Case } from "./case";
import { Location } from "./location";
import { Topic } from "./topic";
import { ResultMeta } from "./type";

export type LawyerProps = {
  id: number;
  documentId: string;
  name: string;
  work_place: string;
  is_active: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Lawyer = {
  data: LawyerProps;
  meta: ResultMeta;
};

export type Lawyers = {
  data: LawyerProps[];
  meta: ResultMeta;
};

export type LawyerCases = {
  data: LawyerProps & {
    plaintiff_cases: (Case & {
      topic?: Topic;
      location?: Location;
      defendant_lawyer: LawyerProps;
    })[];
    defendant_cases: (Case & {
      topic?: Topic;
      location?: Location;
      plaintiff_lawyer: LawyerProps;
    })[];
  };
  meta: ResultMeta;
};

export type LawyersCases = {
  data: (LawyerProps & {
    plaintiff_cases: (Case & { topic: Topic; location: Location })[];
    defendant_cases: (Case & { topic: Topic; location: Location })[];
    top_topic?: string;
    top_location?: string;
  })[];
  meta: ResultMeta;
};

export type LawyerAnalysis = {
  data: {
    top_topic: string;
    top_location: string;
    top_judge: string;
    top_lawyer_enemy: string;
    total_case: number;
    case_rejected: number;
    case_partialy: number;
    case_granted: number;
  };
};
