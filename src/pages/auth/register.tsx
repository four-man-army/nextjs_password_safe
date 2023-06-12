import styles from "../../styles/Login.module.css";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import React, { SetStateAction, useState } from "react";
import Link from "next/link";
import Router from "next/router";

const { Title, Text } = Typography;

type ValidateStatus = "success" | "warning" | "error" | "validating" | "";

const Register = (): JSX.Element => {
  const [validName, setValidName] = React.useState<ValidateStatus>("");
  const [validMail, setValidMail] = React.useState<ValidateStatus>("");
  const [validPw, setValidPw] = React.useState<ValidateStatus>("");
  const [validConfirmPw, setValidConfirmPw] = React.useState<ValidateStatus>("");
  const [errorHandle, setErrorHandle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successHandle, setSuccessHandle] = useState(false);
  const crypto = require('crypto');

  const onFinish = (values: any) => {
    setValidAll("validating");
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: crypto.createHash('sha512').update(values.password, 'utf-8').digest('hex'),
        name: values.username,
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.error === "Email already in use") {
          setValidAll("")
          setValidMail("error");
          setErrorMessage(data.error);
          setErrorHandle(true);
          setSuccessHandle(false);
        } else {
          setValidAll("")
          setErrorMessage("Something went wrong");
          setErrorHandle(true);
          setSuccessHandle(false);
        }
        if (data === true) {
          console.log("User created");
          setValidAll("success")
          setErrorHandle(false);
          setSuccessHandle(true);
          Router.replace("/auth/signin?registered=true");
        }
      });
  };

  const onFinishFailed = (values: any) => {
    setValidAll("");
    values.errorFields.map((field: any) => {
      if (field.name[0] === "username") setValidName("error")
      if (field.name[0] === "email") setValidMail("error");
      if (field.name[0] === "password") setValidPw("error");
    })
    setErrorMessage("Please fill in all the fields");
    setErrorHandle(true);
    setSuccessHandle(false);
  };

  const onValuesChange = () => {
    setErrorHandle(false);
    setSuccessHandle(false);
  }

  const setValidAll = (v: SetStateAction<ValidateStatus>) => {
    setValidName(v);
    setValidMail(v);
    setValidPw(v);
  }

  const render = (
    <div className={styles.login}>
      <Space align="center" className={styles.loginPanel}>
        <Card className={styles.loginCard}>
          <Title>Sign up</Title>
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
                {"Account created successfully. "}
                <Link href="/auth/signin">Sign in</Link>
              </Text>
            </div>
          )}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              validateStatus={validName}
              hasFeedback
              rules={[
                { required: true, message: "Please input your username!" },
                {
                  min: 4,
                  max: 20,
                  message: "Username must be 4-20 characters long",
                },
                () => ({
                  validator(_, value) {
                    if (value.length >= 4 && value.length <= 20) {
                      setValidName("success");
                      return Promise.resolve();
                    }
                    setValidName("warning");
                    return Promise.reject();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              validateStatus={validMail}
              hasFeedback
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please input a validName email!",
                },
                () => ({
                  validator(_, value) {
                    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                    if (regex.test(value)) {
                      setValidMail("success");
                      return Promise.resolve();
                    }
                    setValidMail("warning")
                    return Promise.reject()
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              validateStatus={validPw}
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                {min: 8, message: "Password must be at least 8 characters long"},
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+!@#\$%\^&\*])/,
                  message: "Password must contain at least one uppercase letter, one number, and one special character",
                },
                () => ({
                  validator(_, value) {
                    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+!@#\$%\^&\*])/);
                    if (regex.test(value) && value.length >= 8) {
                      setValidPw("success");
                      return Promise.resolve();
                    }
                    setValidPw("warning")
                    return Promise.reject()
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="cofirmPassword"
              validateStatus={validConfirmPw}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      setValidConfirmPw("success");
                      return Promise.resolve();
                    }
                    setValidConfirmPw("warning")
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
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
