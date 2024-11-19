import { queryOptions } from "@tanstack/react-query";
import fetchInterceptor from "../config/axios";
import { qs, QueryParams } from "../utils/qs";

export const getGenerals = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["GET_GENERALS", params],
    queryFn: async () => await fetchInterceptor<T>(`/generals${queryString}`),
  });
};

export const searchGeneral = <T>(params?: string) => {
  return queryOptions({
    queryKey: ["SEARCH_GENERAL", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/search-general?search=${params}`),
  });
};
