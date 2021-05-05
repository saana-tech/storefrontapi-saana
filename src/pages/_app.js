import React from "react";
import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import Layout from "../components/Layout";
import client from "../graphql";
import Store from "../core";

const MyApp = ({ Component, pageProps }) => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    release: "@saanafarma" + process.env.npm_package_version,
  });
  return (
    <ApolloProvider client={client}>
      <Store>
        <Layout>
          {/*   
          
          TEST SENTRY
          <button onClick={() => methodDoesNotExist()}>Break the world</button> */}
          <Component {...pageProps} />
        </Layout>
      </Store>
    </ApolloProvider>
  );
};
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
export default MyApp;
