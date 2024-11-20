import { queryOptions } from "@tanstack/react-query";
import fetchInterceptor from "../config/axios";
import { qs, QueryParams } from "../utils/qs";

export const getLocations = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["GET_LOCATIONS", params],
    queryFn: async () => await fetchInterceptor<T>(`/locations${queryString}`),
  });
};

export const searchLocation = <T>(params?: string) => {
  return queryOptions({
    queryKey: ["SEARCH_LOCATION", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/search-location?search=${params}`),
  });
};

export const filterLocation = <T>(params?: QueryParams) => {
  const queryString = params ? qs(params) : "";
  return queryOptions({
    queryKey: ["SEARCH_LOCATION", params],
    queryFn: async () =>
      await fetchInterceptor<T>(`/filter-location${queryString}`),
  });
};
