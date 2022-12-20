import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "ferrer@mail.com",
            password: "1234",
            })
        }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
  return (
    <>
      <Title>Password Safe</Title>
      
      
    </>
  );
}
