import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import '../styles/global.css';
import { wrapper } from '../store/store';
import AbortController from 'abort-controller';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { FC } from 'react';

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
