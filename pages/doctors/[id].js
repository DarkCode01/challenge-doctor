import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import Page from "components/Page";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Cards from "components/Cards";
import { Drawer, Layout, PageHeader, Pagination } from "antd";
import styles from "styles/Home.module.css";

const Doctor = ({ id }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(true);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen]);
  const onClose = () => {
    toggle();
    router.back();
  }

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

            <Drawer
              title="Basic Drawer"
              placement="right"
              closable={false}
              onClose={onClose}
              visible={isOpen}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>
          </Layout.Content>
        </Layout>
      </Layout>
    </Page>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id
    }
  }
}

export default Doctor;
