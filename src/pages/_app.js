// const { default: AbortController } = require('abort-controller');
// const { default: fetch, Headers, Request, Response } = require('node-fetch');

// Object.assign(globalThis, {
//   fetch,
//   Headers,
//   Request,
//   Response,
//   AbortController,
// });

import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import '../styles/global.css';
// const { wrapper } = require("../lib/store");

// export function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default wrapper.withRedux(App);
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
