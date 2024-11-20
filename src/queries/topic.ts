import { queryOptions } from "@tanstack/react-query";
import fetchInterceptor from "../config/axios";
import { qs, QueryParams } from "../utils/qs";

export const getTopics = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["GET_TOPICS", params],
    queryFn: async () => await fetchInterceptor<T>(`/topics${queryString}`),
  });
};

export const searchTopic = <T>(params?: string) => {
  return queryOptions({
    queryKey: ["SEARCH_TOPIC", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/search-topic?search=${params}`),
  });
};

export const filterTopic = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["SEARCH_TOPIC", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/filter-topic${queryString}`),
  });
};
