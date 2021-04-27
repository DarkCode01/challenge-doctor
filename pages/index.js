import Page from "components/Page";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Rate, Layout, PageHeader, Row, Col, Descriptions, Card, Pagination, Button } from "antd";
import styles from "styles/Home.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";

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

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card
                    loading={false}
                    actions={[
                      <Button icon={<ArrowRightOutlined />}>
                        ver mas información
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title="Dr. Jose Miguel Segura"
                      description={
                        <Rate disabled defaultValue={3} />
                      }
                    />
                  </Card>
                </Col>
              </Row>

              <Pagination className={styles.pagination} current={25} total={50} />
            </div>

            <Footer />
          </Layout.Content>
        </Layout>
      </Layout>
    </Page>
  )
}
