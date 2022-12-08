import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from './layout'
import RootHead from './head'
import React, { useLayoutEffect, useState } from 'react'
import Login from '../components/login'
import useStorage from '../hooks/useStorage'

export default function App({ Component, pageProps }: AppProps) {
  const [login, setLogin] = useState(false)
  const [render, setRender] = useState(false)
  const { getItem } = useStorage()

  useLayoutEffect(() => {
    if (getItem('login') === 'true') {
      setLogin(true)
    }
    setRender(true)
  }, [])

  return (
    render &&
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