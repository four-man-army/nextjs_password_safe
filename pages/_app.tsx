import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from './layout'
import RootHead from './head'
import React, { useState } from 'react'
import Login from '../components/login'

export default function App({ Component, pageProps }: AppProps) {
  const [login, setLogin] = useState(false)

  return (
    <>
      <RootHead />
      {login ? (
        <RootLayout>
          <RootHead />
          <Component {...pageProps} />
        </RootLayout>
      ) : (
        <Login login={login} setLogin={setLogin}  />
      )}
    </>
  );
}