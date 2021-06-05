import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import {
  ChakraProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={undefined}
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          media="print"
          onLoad={"this.media='all'" as any}
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </noscript>
      </Head>
      <ToastContainer />
      <ChakraProvider theme={theme}>
        <ColorModeProvider options={{ initialColorMode: 'dark', useSystemColorMode: true }}>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
