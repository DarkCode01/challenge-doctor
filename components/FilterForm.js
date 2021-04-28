import { Form, Input, Select } from "antd";
import styles from "styles/Search.module.css";

export default function FilterForm({ hide }) {
  return (
    <Input.Search
      placeholder="Buscar"
      className={!hide && styles.search}
      size="large"
    />
  );
}
