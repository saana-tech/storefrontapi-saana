import React from "react";
import { ApolloProvider } from "@apollo/client";

import "normalize.css";
import "../styles/globals.css";

import Layout from "../components/Layout";
import client from "../graphql";
import Store from "../core";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Store>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Store>
    </ApolloProvider>
  );
}

export default MyApp;
