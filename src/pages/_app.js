import React from "react";
import { ApolloProvider } from "@apollo/client";

import "normalize.css";
import "../styles/globals.css";

import Layout from "../components/Layout";
import client from "../graphql";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
