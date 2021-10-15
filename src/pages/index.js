import React from "react";
import { gql, useQuery } from "@apollo/client";

import Banner from "../components/Banner";
import Collections from "../components/Collections";
import Products from "../components/Products";
import Section from "../components/Section";
import Seo from "../components/Seo";
import Container from "../components/Container";

export default function Home() {
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
  } = useQuery(GET_COLLECTIONS, {
    context: {
      clientName: "shopify",
    },
  });
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
