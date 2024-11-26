import { Case } from "./case";
import { GeneralProps } from "./general";
import { JudgeProps } from "./judge";
import { LawyerProps } from "./lawyer";
import { LocationProps } from "./location";
import { ResultMeta } from "./type";

export type TopicProps = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Topic = {
  data: TopicProps;
  meta: ResultMeta;
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

export type TopicAnalysis = {
  data: {
    top_judge: string;
    top_location: string;
    top_lawyer: string;
    total_case: number;
    case_rejected: number;
    case_partialy: number;
    case_granted: number;
  };
};

export type TopicCases = {
  data: TopicProps & {
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

export type TopicListCaseProps = {
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

export type TopicListCase = {
  data: TopicListCaseProps[];
};
