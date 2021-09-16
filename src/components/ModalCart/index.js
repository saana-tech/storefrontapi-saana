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
import {
  createCheckoutSchema,
  DiscountAutomaticBasic,
} from "../../graphql/gql";
import Notification from "../Notification";
import { AVISO_PRIVACIDAD, TRATAMIENTO_DATOS, TYC } from "../../constants";

const ModalCart = () => {
  const { state, globalDispatch } = useContext(StoreContext);
  const [createCheckout] = useMutation(createCheckoutSchema);
  const [discountAutomaticBasic] = useMutation(DiscountAutomaticBasic);

  const { globalState, packageState } = state;
  const { packages = [] } = packageState;

  const afiliation = packages && packages.length > 0 ? packages[0] : null;
  const {
    showCart,
    checkout, // user, modalLogin
  } = globalState;
  const valid = afiliation?.valid;
  const [multiCheck, setMultiCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
  });

  const [disabled, setDisabled] = useState(true);
  const handleCloseModal = () => {
    handleShowCartDispatch(!showCart, globalDispatch);
  };

  const goPay = async () => {
    /*    if (!user) {
      handleCloseModal();
      showModalLoginDispatch(!modalLogin, globalDispatch);
      return;
    } */

    const url = await handleActiveDiscount();
    if (valid) {
      window.open(url, "_blank");
    } else {
      window.open(checkout.webUrl, "_blank");
    }
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

  const handleActiveDiscount = useCallback(async () => {
    try {
      if (checkout && checkout.id) {
        const { data } = await discountAutomaticBasic({
          variables: { discountCode: "saanafarma", checkoutId: checkout.id },
        });

        const webUrl = data.checkoutDiscountCodeApplyV2.checkout.webUrl;

        return webUrl;
      }
    } catch (error) {
      console.log("error:handleActiveDiscount", error);
    }
  }, []);

  const calculateDiscount = (value, percentage) => {
    const descuento = parseInt(value) * percentage;

    return descuento;
  };
  useEffect(() => {
    handleTyc();
  }, [handleTyc]);
  useEffect(() => {
    handleActiveDiscount();
  }, [handleActiveDiscount]);

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
              <div>{util.formatCOP(checkout.totalTax)}</div>
            </div>
            {valid && (
              <div className={styles.contItemPay}>
                <div>Descuento por afiliado</div>
                <div>5%</div>
              </div>
            )}
            <div
              className={styles.contItemPay}
              style={{ border: 0, margin: "1rem 0" }}
            >
              <div>Total</div>
              <div className={styles.priceTotal}>
                {valid
                  ? util.formatCOP(calculateDiscount(checkout.totalPrice, 0.95))
                  : util.formatCOP(checkout.totalPrice)}
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
                  He leído y acepto el aviso de privacidad
                </a>
              </div>
              <div className={styles.tycPay}>
                <input
                  type={"checkbox"}
                  checked={multiCheck.check2}
                  onChange={() => handleOnChange("check2", !multiCheck.check2)}
                />

                <a onClick={() => util.openWebTab(TYC)}>
                  He leído y Acepto términos y condiciones
                </a>
              </div>

              <div className={styles.tycPay}>
                <input
                  type={"checkbox"}
                  checked={multiCheck.check3}
                  onChange={() => handleOnChange("check3", !multiCheck.check3)}
                />
                <a onClick={() => util.openWebTab(TRATAMIENTO_DATOS)}>
                  He leído y Acepto política de tratamiento de datos
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
