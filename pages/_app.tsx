import GoogleAnalytics from "components/GoogleAnalytics";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { preventZoom } from "utils/functions";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return preventZoom();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Lecture Planner</title>
          <meta
            name="viewport"
            content={`user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height, viewport-fit=cover`}
          />
        </Head>
        <Component {...pageProps} />
        <GoogleAnalytics gaId="G-2Z1NZC792R" />
      </Provider>
    </>
  );
}

export default MyApp;
