import { Case } from "./case";
import { JudgeProps } from "./judge";
import { LawyerProps } from "./lawyer";
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

export type General = {
  data: GeneralProps;
  meta: ResultMeta;
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
export type GeneralCases = {
  data: GeneralProps & {
    plaintiff_cases: (Case & {
      topic?: TopicProps;
      location?: LocationProps;
      defendant_lawyer?: LawyerProps;
      judge?: JudgeProps;
      defendant?: GeneralProps;
    })[];
    defendant_cases: (Case & {
      topic?: TopicProps;
      location?: LocationProps;
      plaintiff_lawyer?: LawyerProps;
      judge?: JudgeProps;
      plaintiff?: GeneralProps;
    })[];
  };
  meta: ResultMeta;
};

export type GeneralAnalysis = {
  data: {
    top_topic: string;
    top_location: string;
    top_lawyer: string;
    top_judge: string;
    total_case: number;
    case_rejected: number;
    case_partialy: number;
    case_granted: number;
    civil_case: number;
    criminal_case: number;
  };
};

export type GeneralListCaseProps = {
  id: number;
  documentId: string;
  title: string;
  case_number: string;
  client_name: string;
  client_id: number;
  client_documentId: string;
  topic: string;
  role: string;
  lawyer: string;
  lawyer_id: number;
  lawyer_documentId: string;
  info: string;
  location: string;
  location_id: number;
  location_documentId: string;
  judge: string;
  judge_id: number;
  judge_documentId: string;
  info_second: string;
  start_date: string;
  finish_date: string;
  final_verdict: string;
  type_punishment: string;
  is_done: boolean;
  duration: string;
  register_date: string | null;
  initial_claim: string;
};

export type GeneralListCase = {
  data: GeneralListCaseProps[];
};

export type GeneralListCaseCustomProps = {
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
  judge: string;
  judge_id: number;
  judge_documentId: string;
  info_second: string;
  start_date: string;
  finish_date: string;
  final_verdict: string;
  type_punishment: string;
  is_done: boolean;
  duration: string;
  register_date: string | null;
  initial_claim: string;
};

export type GeneralListCaseCustom = {
  data: GeneralListCaseCustomProps[];
};
