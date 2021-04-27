import React, { useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import styles from "../Products/Products.module.css";
import ArrowLeft from "../../../public/static/svg/ArrowLeft";
import ArrowRight from "../../../public/static/svg/ArrowRight";
import CardProduct from "../Products/CardProduct";
import { Fragment } from "react";

const ProductsTag = ({
  title = "Ofertas",
  limit = 10,
  tag1 = "",
  tag2 = "",
  idCurrentProduct = "",
}) => {
  const router = useRouter();
  const collectionRef = useRef(null);

  const GET_PRODUCTS = gql`
    query {
       products(first: ${limit}, query: "tag:${tag1} AND tag:${tag2}"){
         
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
            }
          }
        }
    }
  `;
  const { data = null } = useQuery(GET_PRODUCTS);
  let products = data?.products?.edges;

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
  console.log("products =>", products);

  return (
    <>
      {products && products.length > 1 && (
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
                const { id, title, images, variants, description } = node;
                let imageUrl = images.edges[0].node.src;
                let price = variants.edges[0].node.price;
                let variantId = variants.edges[0].node.id;

                return (
                  <Fragment key={id}>
                    {idCurrentProduct.includes(variantId) ? null : (
                      <CardProduct
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
                    )}
                  </Fragment>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
ProductsTag.propTypes = {
  title: PropTypes.string,
  tag1: PropTypes.string,
  tag2: PropTypes.string,
  extend: PropTypes.bool,
  handle: PropTypes.string,
  limit: PropTypes.number,
  idCurrentProduct: PropTypes.string,
};

export default ProductsTag;
