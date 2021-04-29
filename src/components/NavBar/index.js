import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

import { StoreContext } from "../../core";
import { LOGO } from "../../constants";
import styles from "./NavBar.module.css";

import CartIcon from "../../../public/static/svg/CartIcon";
//import SearchIcon from "../../../public/static/svg/SearchIcon";
import IconMenuBar from "../../../public/static/svg/IconMenuBar";
import IconUser from "../../../public/static/svg/IconUser";

import {
  handleCreateCheckoutDispatch,
  handleShowCartDispatch,
  showModalLoginDispatch,
} from "../../core/global/actions";
import { createCheckoutSchema, GET_COLLECTIONS } from "../../graphql/gql";
import Modal from "../Modal";
import FormLogin from "../FormLogin";
import SelectServices from "./SelectServices";
import SelectAddress from "./SelectAddress";
import MenuResponsive from "../MenuResponsive";
import Search from "./Search";
import ModalSearchResponsive from "./ModalSearchResponsive";

const NavBar = () => {
  const { state, globalDispatch } = useContext(StoreContext);
  const [createCheckout] = useMutation(createCheckoutSchema);

  const { globalState } = state;
  const { showCart, checkout, user, modalLogin } = globalState;

  const router = useRouter();

  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { data = null } = useQuery(GET_COLLECTIONS);

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

  const closeMenuResponsive = () => {
    setShowNav(false);
  };
  const setShowModal = (bool) => {
    showModalLoginDispatch(bool, globalDispatch);
  };
  const handleProductsCategory = (handle, title) => {
    router.push({
      pathname: "/Collection",
      query: { handle, title },
    });
  };

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
            <div className="separatorNav" />
            <div className={styles.contentSelectAddress}>
              <SelectAddress />
            </div>

            <SelectServices />
            {/*    <div className={styles.btnSearchResponsive}>
                <button onClick={() => setShowSearch(true)}>
                  <SearchIcon />
                </button>
              </div> */}
            <div className={styles.contCart} onClick={() => handleOpenCart()}>
              {checkout &&
                checkout.lineItems &&
                checkout.lineItems.edges.length > 0 && (
                  <div className={styles.badge}>
                    {checkout.lineItems.edges.length}
                  </div>
                )}
              <CartIcon />
            </div>
            <div className={styles.iconBar} onClick={() => setShowNav(true)}>
              <IconMenuBar />
            </div>
            <div className={styles.buttonLogin}>
              {user ? (
                <span onClick={() => router.push("/Profile")}>
                  <IconUser /> {user.displayName}
                </span>
              ) : (
                <button onClick={() => setShowModal(true)}>
                  Iniciar sesión
                </button>
              )}
            </div>
          </nav>

          {/* CATEGORY */}
        </header>
        <Search />

        <div className={styles.containerCollection}>
          <ul>
            {data &&
              data?.collections?.edges.map(({ node }, index) => {
                const { title } = node;
                return (
                  <li key={index}>
                    <a
                      onClick={() =>
                        handleProductsCategory(node.handle, node.title)
                      }
                    >
                      {title}
                    </a>
                  </li>
                );
              })}
          </ul>
          <div className={styles.shadow} />
        </div>
      </div>

      <Modal open={modalLogin} close={setShowModal}>
        <FormLogin close={() => setShowModal(false)} />
      </Modal>
      <MenuResponsive
        open={showNav}
        close={closeMenuResponsive}
        openModalRegister={setShowModal}
      />
      <ModalSearchResponsive open={showSearch} close={setShowSearch} />
    </>
  );
};

export default NavBar;
