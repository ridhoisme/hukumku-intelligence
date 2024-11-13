import { Layout } from "antd";
import Header from "../../components/header";
import TopSection from "./top-section";
import TableTrial from "./table-trial";
import NewDecisionList from "./new-decision-list";
import Article from "./article";
import Footer from "../../components/footer";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout className="relative min-h-screen font-work">
      <Header
        headerbg="transparent"
        className="absolute left-0 top-0 z-50 w-full"
      />
      <Content className="h-full w-full space-y-10 bg-brand-grey-300">
        <TopSection />
        <TableTrial />
        <NewDecisionList />
        <Article />
      </Content>
      <Footer />
    </Layout>
  );
}
