import React, { useContext } from "react";
import { useRouter } from "next/router";
import Rating from "react-rating";

import { StoreContext } from "../core";
import {
  handleCreateCheckoutDispatch,
  handleShowCartDispatch,
} from "../core/global/actions";

import styles from "../styles/Product.module.css";
import { gql, useMutation } from "@apollo/client";
import { CheckoutFragment } from "../graphql/gql";

const Product = () => {
  const checkoutLineItemsAdd = gql`
    mutation checkoutLineItemsAdd(
      $checkoutId: ID!
      $lineItems: [CheckoutLineItemInput!]!
    ) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        userErrors {
          message
          field
        }
        checkout {
          ...CheckoutFragment
        }
      }
    }
    ${CheckoutFragment}
  `;
  const [checkoutItemsAdd] = useMutation(checkoutLineItemsAdd);
  const router = useRouter();

  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { checkout, showCart } = globalState;
  let { product } = router.query;

  const productSelect = product ? JSON.parse(product) : null;
  const { title, price, description, imageUrl, variantId } = productSelect;

  const handleAddProduct = async () => {
    /*     const totalCart = [
      ...cart,
      Object.assign(productSelect, {
        count: 1,
      }),
    ];
    await handleAddCartDispatch(totalCart, globalDispatch); */

    try {
      const res = await checkoutItemsAdd({
        variables: {
          checkoutId: checkout.id,
          lineItems: [{ variantId, quantity: parseInt(1, 10) }],
        },
      });
      const dataCart = res.data.checkoutLineItemsAdd.checkout;
      console.log("datacart ==>", dataCart);
      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error add product =>", error);
    }
    handleShowCartDispatch(!showCart, globalDispatch);
  };
  return (
    <div className="container">
      <div className={styles.headerProduct}>
        <div className={styles.col1}>
          <img src={imageUrl} alt={title} /> <img src={imageUrl} alt={title} />
          <img src={imageUrl} alt={title} /> <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.col2}>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.col3}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.containerRating}>
            <Rating initialRating={5} />
            <span className={styles.visits}>232 Visitas</span>
          </div>
          <h3 className={styles.price}>${price}</h3>

          <button
            className={styles.btnAdd}
            type={"button"}
            onClick={() => handleAddProduct()}
          >
            Agregar al carrito
          </button>
          <h3 className={styles.titleInformation}>Información nutricional</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
