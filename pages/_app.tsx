import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { preventZoom } from "utils/functions";
import "../styles/globals.css";
import { GoogleAnalytics } from "@reactivers/next-ga";
import { OGHead } from "@reactivers/next-og";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return preventZoom();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Lecture Planner | Murat Güney</title>
          <meta
            name="viewport"
            content={`user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height, viewport-fit=cover`}
          />
        </Head>
        <OGHead
          title="Lecture Planner | Murat Güney"
          description="A simple lecture planner app!"
          url={`https://lecture-planner.appysode.com`}
          image="https://mgshort.link/sOBYmEbb0R"
        />
        <Component {...pageProps} />
        <GoogleAnalytics gaId="G-2Z1NZC792R" />
      </Provider>
    </>
  );
}

export default MyApp;
