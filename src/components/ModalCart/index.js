import React, { useCallback, useContext } from "react";
import { useMutation } from "@apollo/client";

import util from "../../util";
import styles from "./ModalCart.module.css";
import { StoreContext } from "../../core";
import CloseIcon from "../../../public/static/svg/CloseIcon";
import {
  handleCreateCheckoutDispatch,
  handleShowCartDispatch,
  //showModalLoginDispatch,
} from "../../core/global/actions";
import ProductItem from "./ProductItem";
import { createCheckoutSchema } from "../../graphql/gql";

const ModalCart = () => {
  const { state, globalDispatch } = useContext(StoreContext);
  const [createCheckout] = useMutation(createCheckoutSchema);

  const { globalState } = state;
  const {
    showCart,
    checkout, // user, modalLogin
  } = globalState;

  const handleCloseModal = () => {
    handleShowCartDispatch(!showCart, globalDispatch);
  };

  const goPay = () => {
    /*    if (!user) {
      handleCloseModal();
      showModalLoginDispatch(!modalLogin, globalDispatch);
      return;
    } */
    window.open(checkout.webUrl);
    handleCreateCheckout();
  };

  const handleCreateCheckout = useCallback(async () => {
    try {
      const res = await createCheckout({
        variables: {
          input: {},
        },
      });
      const dataCart = res.data.checkoutCreate.checkout;

      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error create checkout =>", error);
    }
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalRight}>
        <div className={styles.header}>
          <h2>Carrito de compras</h2>
          <div className={styles.close} onClick={() => handleCloseModal()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.body}>
          {checkout &&
          checkout.lineItems &&
          checkout.lineItems?.edges?.length > 0 ? (
            checkout.lineItems?.edges.map(({ node }) => {
              return <ProductItem key={node.id} product={node} />;
            })
          ) : (
            <div className={styles.msnEmpty}>
              <span className={styles.titleMsn}>Lo sentimos</span>

              <span>No tienes ningún producto en tu carrito</span>
            </div>
          )}
        </div>
        {checkout && checkout.lineItems && checkout.lineItems.edges.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.contItemPay}>
              <div>Subtotal</div>
              <div>{util.formatCOP(checkout.subtotalPrice)}</div>
            </div>{" "}
            <div className={styles.contItemPay}>
              <div>Impuestos</div>
              <div>{util.formatCOP(0)}</div>
            </div>
            <div
              className={styles.contItemPay}
              style={{ border: 0, margin: "1rem 0" }}
            >
              <div>Total</div>
              <div className={styles.priceTotal}>
                {util.formatCOP(checkout.totalPrice)}
              </div>
            </div>
            <div>
              <button className={styles.btnPay} onClick={() => goPay()}>
                Ir a pagar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCart;
