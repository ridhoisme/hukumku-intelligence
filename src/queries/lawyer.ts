import { queryOptions } from "@tanstack/react-query";
import fetchInterceptor from "../config/axios";
import { qs, QueryParams } from "../utils/qs";

export const getLawyers = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["GET_LAWYERS", params],
    queryFn: async () => await fetchInterceptor<T>(`/lawyers${queryString}`),
  });
};

export const searchLawyer = <T>(params?: string) => {
  return queryOptions({
    queryKey: ["SEARCH_LAWYERS", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/search-lawyer?search=${params}`),
  });
};
