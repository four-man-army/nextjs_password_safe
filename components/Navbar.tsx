import { NavbarOpenContext } from "@/context/NavbarOpen";
import { FC, useContext } from "react";
import { Home, Key, Bot } from "lucide-react";
import { useRouter } from "next/router";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { navbarOpen } = useContext(NavbarOpenContext);
  const router = useRouter();
  return (
    <aside
      className={`${
        navbarOpen ? "w-52" : "w-20"
      } bg-blue-950 transition-all duration-300`}
    >
      <div className="flex h-6 m-4 bg-red-500 justify-center">
        <img src="/logo.jpeg" alt="" />
      </div>
      <ul className="w-full text-slate-300 text-sm">
        <li className="h-full w-full">
          <a
            href="/"
            className={`flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all ${
              router.pathname === "/" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <span className="flex">
              <Home className="w-4 my-auto" />
            </span>
            <span
              className={`${
                navbarOpen ? "w-full" : "w-0 flex-shrink"
              } overflow-hidden truncate transition-all duration-300 h-fit my-auto`}
            >
              Home
            </span>
          </a>
        </li>
        <li className="h-full w-full">
          <a
            href="/safe"
            className={`flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all ${
              router.pathname === "/safe" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <span className="flex">
              <Key className="w-4 my-auto" />
            </span>
            <span
              className={`${
                navbarOpen ? "w-full" : "w-0 flex-shrink"
              } overflow-hidden truncate transition-all duration-300 h-fit my-auto`}
            >
              Password Safe
            </span>
          </a>
        </li>
        <li className="h-full w-full">
          <a
            href="/generate"
            className={`flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all ${
              router.pathname === "/generate" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <span className="flex">
              <Bot className="w-4 my-auto" />
            </span>
            <span
              className={`${
                navbarOpen ? "w-full" : "w-0 flex-shrink"
              } overflow-hidden truncate transition-all duration-300 h-fit my-auto`}
            >
              Password Genrator
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
