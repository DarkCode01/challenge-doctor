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
  return (
    <Form
      layout="vertical"
      initialValues={{
        name: "",
        names: "",
        date: "",
        type: "virtual",
      }}
      onFinish={handleSubmit}
    >
      <Typography.Title level={4}>Datos de la cita</Typography.Title>
      <Form.Item label="Titulo" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Fecha para la cita" name="date">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Como sera su cita?" name="type">
        <Radio.Group defaultValue="virtual">
          <Radio.Button value="virtual">Virtual</Radio.Button>
          <Radio.Button value="presencial">Presencial</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Divider />

      <Typography.Title level={4}>Datos personales</Typography.Title>
      <Form.Item label="Nombre" name="names">
        <Input />
      </Form.Item>
      <Form.Item label="Ubicación" name="location_id">
        <Select placeholder="seleccionar">
          {locations.map((loc) => (
            <Select.Option value={loc.id} key={loc.id}>
              {loc.country}, {loc.state}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
