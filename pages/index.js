import { useRouter } from "next/router";
import { useState } from "react";
import Page from "components/Page";
import Footer from "components/Footer";
import Cards from "components/Cards";
import styles from "styles/Home.module.css";
import { useDoctors } from "lib/hooks/useDoctors";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import FilterForm from "components/FilterForm";
import { Layout, PageHeader, Pagination, Button, Modal } from "antd";
import Form from "antd/lib/form/Form";

export default function Home() {
  const router = useRouter();
  const [isSearch, setSearch] = useState(false);
  const { isLoading, doctors, pagination } = useDoctors(
    router.query?.page || 1
  );

  return (
    <Page>
      <Layout>
        <Layout>
          <Layout.Content style={{ margin: "24px 16px 0", padding: "0 20px" }}>
            <div className={styles.container}>
              <PageHeader
                title={<div className={styles.title}>Challenge Doctor</div>}
                extra={[
                  <Button
                    icon={<SearchOutlined />}
                    className={styles.button}
                    onClick={() => setSearch(!isSearch)}
                  >
                    Buscador
                  </Button>,
                  <FilterForm />,
                ]}
              />

              {/* only display when is mobile screen */}
              {isSearch && <FilterForm hide />}

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
