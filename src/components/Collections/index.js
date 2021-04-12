import React, { useRef } from "react";
import { gql, useQuery } from "@apollo/client";

import styles from "./Collections.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";
import ArrowRight from "../../../public/static/svg/ArrowRight";
import LoadingCollections from "./LoadingColletions";

const Collections = () => {
  const collectionRef = useRef(null);
  const GET_COLLECTIONS = gql`
    {
      shop {
        collections(first: 10) {
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
          pageInfo {
            hasNextPage
          }
        }
      }
    }
  `;
  const { data = null, loading = false, error = null } = useQuery(
    GET_COLLECTIONS
  );

  const handleDirection = (direction) => {
    if (direction === "left") {
      collectionRef ? (collectionRef.current.scrollLeft -= 200) : null;
    } else {
      collectionRef ? (collectionRef.current.scrollLeft += 200) : null;
    }
  };
  if (error) {
    return (
      <div>
        <h2>Ocurrió algo inesperado</h2>
      </div>
    );
  }
  return (
    <div className={styles.containerCollection}>
      <div className={styles.header}>
        <h2>Categorías</h2>
        <div className={styles.buttonsDirections}>
          <button
            className={styles.buttonArrow}
            onClick={() => handleDirection("left")}
          >
            <ArrowLeft />
          </button>
          <button
            className={styles.buttonArrow}
            onClick={() => handleDirection("right")}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingCollections />
      ) : (
        <div className={styles.containerCard}>
          <div className={styles.cards} ref={collectionRef}>
            {data &&
              data?.shop?.collections?.edges?.map(({ node }, index) => {
                const { title, image } = node;
                let imageUrl = image.originalSrc;
                return (
                  <div
                    key={index}
                    className={styles.card}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <h4>{title}</h4>
                    <img />
                  </div>
                );
              })}
          </div>
          <div className={styles.shadowRight} />
        </div>
      )}
    </div>
  );
};

export default Collections;
