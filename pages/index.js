import Page from "components/Page";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Cards from "components/Cards";
import {Layout, PageHeader, Pagination } from "antd";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <Page>
      <Layout>
        <Navbar />
        
        <Layout>
          <Layout.Content style={{ margin: '24px 16px 0', padding: '0 20px' }}>
            <div className={styles.container}>
              <PageHeader
                title="Principal"
                subTitle="lista de doctores"
                onBack={() => null}
              />

              <Cards doctors={[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2, 2]}/>

              <Pagination className={styles.pagination} current={25} total={50} />
            </div>

            <Footer />
          </Layout.Content>
        </Layout>
      </Layout>
    </Page>
  )
}
