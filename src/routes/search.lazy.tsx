import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /search!";
}
