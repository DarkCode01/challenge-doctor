import { useRouter } from "next/router";
import Page from "components/Page";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Cards from "components/Cards";
import { Layout, PageHeader, Pagination } from "antd";
import styles from "styles/Home.module.css";
import { useDoctors } from "lib/hooks/useDoctors";

export default function Home() {
  const router = useRouter();
  const { isLoading, doctors, pagination } = useDoctors(
    router.query?.page || 1
  );

  return (
    <Page>
      <Layout>
        <Navbar />

        <Layout>
          <Layout.Content style={{ margin: "24px 16px 0", padding: "0 20px" }}>
            <div className={styles.container}>
              <PageHeader
                title="Principal"
                subTitle="lista de doctores"
                onBack={() => null}
              />

              <Cards
                isLoading={isLoading}
                doctors={
                  doctors.length >= 1
                    ? doctors
                    : [null, null, null, null, null, null, null, null, null]
                }
              />

              <Pagination
                className={styles.pagination}
                current={parseInt(router.query.page) || 1}
                total={pagination.items}
                // showQuickJumper={false}
                showSizeChanger={false}
                onChange={(p) => router.push(`/?page=${p}`)}
              />
            </div>

            <Footer />
          </Layout.Content>
        </Layout>
      </Layout>
    </Page>
  );
}
