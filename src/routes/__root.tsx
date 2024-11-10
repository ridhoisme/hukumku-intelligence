import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "antd";
import Header from "../components/header";

const { Content } = Layout;

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout className="font-work min-h-screen">
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
});
