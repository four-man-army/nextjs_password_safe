import { Button, Card, Col, Input, Row, Space, Typography, Tooltip } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import styles from "../styles/Safe.module.css";
import {
  EyeOutlined,
  CopyOutlined,
  EyeInvisibleOutlined,
  KeyOutlined
} from "@ant-design/icons";
import { PasswordContext } from "../context/usePass";
import useStorage from "../hooks/useStorage";

const { Title, Paragraph } = Typography;

interface ListItem {
  id: number;
  title: string;
  user: string;
  password: string;
}

export default function Home() {
  const { status, data } = useSession();
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
        email: data?.user?.email,
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
        email: data?.user?.email,
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
        catch{
          console.log("Failed to decrypt")
        }
      })
  }, [status])

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  const Node: React.FC<{ item: ListItem }> = ({ item }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
      <Row className={styles.row} key={item.id} gutter={48}>
        <Col span={8}>
          <Paragraph>{item.title}</Paragraph>
        </Col>
        <Col span={8}>
          <Paragraph>{item.user}</Paragraph>
        </Col>
        <Col span={8}>
          <Paragraph
            className={!visible ? styles.hide : styles.show}
            copyable={{
              icon: visible
                ? [<EyeInvisibleOutlined key={1} />, <CopyOutlined key={2} />]
                : [<EyeOutlined key={1} />, <EyeOutlined key={2} />],
              onCopy: () => {
                setVisible(!visible);
                if (visible)
                  navigator.clipboard.writeText(item.password as string);
              },
              tooltips: visible ? ["Hide", "Copied!"] : ["Show", "Hidden"],
            }}
          >
            <span style={{ paddingRight: "10px" }}>{visible ? item.password : "***************"}</span>
            <Tooltip title={"Delete"}>
              <Button type="link" shape="round" size='small' icon={<DeleteOutlined style={{ fontSize: '15px' }} onClick={() => deleteHandle(item.id)} />}
                style={{ marginLeft: "20px", position: "absolute" }} />
            </Tooltip>
          </Paragraph>
        </Col>
      </Row>
    );
  };

  if (status === "authenticated")
    return (
      <>
        <div className={styles.title}><Title><KeyOutlined style={{ fontSize: "32px", padding: "10px" }} />Password Safe</Title></div>
        <div className={styles.container}>
          <Space align="center" className={styles.paper}>
            <Card className={styles.card}>
              <>
                {(list || adding) && (
                  <Row className={styles.row} gutter={48}>
                    <Col span={8}>
                      <Title level={3}>Website</Title>
                    </Col>
                    <Col span={8}>
                      <Title level={3}>Username</Title>
                    </Col>
                    <Col span={8}>
                      <Title className={styles.show} level={3}>
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
                    <Row className={styles.row} gutter={48}>
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
                    <div className={styles.button}>
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
                    className={list || adding ? styles.button : styles.add}
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

  return <div className={styles.loading}><LoadingOutlined style={{fontSize: "80px"}}/></div>;
}



