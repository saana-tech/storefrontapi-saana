import React from "react";
import Router from "next/router";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { motion } from "framer-motion";

import NProgress from "nprogress"; //nprogress module

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";

import "../styles/globals.css";

import Layout from "../components/Layout";
import client from "../graphql";
import Store from "../core";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, router }) => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    release: "@saanafarma" + process.env.npm_package_version,
  });
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Store>
        <Layout>
          {/*   
          
          TEST SENTRY
          <button onClick={() => methodDoesNotExist()}>Break the world</button> */}
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
            }}
            key={router.route}
          >
            <Component {...pageProps} />
          </motion.div>
        </Layout>
      </Store>
    </ApolloProvider>
  );
};
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  router: PropTypes.object,
};
export default MyApp;
