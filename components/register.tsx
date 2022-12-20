import styles from "../styles/Login.module.css";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React from "react";

const { Title } = Typography;

type LoginProps = {
  login: boolean;
  setLogin: (value: boolean) => void;
};

const Register = ({ login, setLogin }: LoginProps): JSX.Element => {

  const onFinish = (values: any) => {
    setLogin(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.login}>
      <Space align="center" className={styles.loginPanel}>
        <Card className={styles.loginCard}>
          <Title>Log-In</Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default Register;
