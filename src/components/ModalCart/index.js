import React, { useContext } from "react";
import styles from "./ModalCart.module.css";
import { StoreContext } from "../../core";
import CloseIcon from "../../../public/static/svg/CloseIcon";
import { handleShowCartDispatch } from "../../core/global/actions";
import ProductItem from "./ProductItem";

const ModalCart = () => {
  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { showCart, checkout } = globalState;

  const handleCloseModal = () => {
    handleShowCartDispatch(!showCart, globalDispatch);
  };

  const goPay = () => {
    window.open(checkout.webUrl);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalRight}>
        <div className={styles.header}>
          <h2>Total de productos</h2>
          <div className={styles.close} onClick={() => handleCloseModal()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.body}>
          {checkout &&
          checkout.lineItems &&
          checkout.lineItems.edges.length > 0 ? (
            checkout.lineItems.edges.map(({ node }) => {
              console.log("item =>", node);
              return <ProductItem key={node.id} product={node} />;
            })
          ) : (
            <div className={styles.msnEmpty}>
              <span className={styles.titleMsn}>Lo siento</span>

              <span>No tienes ningún producto en tu carrito</span>
            </div>
          )}
        </div>
        {checkout.lineItems.edges.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.contItemPay}>
              <div>Subtotal</div>
              <div>{checkout.subtotalPrice}</div>
            </div>{" "}
            <div className={styles.contItemPay}>
              <div>Impuestos</div>
              <div>0</div>
            </div>{" "}
            <div
              className={styles.contItemPay}
              style={{ border: 0, margin: "1rem 0" }}
            >
              <div>Total</div>
              <div className={styles.priceTotal}>{checkout.totalPrice}</div>
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
