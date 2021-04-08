import React from "react";
import { gql, useQuery } from "@apollo/client";

import styles from "./Collections.module.css";

const Collections = () => {
  const GET_COLLECTIONS = gql`
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
  const { data = null, loading = false, error = null } = useQuery(
    GET_COLLECTIONS
  );
  console.log("data collections ====>", data);
  return (
    <div className={styles.containerCollection}>
      <div>
        <h2>Categorías</h2>
      </div>
      <div className={styles.cards}>
        {data &&
          data?.collections?.edges.map(({ node }, index) => {
            const { title } = node;
            return (
              <div key={index} className={styles.card}>
                <h4>{title}</h4>
                <img />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Collections;
