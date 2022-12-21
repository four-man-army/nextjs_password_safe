import styles from "../../styles/Login.module.css";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React from "react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Router from "next/router";
import Link from "next/link";

type ValidateStatus = "success" | "warning" | "error" | "validating" | "";

const { Title, Text } = Typography;

const SignIn: NextPage = (props): JSX.Element => {
  const [valid, setValid] = React.useState<ValidateStatus>("");

  const onFinish = async (values: any) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      rember: values.remember,
      redirect: false,
    });
    console.log(res);
    if (res) {
      if (res.error) {
        setValid("error");
      } else {
        setValid("success");
        Router.replace("/");
      }
    }
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
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
              validateStatus={valid}
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              validateStatus={valid}
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
              <Checkbox checked={true}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Text type="secondary">
            Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
          </Text>
        </Card>
      </Space>
    </div>
  );
};

export default SignIn;
