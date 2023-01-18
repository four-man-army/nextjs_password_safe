import React, { useState } from 'react';
import { Typography, Col, InputNumber, Row, Slider, Button, Tooltip, Checkbox } from 'antd';
import { CopyOutlined, CheckOutlined, RedoOutlined, RobotOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSession } from "next-auth/react";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Router from "next/router";
import { useEffect } from "react";
import styles from "../styles/Generator.module.css";

const { Title } = Typography;

function genPw(length: number, specialChars: boolean): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const specialCharacters = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
  var result = '';

  if (specialChars) {
    for (var i = 0; i < length; i++) {
      var list = characters + specialCharacters
      result += list.charAt(Math.random() * list.length);
    }
    return result;
  } else {
    var list = characters;
    for (var i = 0; i < length; i++) {
      result += list.charAt(Math.random() * list.length);
    }
    return result;
  }
}

export default function Home() {
  const { status, data } = useSession();
  const [inputValue, setInputValue] = useState<number>(12);
  const [pw, setPw] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [checked, setChecked] = useState(true);
  const [rotate, setRotate] = useState(0);


  const onCheckBoxChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };
  const copyHandle = () => {
    navigator.clipboard.writeText(pw as string);
    setCopied(true);
  };
  const redoHandle = () => {
    setPw(genPw(inputValue, checked));
    for (let i = 0; i < 360; i++) {
      setTimeout(() => {
        setRotate(i);
      }, 0.8 * i);
    }
  };

  useEffect(() => {
    setPw(genPw(inputValue, checked));
  }, [inputValue, checked]);
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);



  if (status === "authenticated")
    return (
      <>
        <div className={styles.title}><Title><RobotOutlined style={{ fontSize: "32px", padding: "10px" }} />Generate Password</Title></div>
        <div className={styles.container}>
          <div className={styles.input}>
            <Title level={4} className={styles.input_title}>Password Length</Title>
            <Row style={{justifyContent: "space-between"}}>
              <Col span={12}>
                <Slider
                  min={12}
                  max={32}
                  onChange={(e: number) => { if (e !== null) setInputValue(e); }}
                  value={typeof inputValue === 'number' ? inputValue : 12}
                  style={{ width: "30vw"}}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ margin: '0 16px' }}
                  value={inputValue}
                  onChange={(e) => { if (e !== null) setInputValue(e); }}
                />
              </Col>
            </Row>
            <Checkbox checked={checked} onChange={onCheckBoxChange}>
              Include special characters (e.g. !@#$...)
            </Checkbox>
          </div>
          <div className={styles.outbox}>
            <div className={styles.outfield}>
              {pw}
            </div>
            <div className={styles.button}>
            {
              copied ? (
                <Tooltip title={"Copied!"}>
                  <Button type="primary" shape="round" size='large' icon={<CheckOutlined style={{ fontSize: '17px' }} />}
                    style={{ marginTop: "20px" }} />
                </Tooltip>
              ) : (
                <Tooltip title={"Copy to clipboard"}>
                  <Button type="primary" shape="round" size='large' icon={<CopyOutlined style={{ fontSize: '17px' }} />}
                    style={{ marginTop: "20px" }} onClick={() => copyHandle()} />
                </Tooltip>
                )
              }
            <Tooltip title={"Generate New"}>
              <Button type="primary" shape="round" size='large' icon={<RedoOutlined rotate={rotate} style={{ fontSize: '17px' }} />}
                style={{ marginTop: "20px" }} onClick={() => redoHandle()} />
            </Tooltip>
                </div>
          </div>
        </div>
      </>
    );

  return <div className={styles.loading}><LoadingOutlined style={{ fontSize: "80px" }} /></div>;
}
