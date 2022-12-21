import styles from "../../styles/Login.module.css";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

const Register = (): JSX.Element => {

  const onFinish = (values: any) => {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.username,
      }),
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.login}>
      <Space align="center" className={styles.loginPanel}>
        <Card className={styles.loginCard}>
          <Title>Sign up</Title>
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Please input a valid email!"}
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+!@#\$%\^&\*])/, message: "password must contain at least one uppercase letter, one number, and one special character" },
              ]}
            >
              <Input.Password />

            </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="cofirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    }
                  })
                ]}
              >
                <Input.Password />
              </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Text type="secondary">
            Already have an account? <a href="/auth/signin">Sign-In</a>
            </Text>
        </Card>
      </Space>
    </div>
  );
};

export default Register;
