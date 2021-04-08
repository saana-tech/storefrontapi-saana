import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

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
  let products = data?.shop?.products?.edges;

  const handleProduct = (product) => {
    router.push({
      pathname: "/Product",
      query: { product: JSON.stringify(product) },
    });
  };
  return (
    <div className={styles.containerProducts}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>
      <div className={styles.contentProducts}>
        {products &&
          products.map(({ node }) => {
            console.log("product =>", node);
            const { id, title, images, variants, description } = node;
            let imageUrl = images.edges[0].node.src;
            let price = variants.edges[0].node.price;
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

export default Products;
