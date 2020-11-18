import Router from "next/router";
import NProgress from "nprogress";

import { AppProps } from "next/app";
import Layout from "../components/Layout";

import "nprogress/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
