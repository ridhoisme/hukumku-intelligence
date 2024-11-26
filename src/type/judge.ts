import { Case } from "./case";
import { GeneralProps } from "./general";
import { LawyerProps } from "./lawyer";
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

export type Judge = {
  data: JudgeProps;
  meta: ResultMeta;
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

export type JudgeAnalysis = {
  data: {
    top_topic: string;
    top_location: string;
    top_lawyer: string;
    total_case: number;
    case_rejected: number;
    case_partialy: number;
    case_granted: number;
  };
};

export type JudgeCases = {
  data: JudgeProps & {
    cases: (Case & {
      topic?: TopicProps;
      location?: LocationProps;
      defendant_lawyer?: LawyerProps;
      plaintiff_lawyer?: LawyerProps;
      judge?: JudgeProps;
      defendant?: GeneralProps;
      plaintiff?: GeneralProps;
    })[];
  };
  meta: ResultMeta;
};

export type JudgeListCaseProps = {
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
};

export type JudgeListCase = {
  data: JudgeListCaseProps[];
};
