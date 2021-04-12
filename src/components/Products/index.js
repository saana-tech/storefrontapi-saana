import React, { useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import styles from "./Products.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";
import ArrowRight from "../../../public/static/svg/ArrowRight";
import CardProduct from "./CardProduct";
import IconCategory from "../../../public/static/svg/IconCategory";

const Products = ({
  title = "Ofertas",
  extend = true,
  tag1 = "jarabe",
  tag2 = "Oral",
}) => {
  const router = useRouter();
  const collectionRef = useRef(null);
  console.log("tag1 =>", tag1);
  console.log("tag2 =>", tag2);

  /*products(first: 10, query: "tag:${tag1} AND tag:${tag2}") { */

  const GET_PRODUCTS = gql`
    query GetProductsByTag {
      shop {
        name
        description
        products(first: 10) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              description
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
  console.log(loading, error);
  let products = data?.shop?.products?.edges;

  const handleProduct = (product) => {
    router.push({
      pathname: "/Product",
      query: { product: JSON.stringify(product) },
    });
  };
  const handleDirection = (direction) => {
    if (direction === "left") {
      collectionRef ? (collectionRef.current.scrollLeft -= 200) : null;
    } else {
      collectionRef ? (collectionRef.current.scrollLeft += 200) : null;
    }
  };

  console.log("products =>", data);
  return (
    <div className={styles.containerProducts}>
      <div className={styles.header}>
        <h2>{title}</h2>
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
      <div className={styles.contentProducts} ref={collectionRef}>
        {products &&
          products.map(({ node }) => {
            const { id, title, images, variants, description } = node;
            let imageUrl = images.edges[0].node.src;
            let price = variants.edges[0].node.price;
            let variantId = variants.edges[0].node.id;

            return (
              <CardProduct
                key={id}
                product={{
                  imageUrl,
                  price,
                  variantId,
                  title,
                  description,
                  id,
                }}
                handleProduct={handleProduct}
              />
            );
          })}
        {extend && (
          <>
            <div className={styles.cardShowCategory}>
              <div className={styles.iconCategory}>
                <IconCategory />
              </div>

              <span>Quieres ver todos los productos de </span>
              <h4>{title}</h4>
              <button>Ver mas</button>
            </div>
            <div className={styles.shadowRight} />
          </>
        )}
      </div>
    </div>
  );
};
Products.propTypes = {
  title: PropTypes.string,
  tag1: PropTypes.string,
  tag2: PropTypes.string,
  extend: PropTypes.bool,
};

export default Products;
