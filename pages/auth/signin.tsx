import styles from "../../styles/Login.module.css";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React from "react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";

const { Title } = Typography;

const SignIn: NextPage = (props): JSX.Element => {

  const onFinish = async (values: any) => {
    const res = await signIn("credentials", {
      email: values.username,
      password: values.password,
      callbackUrl: "/",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.login}>
      <Space align="center" className={styles.loginPanel}>
        <Card className={styles.loginCard}>
          <Title>Sign-In</Title>
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

export default SignIn;
