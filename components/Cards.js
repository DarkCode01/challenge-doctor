import Link from "next/link";
import { Row, Col, Rate, Card, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function CardDoctor({ doctors }) {
  return (
    <Row gutter={[16, 16]}>
      {doctors.map(doctor => (
        <Col span={8}>
          <Card
            loading={false}
            actions={[
              <Button icon={<ArrowRightOutlined />}>
                <Link href="/doctors/10" shallow={true} scroll={false}>
                  ver mas información
                </Link>
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
      ))}
    </Row>
  );
}