import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'bulma/css/bulma.min.css';
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'rodal/lib/rodal.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
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
