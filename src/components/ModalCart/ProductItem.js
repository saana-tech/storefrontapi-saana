import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import { handleCreateCheckoutDispatch } from "../../core/global/actions";
import {
  checkoutLineItemsRemove,
  checkoutLineItemsUpdateSchema,
} from "../../graphql/gql";
import styles from "./ModalCart.module.css";
import { StoreContext } from "../../core";
import util from "../../util";

const ProductItem = ({ product = null }) => {
  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { checkout } = globalState;
  const { variant, quantity } = product;

  const [checkoutLineItemsUpdate] = useMutation(checkoutLineItemsUpdateSchema, {
    context: {
      clientName: "shopify",
    },
  });
  const [checkoutProductRemove] = useMutation(checkoutLineItemsRemove, {
    context: {
      clientName: "shopify",
    },
  });

  const updateProductsCart = async (quantity) => {
    try {
      if (product && product.id) {
        const res = await checkoutLineItemsUpdate({
          variables: {
            checkoutId: checkout.id,
            lineItems: [{ id: product.id, quantity: parseInt(quantity, 10) }],
          },
        });

        const dataCart = res.data.checkoutLineItemsUpdate.checkout;
        handleCreateCheckoutDispatch(dataCart, globalDispatch);
      }
    } catch (error) {
      console.log("error  add product=>", error);
    }
  };

  const removeLineItemInCart = async () => {
    try {
      if (product && product.id) {
        const res = await checkoutProductRemove({
          variables: {
            checkoutId: checkout.id,
            lineItemIds: [product.id],
          },
        });
        const dataCart = res.data.checkoutLineItemsRemove.checkout;
        handleCreateCheckoutDispatch(dataCart, globalDispatch);
      }
    } catch (error) {
      console.log("error =>", error);
    }
  };

  const handleAddCount = () => {
    updateProductsCart(quantity + 1);
  };
  const handleRemoveCount = async () => {
    if (quantity === 1) {
      await removeLineItemInCart();
      return;
    }
    updateProductsCart(quantity - 1);
  };

  return (
    <div className={styles.containerProduct}>
      <div className={styles.containerImg}>
        <img
          src={
            variant?.image?.src
              ? variant.image.src
              : "/static/img/imgDisabled.png"
          }
          alt={product.title}
        />
      </div>
      <div className={styles.contDescription}>
        <h4>{product.title}</h4>
        <h3>{util.formatCOP(variant.price)}</h3>
      </div>
      <div className={styles.handleItems}>
        <div className={styles.btnCounts}>
          <div className={styles.remove} onClick={() => handleRemoveCount()}>
            -
          </div>
          <div>{quantity}</div>
          <div className={styles.add} onClick={() => handleAddCount()}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};
ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
