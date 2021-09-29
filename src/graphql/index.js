import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

if (!process.browser) {
  global.fetch = fetch;
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HTTP_LINK,
});

const httpLinkSaana = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_SAANA,
});

const saanaLink = setContext((_, { headers }) => {
  const tokenAuth = localStorage.getItem("token");
  const token = process.env.NEXT_PUBLIC_SERVER_SAANA_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: token,
      ["x-token"]: tokenAuth ? `Bearer ${tokenAuth}` : "",
    },
  };
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN,
    },
  };
});

const saanaLinkUnion = saanaLink.concat(httpLinkSaana);
const shopifyLinkUnion = authLink.concat(httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "shopify",
    shopifyLinkUnion,
    saanaLinkUnion
  ),
});

export default client;
