import { ReactNode } from "react";
import React from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import NavbarToggle from "@/components/NavbarToggle";
import { Metadata } from "next";
import "./globals.css"

export const MetaData: Metadata = {
  title: "Home",
  description: "Home page",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className="h-screen">
            <section className="flex flex-row h-full">
              <Navbar />
              <section className="flex flex-col w-full bg-slate-100">
                <header className="h-16 bg-white">
                  <NavbarToggle />
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
