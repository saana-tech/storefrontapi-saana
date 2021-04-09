import React, { useContext } from "react";
import { StoreContext } from "../../core";
import ModalCart from "../ModalCart";

import NavBar from "../NavBar";

const Layout = ({ children }) => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { showCart } = globalState;
  return (
    <div>
      {showCart && <ModalCart />}
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
