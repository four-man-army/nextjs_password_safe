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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
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
    <div className="h-screen">
      <section className="flex flex-row h-full">
        <aside className="w-20 bg-blue-950"></aside>
        <section className="flex flex-col w-full bg-slate-100">
          <header className="h-16 bg-white"></header>
          <main className="my-6 mx-4 p-6 h-full bg-white">{children}</main>
        </section>
      </section>
    </div>
  );
}
