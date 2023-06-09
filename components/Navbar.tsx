import { NavbarOpenContext } from "@/context/NavbarOpen";
import { FC, useContext } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { navbarOpen } = useContext(NavbarOpenContext);
  return (
    <aside className={`${navbarOpen ? "w-52" : "w-20"} bg-blue-950 transition-all duration-300`}></aside>
  );
};

export default Navbar;
