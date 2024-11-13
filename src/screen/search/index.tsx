import { getRouteApi } from "@tanstack/react-router";
import Filter from "./filter";
import List from "./list";

const routeApi = getRouteApi("/_layout/_search/search");

export default function SearchScreen() {
  const { list } = routeApi.useSearch();

  return <>{list ? <List /> : <Filter />}</>;
}
