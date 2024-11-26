import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import NotFound from "../screen/not-found";
// import React from "react";

// const TanStackRouterDevtools =
//   import.meta.env.NODE_ENV === "production"
//     ? () => null
//     : React.lazy(() =>
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//         })),
//       );

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
        {/* <TanStackRouterDevtools /> */}
      </>
    ),
  },
);
