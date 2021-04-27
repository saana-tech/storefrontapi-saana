import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import styles from "../styles/Collections.module.css";
import CardProduct from "../components/Products/CardProduct";

const Collection = () => {
  const router = useRouter();
  let { handle, title } = router.query;

  const GET_PRODUCTS = gql`
    query {
       collectionByHandle(handle: "${handle}") {
       products(first: 250) {
         
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
    }
  `;
  const { data = null, loading = false } = useQuery(GET_PRODUCTS);
  const products = data?.collectionByHandle?.products?.edges;

  const handleProduct = (product) => {
    router.push({
      pathname: "/Product",
      query: { product: JSON.stringify(product), idProduct: product.id },
    });
  };
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.contentLoading}>
          <Spinner animation="border" role="status" />
          <span>Cargando productos...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.header}>
        <span>Categoría / {title}</span>
        <h2>{title}</h2>
      </div>
      <div>
        <div>
          <Container>
            <Row xs={2} md={5}>
              {products &&
                products.length > 0 &&
                products.map(({ node }) => {
                  const { id, title, images, variants, description } = node;
                  let imageUrl = images.edges[0].node.src;
                  let price = variants.edges[0].node.price;
                  let variantId = variants.edges[0].node.id;

                  return (
                    <Col key={id}>
                      <div style={{ margin: "10px 0" }}>
                        <CardProduct
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
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Collection;
