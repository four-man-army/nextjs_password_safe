import styles from "../../styles/Login.module.css";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import Link from "next/link";

const { Title, Text } = Typography;

type ValidateStatus = "success" | "warning" | "error" | "validating" | "";

const Register = (): JSX.Element => {
  const [ errorHandle, setErrorHandle ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ successHandle, setSuccessHandle ] = useState(false);

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
    }).then((res) => res.json())
    .then((data) => {
      if(data.error) {
        console.log(data.error);
        setErrorMessage(data.error);
        setErrorHandle(true);
        setSuccessHandle(false);
      }
      if(data === true) {
        console.log("User created");
        setErrorHandle(false);
        setSuccessHandle(true);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setErrorMessage("Please fill in all fields");
    setErrorHandle(true);
    setSuccessHandle(false);
  };

  const render = (
    <div className={styles.login}>
      <Space align="center" className={styles.loginPanel}>
        <Card className={styles.loginCard}>
          <Title>Sign up</Title>
          {errorHandle &&
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
          }}>
            <Text type="danger" style={{textAlign: "center"}}>
              {errorMessage}
            </Text>
          </div>
          }
          {successHandle &&
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
          }}>
            <Text type="success" style={{textAlign: "center"}}>
              {"Account created successfully. "}
              <Link href="/auth/signin">Sign in</Link>
            </Text>
          </div>
          }
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
                { min: 4, message: "Username must be at least 4 characters long" },
              ]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
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
            Already have an account? <Link href="/auth/signin">Sign-In</Link>
            </Text>
        </Card>
      </Space>
    </div>
  );
  return render;
};

export default Register;
