import { useState, useCallback } from "react";
import {
  Divider,
  Typography,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Radio,
} from "antd";

export default function AppointmentForm({ handleSubmit, locations }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const loading = useCallback(() => setSubmitting(!isSubmitting), [
    isSubmitting,
  ]);

  return (
    <Form
      layout="vertical"
      initialValues={{
        name: "",
        names: "",
        date: "",
        type: "virtual",
      }}
      onFinish={async () => {
        await loading();
        await handleSubmit();
        await loading();
      }}
    >
      <Typography.Title level={4}>Datos de la cita</Typography.Title>
      <Form.Item label="Titulo" name="name">
        <Input
          placeholder="nombre para recordar la cita"
          disabled={isSubmitting}
        />
      </Form.Item>
      <Form.Item label="Fecha para la cita" name="date">
        <DatePicker disabled={isSubmitting} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Como sera su cita?" name="type">
        <Radio.Group disabled={isSubmitting} defaultValue="virtual">
          <Radio.Button value="virtual">Virtual</Radio.Button>
          <Radio.Button value="presencial">Presencial</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Divider />

      <Typography.Title level={4}>Datos personales</Typography.Title>
      <Form.Item label="Nombre" name="names">
        <Input disabled={isSubmitting} placeholder="Nombre" />
      </Form.Item>
      <Form.Item label="Ubicación" name="location_id">
        <Select disabled={isSubmitting} placeholder="seleccionar">
          {locations.map((loc) => (
            <Select.Option value={loc.id} key={loc.id}>
              {loc.country}, {loc.state}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button loading={isSubmitting} type="primary" htmlType="submit" block>
          enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
