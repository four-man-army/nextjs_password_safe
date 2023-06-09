import { ReactNode } from "react";
import React from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {

  return (
    <Providers>
      <div className="h-screen">
        <section className="flex flex-row h-full">
          <Navbar />
          <section className="flex flex-col w-full bg-slate-100">
            <header className="h-16 bg-white"></header>
            <main className="my-6 mx-4 p-6 h-full bg-white">{children}</main>
          </section>
        </section>
      </div>
    </Providers>
  );
}
