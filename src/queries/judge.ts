import { queryOptions } from "@tanstack/react-query";
import fetchInterceptor from "../config/axios";
import { qs, QueryParams } from "../utils/qs";

export const getJudges = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["GET_JUDGE", params],
    queryFn: async () => await fetchInterceptor<T>(`/judges${queryString}`),
  });
};

export const searchJudge = <T>(params?: string) => {
  return queryOptions({
    queryKey: ["SEARCH_JUDGE", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/search-judge?search=${params}`),
  });
};
