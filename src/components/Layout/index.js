import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "../../core";
import ModalCart from "../ModalCart";

import NavBar from "../NavBar";
import Footer from "../Footer";

const Layout = ({ children }) => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { showCart } = globalState;
  return (
    <div>
      {showCart && <ModalCart />}
      <NavBar />

      <div className="container-principal">{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
