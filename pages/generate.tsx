import React, { useState } from 'react';
import { Typography, Col, InputNumber, Row, Slider } from 'antd';
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import styles from "../styles/Generator.module.css";

const { Title } = Typography;

const IntegerStep = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={12}
          max={32}
          onChange={(e) => onChange(e)}
          value={typeof inputValue === 'number' ? inputValue : 12}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={(e) => {
            if (e !== null) onChange(e);
          }}
        />
      </Col>
    </Row>
  );
};

export default function Home() {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <Title>Generate Password</Title>
        <div className={styles.container}>
          <div className={styles.input}>
          <Title level={4} className={styles.input_title}>Password length</Title>
            <IntegerStep />
          </div>
          <div className={styles.outfield}>

          </div>
        </div>
      </>
    );

  return <div>loading...</div>;
}
