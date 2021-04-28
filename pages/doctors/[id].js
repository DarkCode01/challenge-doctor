import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import Page from "components/Page";
import Footer from "components/Footer";
import Cards from "components/Cards";
import Comments from "components/Comments";
import { useDoctorDetails } from "lib/hooks/useDoctorDetails";
import { useLocations } from "lib/hooks/useLocations";
import { calculateMean } from "lib/utils";
import ReviewForm from "components/ReviewForm";
import AppointmentForm from "components/AppointmentForm";
import {
  Space,
  Modal,
  Button,
  Divider,
  Rate,
  Typography,
  Row,
  Col,
  Card,
  Drawer,
  Alert,
  Layout,
  Descriptions,
  PageHeader,
  Pagination,
  Timeline,
  Result,
  Table,
  notification,
} from "antd";
import styles from "styles/Home.module.css";
import { api } from "lib/services/api";

const Doctor = ({ id }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const [isModal, setModal] = useState(false);
  const { locations } = useLocations();
  const { details, error } = useDoctorDetails(id);
  const [reviews, setReviews] = useState(details.reviews || []);
  const [appointments, setAppointments] = useState(details.appointments || []);
  const mean = calculateMean(reviews || []);

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen]);
  const toggleModal = useCallback(() => setModal(!isModal), [isModal]);
  const onClose = () => {
    toggle();
    router.back();
  };

  const handleSubmit = async (values) => {
    try {
      // create user
      const response = await api.createUser(values);
      const reviewResponse = await api.createReview({
        ...values,
        doctor: id,
        user_id: response.data.result.id,
      });

      setReviews((p) => [...p, reviewResponse.data.result]);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitAppointment = async (values) => {
    try {
      // create user
      const response = await api.createUser(values);
      const appointmentResponse = await api.createAppointment({
        ...values,
        doctor: id,
        user_id: response.data.result.id,
      });

      setAppointments((p) => [...p, appointmentResponse.data.result]);
      setModal(false);

      notification.open({
        message: "Cita agendada!",
        description: "La cita se agendo con exitos, se notificara al doctor.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setReviews(details.reviews);
    setAppointments(details.appointments);
  }, [details.reviews, details.appointments]);

  return (
    <Page>
      <Layout>
        <Layout>
          <Layout.Content style={{ margin: "24px 16px 0", padding: "0 20px" }}>
            <div className={styles.container}>
              <PageHeader title="Principal" subTitle="lista de doctores" />

              <Cards doctors={[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2, 2]} />

              <Pagination
                className={styles.pagination}
                current={25}
                total={50}
              />
            </div>

            <Footer />

            {/* modal */}
            <Modal
              destroyOnClose
              onCancel={toggleModal}
              visible={isModal}
              zIndex={99}
              footer={
                <Button key="back" onClick={toggleModal}>
                  Cancelar
                </Button>
              }
            >
              <AppointmentForm
                handleSubmit={handleSubmitAppointment}
                locations={locations}
              />
            </Modal>

            <Drawer
              zIndex={1}
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
                {error.isError && (
                  <Alert
                    type="error"
                    message="Error al intentar obtener los datos."
                    onClose={() => error.handle(null)}
                    closable
                  />
                )}

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
                        <Descriptions.Item label="Ubicación">
                          {details.location?.country}, {details.location?.state}
                        </Descriptions.Item>
                      </Descriptions>

                      <Card title="valorar">
                        {!isSuccess && (
                          <ReviewForm
                            handleSubmit={handleSubmit}
                            locations={locations}
                          />
                        )}
                        {isSuccess && (
                          <Result
                            status="success"
                            title="Su valoracion fue enviada con exitos!"
                            subTitle="Solo puede realizar una valoración por cuenta"
                          />
                        )}
                      </Card>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Typography.Title level={5}>
                        Especialidades
                      </Typography.Title>
                      <Divider />
                      {details.specialities &&
                      details.specialities.length === 0 ? (
                        <Result title="No tiene especialidades registradas!" />
                      ) : null}
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
                  <Col span={12}>
                    <Card>
                      <Comments data={reviews} mean={mean} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title="Agenda"
                      extra={
                        <Button type="primary" onClick={toggleModal}>
                          Agendar Cita
                        </Button>
                      }
                    >
                      <Table
                        dataSource={appointments}
                        columns={[
                          {
                            title: "Cita",
                            dataIndex: "name",
                            key: "name",
                          },
                          {
                            title: "Tipo",
                            dataIndex: "type",
                            key: "type",
                          },
                          {
                            title: "Fecha",
                            dataIndex: "date",
                            key: "date",
                          },
                        ]}
                        pagination={false}
                      />
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
