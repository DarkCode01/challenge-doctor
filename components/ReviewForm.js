import { useState, useCallback } from "react";
import { Form, Input, Rate, Select, Button } from "antd";

export default function ReviewForm({ handleSubmit, locations }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const loading = useCallback(() => setSubmitting(!isSubmitting), [
    isSubmitting,
  ]);

  return (
    <Form
      layout="vertical"
      initialValues={{
        comment: "",
        starts: 1,
        names: "",
      }}
      onFinish={async () => {
        await loading();
        await handleSubmit();
        await loading();
      }}
    >
      <Form.Item label="Estrellas" name="starts">
        <Rate defaultValue={1} disabled={isSubmitting} />
      </Form.Item>
      <Form.Item label="Nombre" name="names">
        <Input disabled={isSubmitting} placeholder="Nombre" />
      </Form.Item>
      <Form.Item label="Ubicación" name="location_id">
        <Select placeholder="seleccionar" disabled={isSubmitting}>
          {locations.map((loc) => (
            <Select.Option value={loc.id} key={loc.id}>
              {loc.country}, {loc.state}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Comentario (opcional)" name="comment">
        <Input.TextArea
          placeholder="comentario (opcional)"
          disabled={isSubmitting}
        />
      </Form.Item>
      <Form.Item>
        <Button color="success" htmlType="submit" block loading={isSubmitting}>
          enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
