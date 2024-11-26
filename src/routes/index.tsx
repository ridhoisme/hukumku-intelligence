import { createFileRoute } from "@tanstack/react-router";
import Home from "../screen/home";
import Loading from "../screen/loading";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  wrapInSuspense: true,
  pendingComponent: () => <Loading logoLarge />,
});

function RouteComponent() {
  return <Home />;
}
