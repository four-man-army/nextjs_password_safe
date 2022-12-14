import { Typography } from "antd";
import Link from "next/link";

const { Title } = Typography

export default function Home() {

  return (
    <>
      <Title>Home</Title>
      <Link href="/safe">Password Safe</Link>
    </>
  );
}
