import styles from "../../styles/Login.module.css";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React, { SetStateAction, useState } from "react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

type ValidateStatus = "success" | "warning" | "error" | "validating" | "";

const { Title, Text } = Typography;

const SignIn: NextPage = (props): JSX.Element => {
  const [validMail, setValidMail] = React.useState<ValidateStatus>("");
  const [validPw, setValidPw] = React.useState<ValidateStatus>("");
  const [errorHandle, setErrorHandle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successHandle, setSuccessHandle] = useState(false);
  const crypto = require('crypto');
  const redirect = useRouter().query["registered"]

  const onFinish = async (values: any) => {
    if(redirect) Router.replace("/auth/signin");
    setValidMail("validating");
    setValidPw("validating");
    const res = await signIn("credentials", {
      email: values.email,
      password: crypto.createHash('sha512').update(values.password, 'utf-8').digest('hex'),
      rember: values.remember,
      redirect: false,
    });
    if (res) {
      if (res.error) {
        setValidAll("error");
        setErrorMessage("Email or password does not match");
        setErrorHandle(true);
        setSuccessHandle(false);
      } else {
        setValidAll("success");
        Router.replace("/");
      }
    }
  };

  const onFinishFailed = (values: any) => {
    if(redirect) Router.replace("/auth/signin");
    setValidAll("");
    values.errorFields.map((field: any) => {
      if (field.name[0] === "username") setValidMail("error")
      if (field.name[0] === "password") setValidPw("error");
    })
    setErrorMessage("Please fill in all the fields");
    setErrorHandle(true);
    setSuccessHandle(false);
  };

  const onValuesChange = () => {
    setErrorHandle(false);
    setSuccessHandle(false);
    setValidAll("");
  }

  const setValidAll = (v: SetStateAction<ValidateStatus>) => {
    setValidMail(v);
    setValidPw(v);
  }

  return (
    <div className={styles.login}>
      <Space align="center" className={styles.loginPanel}>
        <Card className={styles.loginCard}>
          <Title>Sign-In</Title>
          {errorHandle && (
            <div className={styles.feedback_error}>
              <Text type="danger" style={{ textAlign: "center" }}>
                {errorMessage}
              </Text>
            </div>
          )}
          {successHandle && (
            <div className={styles.feedback_success}>
              <Text type="success" style={{ textAlign: "center" }}>
                {"Sign in successful!"}
              </Text>
            </div>
          )}
          {useRouter().query["registered"] && (
            <div className={styles.feedback_success}>
              <Text type="success" style={{ textAlign: "center" }}>
                {"Registration successful! Please sign in."}
              </Text>
            </div>
          )}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="on"
          >
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
              validateStatus={validMail}
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
              validateStatus={validPw}
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
