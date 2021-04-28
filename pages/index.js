import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Page from "components/Page";
import Footer from "components/Footer";
import Cards from "components/Cards";
import styles from "styles/Home.module.css";
import { useDoctors } from "lib/hooks/useDoctors";
import { SearchOutlined } from "@ant-design/icons";
import FilterForm from "components/FilterForm";
import { Alert, Layout, PageHeader, Pagination, Button } from "antd";

export default function Home() {
  const router = useRouter();
  const [isSearch, setSearch] = useState(false);
  const [q, setQ] = useState(router.query.q || "");
  const { isLoading, doctors, pagination, error } = useDoctors(
    router.query?.page || 1,
    q
  );

  const changeQ = useCallback((value) => setQ(value), [q]);

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
                  <FilterForm handleSubmit={changeQ} />,
                ]}
              />

              {/* only display when is mobile screen */}
              {isSearch && <FilterForm hide handleSubmit={changeQ} />}

              {error.isError && (
                <Alert
                  type="error"
                  message="Error al intentar obtener los datos."
                  onClose={() => error.handle(null)}
                  closable
                />
              )}

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
