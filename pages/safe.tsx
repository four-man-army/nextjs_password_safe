import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Safe.module.css";
import {
  EyeOutlined,
  CopyOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

type ListItem = {
  id: number;
  title: string;
  user: string;
  password: string;
};

export default function Home() {
  const { status, data } = useSession();
  const [list, setList] = useState<ListItem[]>([
    {
      id: 1,
      title: "google.com",
      user: "olliXD123",
      password: "hjkHDusza7zHIHjIOu8",
    },
  ]);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <Title>Password Safe</Title>
        <div className={styles.container}>
          <Space align="center" className={styles.paper}>
            <Card className={styles.card}>
            {list && (
              <Row className={styles.row} gutter={48}>
                <Col span={8}>
                  <Title level={3}>Website</Title>
                </Col>
                <Col span={8}>
                  <Title level={3}>Username</Title>
                </Col>
                <Col span={8}>
                  <Title className={styles.show} level={3}>Password</Title>
                </Col>
              </Row>
            )}
              {list?.map((listItem: ListItem) => (
                <Node item={listItem} />
              ))}
              <Button className={styles.button} type="primary">
                + Add
              </Button>
            </Card>
          </Space>
        </div>
      </>
    );

  return <div>loading...</div>;
}

const Node: any = (item: any): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Row className={styles.row} key={item.id} gutter={48}>
      <Col span={8}>
        <Paragraph>{item.item.title}</Paragraph>
      </Col>
      <Col span={8}>
        <Paragraph>{item.item.user}</Paragraph>
      </Col>
      <Col span={8}>
        <Paragraph
          className={!visible ? styles.hide : styles.show}
          copyable={{
            icon: visible
              ? [<EyeInvisibleOutlined />, <CopyOutlined />]
              : [<EyeOutlined />, <EyeOutlined />],
            onCopy: () => {
              setVisible(!visible);
              if (visible) navigator.clipboard.writeText(item.password);
            },
            tooltips: visible ? ["Hide", "Copied!"] : ["Show", "Hidden"],
          }}
        >
          {visible ? item.item.password : "muschi"}
        </Paragraph>
      </Col>
    </Row>
  );
};
