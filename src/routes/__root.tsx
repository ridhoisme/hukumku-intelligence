import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NotFound from "../screen/not-found";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    pendingComponent: () => (
      <div className="h-screen w-screen bg-yellow-700">pending</div>
    ),
    notFoundComponent: NotFound,
    component: () => (
      <>
        <Outlet />
        <ScrollRestoration />
        <ReactQueryDevtools />
        <TanStackRouterDevtools />
      </>
    ),
  },
);
