import React from "react";
import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";

import "normalize.css";
import "../styles/globals.css";

import Layout from "../components/Layout";
import client from "../graphql";
import Store from "../core";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Store>
        <Layout>
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
