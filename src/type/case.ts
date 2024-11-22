import { GeneralProps } from "./general";
import { JudgeProps } from "./judge";
import { LawyerProps } from "./lawyer";
import { LocationProps } from "./location";
import { TopicProps } from "./topic";
import { ResultMeta } from "./type";

export type Case = {
  id: number;
  documentId: string;
  title: string;
  case_number: string;
  info: string;
  info_second: string;
  start_date: string;
  finish_date: string;
  final_verdict: string;
  initial_claim: string;
  type_punishment: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  is_done: boolean | null;
  topic: TopicProps;
  defendant_lawyer: LawyerProps;
  plaintiff_lawyer: LawyerProps;
  judge: JudgeProps;
  plaintiff: GeneralProps;
  defendant: GeneralProps;
  location: LocationProps;
};

export type Cases = {
  data: Case[];
  meta: ResultMeta;
};
