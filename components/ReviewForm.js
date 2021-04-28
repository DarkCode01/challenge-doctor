import { Form, Input, Rate, Select, Button } from "antd";

export default function ReviewForm({ handleSubmit, locations }) {
  return (
    <Form
      layout="vertical"
      initialValues={{
        comment: "",
        starts: 1,
        names: "",
      }}
      onFinish={handleSubmit}
    >
      <Form.Item label="Estrellas" name="starts">
        <Rate defaultValue={1} />
      </Form.Item>
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
      <Form.Item label="Comentario (opcional)" name="comment">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button color="success" htmlType="submit" block>
          enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
