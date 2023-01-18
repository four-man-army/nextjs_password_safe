import { Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const { Title } = Typography

export default function Home() {

  const { status, data } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin")
  }, [status])

  if (status === "authenticated")
    return (
      <>
        <div className={styles.title}>

          <Title><HomeOutlined style={{ fontSize: "32px", padding: "10px" }} /> Home</Title>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card} onClick={() => window.location.href = "/safe"}>
            <div className={styles.iconContainer}>
              <img src="/safe.png" alt="safe" className={styles.safe} />
            </div>
            <label className={styles.cardTitle}>Safe</label>
          </div>
          <div className={styles.card} onClick={() => window.location.href = "/generate"}>
          <div className={styles.iconContainer}>
              <img src="/gear.png" alt="safe" className={styles.safe} />
            </div>
            <label className={styles.cardTitle}>Generator</label>
          </div>
        </div>
      </>
    );

  return <div>loading...</div>
}
