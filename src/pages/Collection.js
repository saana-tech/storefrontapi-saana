import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import styles from "../styles/Collections.module.css";
import CardProduct from "../components/Products/CardProduct";
import Seo from "../components/Seo";
import util from "../util";

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
      <Seo title={title} />
      <Container>
        <div className={styles.header}>
          <span>Categoría / {util.capitalize(title)}</span>
          <h2>{util.capitalize(title)}</h2>
        </div>
        <div>
          <div>
            <Row xs={2} md={3} xl={4}>
              {products &&
                products.length > 0 &&
                products.map(({ node }) => {
                  const { id, title, images, variants, description } = node;
                  let imageUrl = images.edges[0].node.src;
                  let price = variants.edges[0].node.price;
                  let variantId = variants.edges[0].node.id;
                  let sku = variants.edges[0].node.sku;

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
                            sku,
                          }}
                          handleProduct={handleProduct}
                        />
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collection;
