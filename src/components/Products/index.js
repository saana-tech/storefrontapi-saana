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
  handle = "",
  limit = 10,
}) => {
  const router = useRouter();
  const collectionRef = useRef(null);

  const GET_PRODUCTS = gql`
    query collectionByHandle {
      collectionByHandle(handle: "${handle}") {
        products(first: ${limit}) {
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
                edges {
                  node {
                    src
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `;
  const { data = null } = useQuery(GET_PRODUCTS);
  let products = data?.collectionByHandle?.products?.edges;

  const handleProduct = (product) => {
    router.push({
      pathname: "/Product",
      query: { product: JSON.stringify(product), idProduct: product.id },
    });
  };
  const handleDirection = (direction) => {
    if (direction === "left") {
      collectionRef ? (collectionRef.current.scrollLeft -= 200) : null;
    } else {
      collectionRef ? (collectionRef.current.scrollLeft += 200) : null;
    }
  };
  const handleProductsCategory = () => {
    router.push({
      pathname: "/Collection",
      query: { handle, title },
    });
  };

  return (
    <div className={styles.containerProducts}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
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
          products.map(({ node }, index) => {
            console.log("node product tag =>", node);
            const { id, title, images, variants, description } = node;
            let imageUrl = images.edges[0].node.src;
            let price = variants.edges[0].node.price;
            let variantId = variants.edges[0].node.id;

            return (
              <CardProduct
                key={id}
                lastProduct={products.length}
                index={index}
                product={{
                  imageUrl,
                  price,
                  variantId,
                  title,
                  description,
                  id,
                  tags: node.tags,
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
              <button type={"button"} onClick={() => handleProductsCategory()}>
                Ver mas
              </button>
            </div>
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
  handle: PropTypes.string,
  limit: PropTypes.number,
};

export default Products;
