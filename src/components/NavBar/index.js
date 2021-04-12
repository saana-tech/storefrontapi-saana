import React, { useCallback, useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import CartIcon from "../../../public/static/svg/CartIcon";
import SearchIcon from "../../../public/static/svg/SearchIcon";
import IconMenuBar from "../../../public/static/svg/IconMenuBar";

import { LOGO } from "../../constants";
import styles from "./NavBar.module.css";
import { StoreContext } from "../../core";
import {
  handleCreateCheckoutDispatch,
  handleShowCartDispatch,
} from "../../core/global/actions";
import { CheckoutFragment } from "../../graphql/gql";
import Modal from "../Modal";
import FormLogin from "../FormLogin";
import SelectServices from "./SelectServices";
import SelectAddress from "./SelectAddress";

const NavBar = () => {
  const { state, globalDispatch } = useContext(StoreContext);
  const createCheckoutSchema = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
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

  const [createCheckout] = useMutation(createCheckoutSchema);

  const { globalState } = state;
  const { showCart, checkout } = globalState;

  const router = useRouter();
  const GET_COLLECTIONS = gql`
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
  const [valueSearch, setValueSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { data = null, loading = false, error = null } = useQuery(
    GET_COLLECTIONS
  );
  console.log("loading => ", loading);
  console.log("error => ", error);
  const handleOpenCart = () => {
    handleShowCartDispatch(!showCart, globalDispatch);
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

  useEffect(() => {
    handleCreateCheckout();
  }, [handleCreateCheckout]);

  return (
    <>
      <div className={styles.containerNav}>
        <header className={styles.header}>
          <nav className={styles.navPrincipal}>
            <div>
              <img
                className={styles.logoImage}
                src={LOGO}
                alt={"Saanafarma logo"}
                onClick={() => router.push("/")}
              />
            </div>
            <div className={styles.inputSearchProducts}>
              <input
                className={styles.inputSearch}
                type={"text"}
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder={"Buscar producto"}
              />
              <div className={styles.iconSearch}>
                <SearchIcon />
              </div>
            </div>
            <SelectAddress />
            <SelectServices />
            <div className={styles.btnSearchResponsive}>
              <button>
                <SearchIcon />
              </button>
            </div>
            <div className={styles.contCart} onClick={() => handleOpenCart()}>
              {checkout.lineItems.edges.length > 0 && (
                <div className={styles.badge}>
                  {checkout.lineItems.edges.length}
                </div>
              )}
              <CartIcon />
            </div>
            <div className={styles.iconBar}>
              <IconMenuBar />
            </div>
            <div className={styles.buttonLogin}>
              <button onClick={() => setShowModal(true)}>Iniciar sesión</button>
            </div>
          </nav>

          {/* CATEGORY */}
        </header>
        <div className={styles.containerCollection}>
          <ul>
            {data &&
              data?.collections?.edges.map(({ node }, index) => {
                const { title } = node;
                return (
                  <li key={index}>
                    <a>{title}</a>
                  </li>
                );
              })}
          </ul>
          <div className={styles.shadow} />
        </div>
      </div>
      <Modal open={showModal} close={setShowModal}>
        <FormLogin />
      </Modal>
    </>
  );
};

export default NavBar;
