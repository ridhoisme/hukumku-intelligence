import { createFileRoute } from "@tanstack/react-router";
import Home from "../screen/home";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Home />;
}
