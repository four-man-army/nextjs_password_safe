import { Typography } from "antd";
import { useSession } from "next-auth/react";
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
      <Title>Home</Title>
    </>
    );
  
  return <div>loading...</div>
}
