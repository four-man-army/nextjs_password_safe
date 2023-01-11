import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import styles from "../styles/Safe.module.css";
import {
  EyeOutlined,
  CopyOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { PasswordContext } from "../context/usePass";

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
  const CryptoJs = require("crypto-js");
  const crypto = require("crypto");

  const uploadSafe = () => {
    const key = crypto
      .createHash("sha512")
      .update(password, "utf-8")
      .digest("hex");
    const secret = JSON.stringify(list);
    var encrypted = CryptoJs.AES.encrypt(secret, key).toString();

    fetch("/api/vault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        vault: encrypted,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "Vault updated") {
          console.log("Vault updated");
        }
      });
  };


  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <Title>Password Safe</Title>
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
                          if (list === undefined)
                            setList([{ ...listItem, id: 0 }] as ListItem[]);
                          else
                            setList([
                              ...list,
                              { ...listItem, id: list.length } as ListItem,
                            ] as ListItem[]);
                          uploadSafe();
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

  return <div>loading...</div>;
}

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
          {visible ? item.password : "********"}
        </Paragraph>
      </Col>
    </Row>
  );
};
