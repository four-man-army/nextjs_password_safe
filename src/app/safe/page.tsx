'use client';

import { Button, Card, Col, Input, Row, Space, Typography, Tooltip } from "antd";
import { DeleteOutlined, LoadingOutlined, CheckOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  EyeOutlined,
  CopyOutlined,
  EyeInvisibleOutlined,
  KeyOutlined
} from "@ant-design/icons";
import { PasswordContext } from "../../context/usePass";
import useStorage from "../../hooks/useStorage";

const { Title, Paragraph } = Typography;

interface ListItem {
  id: number;
  title: string;
  user: string;
  password: string;
}

export default function Home() {
  const [list, setList] = useState<ListItem[]>();
  const [listItem, setListItem] = useState<ListItem>();
  const [adding, setAdding] = useState<boolean>(false);
  const { password } = useContext(PasswordContext);
  const { getItem } = useStorage();
  const CryptoJs = require("crypto-js");
  var key = password === "" ? getItem("pass") : password;


  const deleteHandle = (e: number) => {
    list?.splice(e, 1);
    setList([...list!]);
  };

  useEffect(() => {
    if (list === undefined) return;
    var encrypted = ""
    const secret = JSON.stringify(list);
    encrypted = CryptoJs.AES.encrypt(secret, key).toString();


    fetch("/api/setvault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        vault: encrypted,
        email: "email",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "Vault updated") {
          console.log("Vault updated");
        }
      });
    if (list.length === 0) setList(undefined);
  }, [list])

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/getvault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        email: "email",
      })
    })
      .then((res) => res.text())
      .then((data) => {
        data = data.replace(/"/g, "");
        try {
          const bytes = CryptoJs.AES.decrypt(data, key)
          const decrypted = bytes.toString(CryptoJs.enc.Utf8);
          setList(JSON.parse(decrypted));
        }
        catch {
          console.log("Failed to decrypt")
        }
      })
  })

  

  const Node: React.FC<{ item: ListItem }> = ({ item }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [copy, setCopy] = useState<boolean>(false);
    const copyHandle = (e: number) => {
      navigator.clipboard.writeText(list![e].password);
      setCopy(true);
    };
    useEffect(() => {
      if (copy) {
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      }
    }, [copy]);

    return (
      <Row key={item.id} gutter={48}>
        <Col span={8}>
          <Paragraph>{item.title}</Paragraph>
        </Col>
        <Col span={8}>
          <Paragraph>{item.user}</Paragraph>
        </Col>
        <Col span={8}>
          <span style={{ paddingRight: "10px" }}>{visible ? item.password : "***************"}</span>
          {visible ?
            (
              <Tooltip title={"Hide"}>
                <Button type="link" shape="round" size='small' icon={<EyeInvisibleOutlined style={{ fontSize: '15px' }} onClick={() => setVisible(!visible)} />}
                  style={{ marginLeft: "-10px", position: "absolute" }} />
              </Tooltip>
            ) :
            (
              <Tooltip title={"Show"}>
                <Button type="link" shape="round" size='small' icon={<EyeOutlined style={{ fontSize: '15px' }} onClick={() => setVisible(!visible)} />}
                  style={{ marginLeft: "-10px", position: "absolute" }} />
              </Tooltip>
            )
          }
          {copy ?
            (
              <Tooltip title={"Copied"}>
                <Button type="link" shape="round" size='small' icon={<CheckOutlined style={{ fontSize: '15px' }} />}
                  style={{ marginLeft: "15px", position: "absolute" }} />
              </Tooltip>
            ) :
            (
              <Tooltip title={"Copy"}>
                <Button type="link" shape="round" size='small' icon={<CopyOutlined style={{ fontSize: '15px' }} onClick={() => copyHandle(item.id)} />}
                  style={{ marginLeft: "15px", position: "absolute" }} />
              </Tooltip>
            )
          }
          <Tooltip title={"Delete"}>
            <Button type="link" shape="round" size='small' icon={<DeleteOutlined style={{ fontSize: '15px' }} onClick={() => deleteHandle(item.id)} />}
              style={{ marginLeft: "40px", position: "absolute" }} />
          </Tooltip>
        </Col>
      </Row>
    );
  };
    return (
      <>
        <div><Title><KeyOutlined style={{ fontSize: "32px", padding: "10px" }} />Password Safe</Title></div>
        <div>
          <Space align="center">
            <Card>
              <>
                {(list || adding) && (
                  <Row gutter={48}>
                    <Col span={8}>
                      <Title level={3}>Website</Title>
                    </Col>
                    <Col span={8}>
                      <Title level={3}>Username</Title>
                    </Col>
                    <Col span={8}>
                      <Title level={3}>
                        Password
                      </Title>
                    </Col>
                  </Row>
                )}
                {list?.map((listItem: ListItem) => (
                  <Node key={listItem.id} item={listItem} />
                ))}
                {adding && (
                  <>
                    <Row gutter={48}>
                      <Col span={8}>
                        <Input
                          onChange={(e) => {
                            setListItem({
                              ...listItem,
                              title: e.target.value,
                            } as ListItem);
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <Input
                          onChange={(e) => {
                            setListItem({
                              ...listItem,
                              user: e.target.value,
                            } as ListItem);
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <Input
                          onChange={(e) => {
                            setListItem({
                              ...listItem,
                              password: e.target.value,
                            } as ListItem);
                          }}
                        />
                      </Col>
                    </Row>
                    <div>
                      <Button
                        style={{ marginRight: "1rem" }}
                        type="primary"
                        onClick={() => {
                          setAdding(false);
                          if (list === undefined || list.length === 0)
                            setList([{ ...listItem, id: 0 }] as ListItem[]);
                          else
                            setList([
                              ...list,
                              { ...listItem, id: list[list.length - 1].id + 1 } as ListItem,
                            ] as ListItem[]);
                        }}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setAdding(false)}>Cancel</Button>
                    </div>
                  </>
                )}
                {!adding && (
                  <Button
                    onClick={() => {
                      setAdding(true);
                    }}
                    type="primary"
                  >
                    + Add
                  </Button>
                )}
              </>
            </Card>
          </Space>
        </div>
      </>
    );
}



