import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from './layout'
import RootHead from './head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <RootHead />
      <Component {...pageProps} />
    </RootLayout>
  )
}
