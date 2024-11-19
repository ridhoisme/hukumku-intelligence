import { Generals } from "./general";
import { Judges } from "./judge";
import { Lawyers } from "./lawyer";
import { Locations } from "./location";
import { Topics } from "./topic";

export type ResultMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type EndpointToResult = {
  "/lawyers": Lawyers;
  "/judges": Judges;
  "/locations": Locations;
  "/topics": Topics;
  "/generals": Generals;
};

export type ResultType<E extends keyof EndpointToResult> = EndpointToResult[E];
