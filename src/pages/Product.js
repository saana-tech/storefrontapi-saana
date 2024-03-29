import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { StoreContext } from "../core";
import {
  handleCreateCheckoutDispatch,
  handleShowCartDispatch,
} from "../core/global/actions";

import styles from "../styles/Product.module.css";
import { checkoutLineItemsAdd } from "../graphql/gql";
import util from "../util";
import Seo from "../components/Seo";
import ProductsTag from "../components/ProductsTag";
import Container from "../components/Container";

const Product = () => {
  const [checkoutItemsAdd] = useMutation(checkoutLineItemsAdd, {
    context: {
      clientName: "shopify",
    },
  });
  const router = useRouter();

  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { checkout, showCart } = globalState;

  const [productSelect, setProductSelect] = useState(null);
  let { product } = router.query;

  const handleAddProduct = async () => {
    try {
      const res = await checkoutItemsAdd({
        variables: {
          checkoutId: checkout.id
            ? checkout.id
            : "Z2lkOi8vc2hvcGlmeS9DaGVja291dC82Y2ZkMGZiZTdlYzMwMTliMGNmMzU1NDFjZmUzZTYxOT9rZXk9YjA4Zjk4NjhkYTZiZTI1MDZmYzg1YThiNzUzNzc2OTg=",
          lineItems: [
            { variantId: productSelect.variantId, quantity: parseInt(1, 10) },
          ],
        },
      });
      const dataCart = res.data.checkoutLineItemsAdd.checkout;
      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error add product =>", error);
    }
    handleShowCartDispatch(!showCart, globalDispatch);
  };

  useEffect(() => {
    const productFilter = product ? JSON.parse(product) : null;
    setProductSelect(productFilter);
  }, [router.query]);

  return (
    <>
      {productSelect && (
        <>
          <Seo
            title={productSelect.title}
            description={productSelect.description}
          />
          <Container>
            <div className={styles.headerProduct}>
              <div className={styles.col1}>
                <img src={productSelect.imageUrl} alt={productSelect.title} />
                <img src={productSelect.imageUrl} alt={productSelect.title} />
                <img src={productSelect.imageUrl} alt={productSelect.title} />
              </div>
              <div className={styles.col2}>
                <img src={productSelect.imageUrl} alt={productSelect.title} />
              </div>
              <div className={styles.col3}>
                <h2 className={styles.title}>{productSelect.title}</h2>
                <span className={styles.sku}>Sku {productSelect.sku}</span>

                <h3 className={styles.price}>
                  {util.formatCOP(productSelect.price)}
                </h3>

                <button
                  className={styles.btnAdd}
                  type={"button"}
                  onClick={() => handleAddProduct()}
                >
                  Agregar al carrito
                </button>
                <h3 className={styles.titleInformation}>
                  Información nutricional
                </h3>
                <p className={styles.description}>
                  {productSelect.description}
                </p>
              </div>
            </div>
            <ProductsTag
              title={"También recomendamos"}
              tag1={
                productSelect?.tags && productSelect?.tags.length > 0
                  ? productSelect?.tags[0]
                  : ""
              }
              tag2={
                productSelect?.tags && productSelect?.tags.length > 1
                  ? productSelect?.tags[0]
                  : ""
              }
              idCurrentProduct={productSelect?.variantId}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Product;
