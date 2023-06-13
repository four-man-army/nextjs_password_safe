'use client';

import { NavbarOpenContext } from "@/context/NavbarOpen";
import { FC, useContext } from "react";
import { Home, Key, Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { navbarOpen } = useContext(NavbarOpenContext);
  const path = usePathname();
  return (
    <aside
      className={`${
        navbarOpen ? "w-52" : "w-20"
      } bg-blue-950 transition-all duration-300`}
    >
      <div className="flex h-6 m-4 bg-red-500 justify-center relative">
        <Image src="/logo.jpeg" alt="logo" width={24} height={24}/>
      </div>
      <ul className="w-full text-slate-300 text-sm">
        <li className="h-full w-full">
          <Link
            href="/"
            className={`flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all ${
              path === "/" ? "bg-blue-500" : "bg-transparent"
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
          </Link>
        </li>
        <li className="h-full w-full">
          <Link
            href="/safe"
            className={`flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all ${
              path === "/safe" ? "bg-blue-500" : "bg-transparent"
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
          </Link>
        </li>
        <li className="h-full w-full">
          <Link
            href="/generate"
            className={`flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all ${
              path === "/generate" ? "bg-blue-500" : "bg-transparent"
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
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
