import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  KeyOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

export default function RootLayout({ children }: { children: ReactNode}): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  return (
    <div className={styles.app}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentRoute]}
            onClick={({ key }) => {
              setCurrentRoute(key);
            }}
            items={[
              {
                key: "/",
                icon: <HomeOutlined />,
                label: "Home",

              },
              {
                key: "/safe",
                icon: <KeyOutlined />,
                label: "Password Safe",
              },
              {
                key: "/generate",
                icon: <RobotOutlined />,
                label: "Generate Password",
              }
            ]}
            onSelect={(props) => { router.push(props.key) }}
          />
        </Sider>
        <Layout
          style={{
            height: "100vh",
          }}
        >
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {collapsed ? (
              <MenuUnfoldOutlined
                className={styles.trigger}
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                className={styles.trigger}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </Header>
          <Content
            style={{
              height: "100%",
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              backgroundColor: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
