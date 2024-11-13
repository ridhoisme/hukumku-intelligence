import { createFileRoute, Outlet } from "@tanstack/react-router";
import Breadcrumb from "../../screen/search/components/breadcrumb";

export const Route = createFileRoute("/_layout/_search")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-brand-grey-300">
      <Breadcrumb />
      <Outlet />
    </div>
  );
}
