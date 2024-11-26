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

export type Location = {
  data: LocationProps;
  meta: ResultMeta;
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

export type LocationAnalysis = {
  data: {
    top_judge: string;
    top_topic: string;
    top_lawyer: string;
    total_case: number;
    case_rejected: number;
    case_partialy: number;
    case_granted: number;
  };
};

export type LocationListCaseProps = {
  id: number;
  documentId: string;
  title: string;
  case_number: string;
  defendant: string;
  defendant_id: number;
  defendant_documentId: string;
  plaintiff: string;
  plaintiff_id: number;
  plaintiff_documentId: string;
  topic: string;
  plaintiff_lawyer: string;
  plaintiff_lawyer_id: number;
  plaintiff_lawyer_documentId: string;
  defendant_lawyer: string;
  defendant_lawyer_id: number;
  defendant_lawyer_documentId: string;
  info: string;
  location: string;
  location_id: number;
  location_documentId: string;
  info_second: string;
  start_date: string;
  finish_date: string;
  final_verdict: string;
  type_punishment: string;
  is_done: boolean;
  duration: string;
  register_date: string | null;
  initial_claim: string;
  judge: string;
  judge_id: number;
  judge_documentId: string;
};

export type LocationListCase = {
  data: LocationListCaseProps[];
};
