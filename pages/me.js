import Page from "components/Page";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Cards from "components/Cards";
import { Layout } from "antd";

export default function Me() {
  return (
    <Page>
      <Layout>
        <Navbar />

        <Layout>
          <Layout.Content style={{ margin: "24px 16px 0", padding: "0 20px" }}>
            dasdasd
            <Footer />
          </Layout.Content>
        </Layout>
      </Layout>
    </Page>
  );
}
