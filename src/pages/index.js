import React from "react";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const GET_PRODUCTS = gql`
    query query {
      shop {
        name
        description
        products(first: 20) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              options {
                id
                name
                values
              }
              variants(first: 250) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  node {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      src
                    }
                    price
                  }
                }
              }
              images(first: 250) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  node {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data = null, loading = false, error = null } = useQuery(GET_PRODUCTS);
  console.log("data products => ", data?.shop?.products?.edges);
  console.log("loading => ", loading);
  console.log("error => ", error);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
