import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NotFound from "../screen/not-found";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: () => (
    <>
      <Outlet />
      <ScrollRestoration />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
});
