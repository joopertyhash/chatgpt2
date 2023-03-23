import type { AppProps } from 'next/app'
import Script from 'next/script'
import '@vercel/examples-ui/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { useEffect } from "react";
import * as gtag from "./utils/ga"
import { useRouter } from 'next/router'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const router = useRouter();

  useEffect(() => {
      const handleRouteChange = (url: URL) => {
          gtag.pageview(url);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
      };
  }, [router.events]);

  const GA_TRACKING_ID = "G-ZNHV1G0GH8"
  return <div> 
     <Script
                async
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script id="afterInteractive" strategy='afterInteractive'>
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
    {getLayout(<Component {...pageProps} />)}</div>
}

export default App
