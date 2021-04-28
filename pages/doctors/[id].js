import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import dayjs from "dayjs";
import Page from "components/Page";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Cards from "components/Cards";
import Comments from "components/Comments";
import { useDoctorDetails } from "lib/hooks/useDoctorDetails";
import { calculateMean } from "lib/utils";
import {
  Input,
  Space,
  Divider,
  Form,
  Button,
  Rate,
  Typography,
  Row,
  Col,
  Card,
  Drawer,
  Layout,
  Descriptions,
  PageHeader,
  Pagination,
  Timeline,
} from "antd";
import styles from "styles/Home.module.css";

const Doctor = ({ id }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(true);
  const { isLoading, details, error } = useDoctorDetails(id);
  const mean = calculateMean(details.reviews || []);

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen]);
  const onClose = () => {
    toggle();
    router.back();
  };

  console.log(mean);

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

              <Cards doctors={[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2, 2]} />

              <Pagination
                className={styles.pagination}
                current={25}
                total={50}
              />
            </div>

            <Footer />

            <Drawer
              title={
                <>
                  {details.names} -
                  <Rate disabled defaultValue={mean} />
                </>
              }
              placement="bottom"
              closable={true}
              onClose={onClose}
              visible={isOpen}
              height={640}
            >
              <Space size={10} direction="vertical">
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Card>
                      <Descriptions
                        title={
                          <>
                            Detalles
                            <Divider />
                          </>
                        }
                      >
                        <Descriptions.Item label="Nombre">
                          {details.names}
                        </Descriptions.Item>
                        <Descriptions.Item label="Experiencia">
                          {details.years} años
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Horario">2019-02-20</Descriptions.Item> */}
                        <Descriptions.Item label="Ubicación">
                          {details.location?.country}, {details.location?.state}
                        </Descriptions.Item>
                      </Descriptions>

                      <Card title="valorar">
                        <Form>
                          <Form.Item>
                            <Rate />
                          </Form.Item>
                          <Form.Item>
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item>
                            <Button block>enviar</Button>
                          </Form.Item>
                        </Form>
                      </Card>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Typography.Title level={5}>
                        Especialidades
                      </Typography.Title>
                      <Divider />
                      <Timeline>
                        {details.specialities &&
                          details.specialities.map((spc) => (
                            <Timeline.Item key={spc.id}>
                              {spc.name} (
                              {dayjs(spc.date_init).format("MM-DD-YYYY")} -{" "}
                              {dayjs(spc.date_finish).format("MM-DD-YYYY")})
                            </Timeline.Item>
                          ))}
                      </Timeline>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Card>
                      <Comments data={details.reviews} mean={mean} />
                    </Card>
                  </Col>
                </Row>
              </Space>
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
      id: context.query.id,
    },
  };
}

export default Doctor;
