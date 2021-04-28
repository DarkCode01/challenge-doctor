import Link from "next/link";
import { Menu, Layout } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

export default function Navbar() {
  return (
    <Layout.Sider
      collapsed={false}
      trigger={null}
      collapsible
      breakpoint="lg"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "1rem",
          padding: "5px 10px",
          height: "32px",
          margin: "16px",
        }}
      >
        Challenge Doctor
      </h1>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link href="/">Principal</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          <Link href="/123">Mi cuenta</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
