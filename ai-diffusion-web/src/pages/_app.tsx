import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";


import { Bai_Jamjuree } from 'next/font/google';
 
 const bai = Bai_Jamjuree({ 
  subsets: ['latin'] ,
  weight: ["400","600","700"],
  variable: '--font-bai',
 });


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={bai.className}>
      <Head>
        <link rel="shortcut icon" href="/logo-square.ico" />
      </Head>
      <Component {...pageProps} />
    </main>
  )
}
