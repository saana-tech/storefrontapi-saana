import React, { useContext } from "react";
import { useRouter } from "next/router";
import Rating from "react-rating";
import { gql, useMutation } from "@apollo/client";

import { StoreContext } from "../core";
import {
  handleCreateCheckoutDispatch,
  handleShowCartDispatch,
} from "../core/global/actions";

import styles from "../styles/Product.module.css";
import { CheckoutFragment } from "../graphql/gql";
import util from "../util";
import Products from "../components/Products";
import Seo from "../components/Seo";
import IconStart from "../../public/static/svg/IconStart";
import IconEmpty from "../../public/static/svg/IconEmpty";

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
    try {
      const res = await checkoutItemsAdd({
        variables: {
          checkoutId: checkout.id,
          lineItems: [{ variantId, quantity: parseInt(1, 10) }],
        },
      });
      const dataCart = res.data.checkoutLineItemsAdd.checkout;
      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error add product =>", error);
    }
    handleShowCartDispatch(!showCart, globalDispatch);
  };
  console.log("variantId =>", variantId);
  return (
    <>
      <Seo title={title} description={description} />
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
            <Rating
              initialRating={5}
              fullSymbol={<IconStart />}
              emptySymbol={<IconEmpty />}
            />
            <span className={styles.visits}>232 Visitas</span>
          </div>
          <h3 className={styles.price}>{util.formatCOP(price)}</h3>

          <button
            className={styles.btnAdd}
            type={"button"}
            onClick={() => handleAddProduct()}
          >
            Agregar al carrito
          </button>
          <h3 className={styles.titleInformation}>Información nutritional</h3>
          <p>{description}</p>
        </div>
      </div>
      <Products title={"También te puede interesar"} extend={false} />
      <Products title={"Otros productos"} extend={false} />
    </>
  );
};

export default Product;
