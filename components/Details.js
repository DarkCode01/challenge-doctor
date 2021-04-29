import { Descriptions, Divider } from "antd";

export default function Details({ details, title }) {
  return (
    <Descriptions
      title={
        <>
          {title}
          <Divider />
        </>
      }
    >
      <Descriptions.Item label="Nombre">{details.names}</Descriptions.Item>
      <Descriptions.Item label="Experiencia">
        {details.years} años
      </Descriptions.Item>
      <Descriptions.Item label="Ubicación">
        {details.location?.country}, {details.location?.state}
      </Descriptions.Item>
    </Descriptions>
  );
}
