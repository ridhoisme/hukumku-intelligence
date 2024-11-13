import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Layout } from "antd";
import Header from "../components/header";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

const { Content } = Layout;

function LayoutComponent() {
  return (
    <>
      <Layout className="min-h-screen font-work">
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}
