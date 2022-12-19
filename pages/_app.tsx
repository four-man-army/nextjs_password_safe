import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from './layout'
import RootHead from './head'
import React from 'react'
import { SessionProvider, useSession } from "next-auth/react";
import { NextComponentType } from "next";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <RootHead />
        {Component.auth ? (
          <Auth>
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </Auth>
        ) : (
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        )}
      </SessionProvider>
    </>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "unauthenticated") return <>loading...</>;
  return <>{children}</>;
}