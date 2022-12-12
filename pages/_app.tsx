import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from './layout'
import RootHead from './head'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <SessionProvider session={pageProps.session}>
      <RootHead />
        <RootLayout>
          <RootHead />
          <Component {...pageProps} />
        </RootLayout>
      </SessionProvider>
    </>
    );
}