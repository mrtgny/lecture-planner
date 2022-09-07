import GoogleAnalytics from 'components/GoogleAnalytics';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from "react-redux";
import store from 'redux/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Lecture Schedule</title>
          <meta
            name="viewport"
            content={`user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, viewport-fit=cover`}
          />
        </Head>
        <Component {...pageProps} />
        <GoogleAnalytics gaId="G-2Z1NZC792R" />
      </Provider>
    </>
  )
}

export default MyApp
