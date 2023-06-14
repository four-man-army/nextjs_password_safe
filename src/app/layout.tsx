import { ReactNode } from "react";
import React from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import NavbarToggle from "@/components/NavbarToggle";
import { Metadata } from "next";
import "./globals.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = {
  title: "Password Safe",
  description: "Home page",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
  }) {
  
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className="h-screen">
            <section className="flex flex-row h-full">
              <Navbar />
              <section className="flex flex-col w-full bg-slate-100">
                <header className="h-16 bg-white flex flex-row">
                  <NavbarToggle />
                  <div className="ml-auto p-2 flex flex-row">
                    {!session?.user ? (
                      <div className="my-auto mr-4">
                        <a
                          href="/login"
                          className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                        >                 
                          Login
                        </a>
                      </div>
                    ) : (
                      <div className="mx-6 mt-auto flex items-center">
                        <div className="flex flex-1 items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900">
                          <div className="relative h-8 w-8">
                            <Image
                              fill
                              referrerPolicy="no-referrer"
                              className="rounded-full"
                              src={session.user.image || ""}
                              alt="Your profile picture"
                            />
                          </div>

                          <span className="sr-only">Your profile</span>
                          <div className="flex flex-col">
                            <span aria-hidden="true">{session.user.name}</span>
                            <span
                              className="text-xs text-gray-500"
                              aria-hidden="true"
                            >
                              {session.user.email}
                            </span>
                          </div>
                        </div>

                        <SignOutButton className="h-full aspect-square" />
                      </div>
                    )}
                  </div>
                </header>
                <main className="my-6 mx-4 p-6 h-full bg-white">
                  {children}
                </main>
              </section>
            </section>
          </div>
        </body>
      </Providers>
    </html>
  );
}
