import { Case } from "./case";
import { GeneralProps } from "./general";
import { JudgeProps } from "./judge";
import { LocationProps } from "./location";
import { TopicProps } from "./topic";
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

export type LawyersCases = {
  data: (LawyerProps & {
    plaintiff_cases: (Case & { topic: TopicProps; location: LocationProps })[];
    defendant_cases: (Case & { topic: TopicProps; location: LocationProps })[];
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

export type LawyerListCaseProps = {
  id: number;
  documentId: string;
  title: string;
  case_number: string;
  client_name: string;
  client_id: number;
  client_documentId: string;
  topic: string;
  role: string;
  lawyer_enemy: string;
  lawyer_enemy_id: number;
  lawyer_enemy_documentId: string;
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

export type LawyerListCase = {
  data: LawyerListCaseProps[];
};

export type LawyerListCaseCustomProps = {
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

export type LawyerListCaseCustom = {
  data: LawyerListCaseCustomProps[];
};
