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

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
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
    <>
      {children}
    </>
  );
}
