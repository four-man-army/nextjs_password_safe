"use client";

import { NavbarOpenContext } from "@/context/NavbarOpen";
import { FC, useContext, useEffect, useState } from "react";
import { Home, Key, Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { navbarOpen, setNavbarOpen } = useContext(NavbarOpenContext);
  const [ width, setWidth ] = useState(0);
  const path = usePathname();

  useEffect(() => {
    setWidth(window.innerWidth);
   }, [])

  return (
    <>
      {width < 640 && (
        <div
          onClick={() => setNavbarOpen(false)}
          className={cn(
            "absolute z-40 top-0 left-0 w-screen h-screen transition-all duration-300 backdrop-blur-sm",
            {
              hidden: !navbarOpen,
            },
          )}
        />
      )}
      <aside
        className={cn(
          "bg-blue-950 transition-all z-50 duration-300 sm:w-20 w-0 fixed sm:relative h-full",
          {
            "w-52 sm:w-52": navbarOpen,
          },
        )}
      >
        <div className="flex h-6 m-4 bg-red-500 justify-center relative">
          <Image src="/logo.jpg" alt="logo" width={24} height={24} />
        </div>
        <ul className={cn("w-full text-slate-300 text-sm overflow-hidden")}>
          <li className="h-full w-full">
            <Link
              href="/"
              className={cn(
                "flex m-1 px-6 gap-2 justify-end h-10 rounded-lg hover:text-white transition-all bg-transparent",
                {
                  "bg-blue-500": path === "/",
                },
              )}
              onClick={() => width < 640 && setNavbarOpen(false)}
            >
              <span className="flex">
                <Home className="w-4 my-auto" />
              </span>
              <span
                className={cn(
                  "overflow-hidden truncate transition-all duration-300 h-fit my-auto w-0 flex-shrink",
                  {
                    "w-full": navbarOpen,
                  },
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
                },
              )}
              onClick={() => width < 640 && setNavbarOpen(false)}
            >
              <span className="flex">
                <Key className="w-4 my-auto" />
              </span>
              <span
                className={cn(
                  "overflow-hidden truncate transition-all duration-300 h-fit my-auto w-0 flex-shrink",
                  {
                    "w-full": navbarOpen,
                  },
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
                },
              )}
              onClick={() => width < 640 && setNavbarOpen(false)}
            >
              <span className="flex">
                <Bot className="w-4 my-auto" />
              </span>
              <span
                className={cn(
                  "overflow-hidden truncate transition-all duration-300 h-fit my-auto w-0 flex-shrink",
                  {
                    "w-full": navbarOpen,
                  },
                )}
              >
                Password Genrator
              </span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
