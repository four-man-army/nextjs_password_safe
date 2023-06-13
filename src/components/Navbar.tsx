"use client";

import { NavbarOpenContext } from "@/context/NavbarOpen";
import { FC, useContext } from "react";
import { Home, Key, Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { navbarOpen } = useContext(NavbarOpenContext);
  const path = usePathname();
  return (
    <aside
      className={cn("bg-blue-950 transition-all duration-300 w-20", {
        "w-52": navbarOpen,
      })}
    >
      <div className="flex h-6 m-4 bg-red-500 justify-center relative">
        <Image src="/logo.jpeg" alt="logo" width={24} height={24} />
      </div>
      <ul className="w-full text-slate-300 text-sm">
        <li className="h-full w-full">
          <Link
            href="/"
            className={cn(
              "flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all bg-transparent",
              {
                "bg-blue-500": path === "/",
              }
            )}
          >
            <span className="flex">
              <Home className="w-4 my-auto" />
            </span>
            <span
              className={cn(
                "overflow-hidden truncate transition-all duration-300 h-fit my-auto w-0 flex-shrink",
                {
                  "w-full": navbarOpen,
                }
              )}
            >
              Home
            </span>
          </Link>
        </li>
        <li className="h-full w-full">
          <Link
            href="/safe"
            className={cn(
              "flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all bg-transparent",
              {
                "bg-blue-500": path === "/safe",
              }
            )}
          >
            <span className="flex">
              <Key className="w-4 my-auto" />
            </span>
            <span
              className={cn(
                "overflow-hidden truncate transition-all duration-300 h-fit my-auto w-0 flex-shrink",
                {
                  "w-full": navbarOpen,
                }
              )}
            >
              Password Safe
            </span>
          </Link>
        </li>
        <li className="h-full w-full">
          <Link
            href="/generate"
            className={cn(
              "flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all bg-transparent",
              {
                "bg-blue-500": path === "/generate",
              }
            )}
          >
            <span className="flex">
              <Bot className="w-4 my-auto" />
            </span>
            <span
              className={cn(
                "overflow-hidden truncate transition-all duration-300 h-fit my-auto w-0 flex-shrink",
                {
                  "w-full": navbarOpen,
                }
              )}
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
