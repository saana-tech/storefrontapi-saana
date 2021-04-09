import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import styles from "./Products.module.css";

const Products = ({ title = "Ofertas" }) => {
  const router = useRouter();
  const GET_PRODUCTS = gql`
    query query {
      shop {
        name
        description
        products(first: 250) {
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

  console.log("products =>", data);
  return (
    <div className={styles.containerProducts}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>
      <div className={styles.contentProducts}>
        {products &&
          products.map(({ node }) => {
            const { id, title, images, variants, description } = node;
            let imageUrl = images.edges[0].node.src;
            let price = variants.edges[0].node.price;
            let variantId = variants.edges[0].node.id;

            return (
              <div key={id} className={styles.cardProduct}>
                <img src={imageUrl} alt={title} />
                <div className={styles.body}>
                  <h4 className={styles.title}>{title}</h4>
                  <p className={styles.description}>{description}</p>
                  <h3 className={styles.price}>${price}</h3>
                </div>
                <button
                  type={"button"}
                  onClick={() =>
                    handleProduct({
                      imageUrl,
                      price,
                      title,
                      id,
                      description,
                      variantId,
                    })
                  }
                >
                  AGREGAR
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
Products.propTypes = {
  title: PropTypes.string,
};

export default Products;
