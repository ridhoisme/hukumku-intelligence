import { General } from "./general";
import { Judge } from "./judge";
import { Lawyer } from "./lawyer";
import { Location } from "./location";
import { Topic } from "./topic";
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
  preliminary_ruling: string;
  type_punishment: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  is_done: boolean | null;
  topic: Topic;
  defendant_lawyer: Lawyer;
  plaintiff_lawyer: Lawyer;
  judge: Judge;
  plaintiff: General;
  defendant: General;
  location: Location;
};

export type Cases = {
  data: Case[];
  meta: ResultMeta;
};
