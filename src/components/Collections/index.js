import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import styles from "./Collections.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";
import ArrowRight from "../../../public/static/svg/ArrowRight";
import LoadingCollections from "./LoadingColletions";

const Collections = ({ collection = [], error = null, loading = false }) => {
  const router = useRouter();
  const collectionRef = useRef(null);

  const handleDirection = (direction) => {
    if (direction === "left") {
      collectionRef ? (collectionRef.current.scrollLeft -= 200) : null;
    } else {
      collectionRef ? (collectionRef.current.scrollLeft += 200) : null;
    }
  };

  const handleProductsCategory = (handle, title) => {
    router.push({
      pathname: "/Collection",
      query: { handle, title },
    });
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
            {collection &&
              collection.length > 0 &&
              collection.map(({ node }, index) => {
                const { title = "", image = "" } = node;
                let imageUrl = image?.originalSrc;
                return (
                  <div
                    key={index}
                    className={styles.card}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    onClick={() =>
                      handleProductsCategory(node.handle, node.title)
                    }
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
Collections.propTypes = {
  collection: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default Collections;
