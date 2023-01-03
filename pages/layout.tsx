import styles from "../styles/Home.module.css";
import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  KeyOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

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

  const { status, data } = useSession();

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
            selectable={status !== "unauthenticated"}
            disabled={status === "unauthenticated"}
            style={{
              cursor: status === "unauthenticated" ? "not-allowed" : "pointer",
            }}
            items={[
              {
                key: "/",
                icon: <HomeOutlined />,
                label: (
                  <Link
                    style={
                      status === "unauthenticated"
                        ? { cursor: "not-allowed", pointerEvents: "none" }
                        : {}
                    }
                    href="/"
                  >
                    Home
                  </Link>
                ),
              },
              {
                key: "/safe",
                icon: <KeyOutlined />,
                label: (
                  <Link
                    style={
                      status === "unauthenticated"
                        ? { cursor: "not-allowed", pointerEvents: "none" }
                        : {}
                    }
                    href="/safe"
                  >
                    Password Safe
                  </Link>
                ),
              },
              {
                key: "/generate",
                icon: <RobotOutlined />,
                label: (
                  <Link
                    style={
                      status === "unauthenticated"
                        ? { cursor: "not-allowed", pointerEvents: "none" }
                        : {}
                    }
                    href="/generate"
                  >
                    Generate Password
                  </Link>
                ),
              },
            ]}
            onSelect={(props) => { router.push(props.key) }}
          />
        </Sider>
        <Layout
          style={{
            height: "100vh",
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
            }}
          >
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
            {status === "authenticated" && (
              <Button
                onClick={() => signOut()}
                type="text"
                style={{ marginLeft: "auto", marginRight: "20px" }}
              >
                {"Sign out " + data.user?.name}
              </Button>
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
