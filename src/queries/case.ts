import { queryOptions } from "@tanstack/react-query";
import fetchInterceptor from "../config/axios";
import { qs, QueryParams } from "../utils/qs";
import { Cases } from "../type/case";

export const getCases = (params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["GET_CASES", params],
    queryFn: async () => await fetchInterceptor<Cases>(`/cases${queryString}`),
  });
};
