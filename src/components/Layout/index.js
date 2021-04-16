import React, { useContext, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import PropTypes from "prop-types";
import { StoreContext } from "../../core";
import ModalCart from "../ModalCart";

import NavBar from "../NavBar";
import Footer from "../Footer";
import {
  handleCreateCheckoutDispatch,
  setUserDispatch,
} from "../../core/global/actions";
import { checkoutCustomerAssociate } from "../../graphql/gql";

const Layout = ({ children }) => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { showCart, checkout, user } = globalState;

  const { globalDispatch } = useContext(StoreContext);
  const [token, setToken] = useState("");

  const handleToken = () => {
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    handleToken();
  }, [handleToken]);

  const customerTokenQuery = gql`{
  customer(customerAccessToken: "${token}") {
    email
    displayName
    id
    orders(first: 5) {
      edges {
        node {
          lineItems(first: 5) {
            edges {
              node {
                quantity
                title
                variant {
                  image {
                    transformedSrc
                  }
                  price
                }
              }
            }
          }
          id
        }
      }
    }
  }
}


`;
  const { data = null, loading = null, error = null } = useQuery(
    customerTokenQuery
  );
  const [checkoutCustomer] = useMutation(checkoutCustomerAssociate);

  const handleLoginUser = async () => {
    setUserDispatch(data?.customer, globalDispatch);

    try {
      console.log("checkout id =>", checkout);
      const res = await checkoutCustomer({
        variables: {
          checkoutId: checkout.id,
          customerAccessToken: token,
        },
      });
      const dataCart = res.data.checkoutCustomerAssociate.checkout;
      console.log("Data cart =>", res);
      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    if (data?.customer && checkout.id) {
      handleLoginUser();
    }
  }, [data, checkout.id]);
  console.log("user =>", user);
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
