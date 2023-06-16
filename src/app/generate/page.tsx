'use client';

import { genPw } from '@/lib/utils';
import { CheckOutlined, CopyOutlined, RedoOutlined, RobotOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, InputNumber, Row, Slider, Tooltip, Typography } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';

const { Title } = Typography;

export default function Home() {
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
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);



    return (
      <>
        <div><Title><RobotOutlined style={{ fontSize: "32px", padding: "10px" }} />Generate Password</Title></div>
        <div>
          <div>
            <Title>Password Length</Title>
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
          <div>
            <div>
              {pw}
            </div>
            <div>
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
}
