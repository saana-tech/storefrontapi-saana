import React, { useCallback, useContext, useEffect, useState } from "react";
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
import Notification from "../Notification";
import { AVISO_PRIVACIDAD, TRATAMIENTO_DATOS, TYC } from "../../constants";

const ModalCart = () => {
  const { state, globalDispatch } = useContext(StoreContext);
  const [createCheckout] = useMutation(createCheckoutSchema);

  const { globalState } = state;
  const {
    showCart,
    checkout, // user, modalLogin
  } = globalState;
  const [multiCheck, setMultiCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
  });

  const [disabled, setDisabled] = useState(true);
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

  const handleOnChange = (name, value) => {
    setMultiCheck({ ...multiCheck, [name]: value });
  };

  const handleTyc = useCallback(() => {
    const { check1, check2, check3 } = multiCheck;
    if (check1 && check2 && check3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [multiCheck]);

  useEffect(() => {
    handleTyc();
  }, [handleTyc]);

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

              <span>No tienes ning??n producto en tu carrito</span>
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
              <div>{util.formatCOP(checkout.totalTax)}</div>
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
            {checkout &&
              checkout.lineItems &&
              checkout.lineItems?.edges?.length > 0 && <Notification />}
            <div>
              <div className={styles.tycPay}>
                <input
                  type={"checkbox"}
                  onChange={() => handleOnChange("check1", !multiCheck.check1)}
                  checked={multiCheck.check1}
                />
                <a onClick={() => util.openWebTab(AVISO_PRIVACIDAD)}>
                  He le??do y acepto el aviso de privacidad
                </a>
              </div>
              <div className={styles.tycPay}>
                <input
                  type={"checkbox"}
                  checked={multiCheck.check2}
                  onChange={() => handleOnChange("check2", !multiCheck.check2)}
                />

                <a onClick={() => util.openWebTab(TYC)}>
                  He le??do y Acepto t??rminos y condiciones
                </a>
              </div>

              <div className={styles.tycPay}>
                <input
                  type={"checkbox"}
                  checked={multiCheck.check3}
                  onChange={() => handleOnChange("check3", !multiCheck.check3)}
                />
                <a onClick={() => util.openWebTab(TRATAMIENTO_DATOS)}>
                  He le??do y Acepto pol??tica de tratamiento de datos
                </a>
              </div>
              <button
                disabled={disabled}
                className={disabled ? styles.btnPayDisabled : styles.btnPay}
                onClick={() => goPay()}
              >
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
