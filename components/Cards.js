import Link from "next/link";
import { Row, Col, Rate, Card, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { calculateMean } from "lib/utils";

export default function CardDoctor({ isLoading, doctors }) {
  return (
    <Row gutter={[16, 16]}>
      {doctors.map((doctor, index) => {
        const mean = calculateMean(doctor?.reviews || []);

        return (
          <Col span={8} key={`doctor-card-${index}`}>
            <Card
              loading={isLoading}
              actions={[
                <Button disabled={isLoading} icon={<ArrowRightOutlined />}>
                  <Link
                    href={`/doctors/${doctor && doctor.id}`}
                    shallow={true}
                    scroll={false}
                  >
                    ver mas información
                  </Link>
                </Button>,
              ]}
            >
              <Card.Meta
                title={doctor && doctor?.names}
                description={<Rate disabled defaultValue={mean} />}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
