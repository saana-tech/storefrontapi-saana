import React, { useCallback, useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import jwt from "jsonwebtoken";

import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Products from "../components/Products";
import Section from "../components/Section";
import Seo from "../components/Seo";
import Container from "../components/Container";
import { useRouter } from "next/router";
import { getUserDispatch, KEY_SECRET } from "../core/auth/actions";
import { StoreContext } from "../core";

export default function HomeToken() {
  const { authDispatch } = useContext(StoreContext);
  const router = useRouter();
  let { token } = router?.query;

  console.log("token", token);
  const GET_COLLECTIONS = gql`
    query collections {
      collections(first: 6) {
        edges {
          node {
            id
            title
            handle
            image {
              originalSrc
            }
          }
        }
      }
    }
  `;
  const {
    data = null,
    loading = false,
    error = null,
  } = useQuery(GET_COLLECTIONS);

  const loginSubscriptionParams = useCallback(() => {
    try {
      if (token) {
        const { id = "" } = jwt.verify(token, KEY_SECRET);
        getUserDispatch(id, authDispatch);
      }
    } catch (error) {
      console.log("error:loginSubscriptionParams", error);
    }
  }, [token]);
  useEffect(() => {
    loginSubscriptionParams();
  }, [loginSubscriptionParams]);

  return (
    <div>
      <Seo />
      <Container>
        <Banner />
        <Collections
          collection={data?.collections?.edges}
          loading={loading}
          error={error}
        />

        {data?.collections?.edges.length > 0 &&
          data?.collections?.edges.map(({ node }) => {
            return (
              <Section key={node.id}>
                <Products title={node.title} handle={node.handle} />
              </Section>
            );
          })}
      </Container>
    </div>
  );
}
