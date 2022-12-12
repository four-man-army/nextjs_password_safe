import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from './layout'
import RootHead from './head'
import React, { useEffect, useState } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import Router from 'next/router'

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