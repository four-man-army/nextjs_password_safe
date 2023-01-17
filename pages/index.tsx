import { Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";

const { Title } = Typography

export default function Home() {

  const { status, data } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin")
  }, [status])

  if (status === "authenticated")
    return (
      <>
        <div className="title">
          
          <Title><HomeOutlined style={{fontSize:"32px", padding:"10px"}}/> Home</Title>
        </div>
        <Link href="/safe">Password Safe</Link><br />
        <Link href="/generate">Password Generator</Link>
      </>
    );

  return <div>loading...</div>
}
