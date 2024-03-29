import { Input } from "antd";
import styles from "styles/Search.module.css";

export default function FilterForm({ hide, handleSubmit }) {
  return (
    <Input.Search
      placeholder="Buscar"
      className={!hide ? styles.search : styles.mobile}
      size="large"
      onSearch={handleSubmit}
    />
  );
}
