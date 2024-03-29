import Navbar from "@/components/Navbar";
import NavbarToggle from "@/components/NavbarToggle";
import Providers from "@/components/Providers";
import SignOutButton from "@/components/SignOutButton";
import { buttonVariants } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { constructMetadata } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import { GeistSans, GeistMono } from "geist/font";

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>
          <div className="h-screen max-h-screen overflow-hidden">
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
                          className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                          })}
                        >
                          Login
                        </a>
                      </div>
                    ) : (
                      <div className="mx-6 mt-auto flex items-center">
                        <div className="flex flex-1 items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900">
                          <div className="relative h-8 w-8">
                            <Image
                              width={32}
                              height={32}
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
                <main className="my-6 mx-4 p-6 h-full bg-white overflow-auto">
                  {children}
                </main>
              </section>
            </section>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
