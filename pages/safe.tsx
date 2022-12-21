import { Button, Card, Col, Input, Row, Space, Tooltip, Typography } from "antd";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import styles from "../styles/Safe.module.css";
import { EyeOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Home() {
  const { status, data } = useSession();

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
              <Row gutter={48}>
                <Col span={8}>
                  <Input value={"google.com"} />
                </Col>
                <Col span={8}>
                  <Input value={"olliXD123"} />
                </Col>
                <Col span={8}>  
                  <Input.Group compact>
                    <Input.Password disabled value={"pppppp"} visibilityToggle={false} style={{width: "calc(100% - 32px)"}} />
                    <Tooltip title="view password">
                      <Button icon={<EyeOutlined />} />
                    </Tooltip>
                  </Input.Group>
                </Col>
              </Row>
              <Button className={styles.button} type="primary">+ Add</Button>
            </Card>
          </Space>
        </div>
      </>
    );

  return <div>loading...</div>;

}
