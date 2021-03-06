import React, { useContext, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { StoreContext } from "../../core";
import ModalCart from "../ModalCart";

import NavBar from "../NavBar";
import Footer from "../Footer";
import Whatsapp from "../Whatsapp";
import {
  handleCreateCheckoutDispatch,
  handleGeoLocation,
  setUserDispatch,
} from "../../core/global/actions";
import { checkoutCustomerAssociate } from "../../graphql/gql";

const Layout = ({ children }) => {
  const router = useRouter();
  let { t } = router.query;

  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { showCart, checkout } = globalState;

  const [token, setToken] = useState("");

  const handleToken = () => {
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    handleToken();
  }, [handleToken]);
  const customerTokenQuery = gql`
    query customer {
      customer(customerAccessToken: "${t ? t : token}") {
        email
        displayName
        id
        addresses(first: 5) {
          edges {
            node {
              id
              address1
              city
              country
            }
          }
        }
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
                        src
                      }
                      price
                      sku
                    }
                  }
                }
              }
              id
              currencyCode
              totalTax
              totalPrice
              subtotalPrice
              processedAt
              financialStatus
              fulfillmentStatus
              shippingAddress {
                address1
              }
              orderNumber
            }
          }
        }
        defaultAddress {
          address1
        }
        lastIncompleteCheckout {
          completedAt
          createdAt
          paymentDue
        }
      }
    }
  `;

  const { data = null } = useQuery(customerTokenQuery);
  const [checkoutCustomer] = useMutation(checkoutCustomerAssociate);

  const handleLoginUser = async () => {
    setUserDispatch(data?.customer, globalDispatch);

    try {
      const res = await checkoutCustomer({
        variables: {
          checkoutId: checkout.id,
          customerAccessToken: token,
        },
      });
      const dataCart = res.data.checkoutCustomerAssociate.checkout;
      handleCreateCheckoutDispatch(dataCart, globalDispatch);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    if (data?.customer && checkout.id) {
      handleLoginUser();
    }
  }, [data, checkout?.id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      handleGeoLocation(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        globalDispatch
      );
    });
  }, []);

  return (
    <div>
      {showCart && <ModalCart />}
      <NavBar />
      <div className="container-principal">{children}</div>
      <Whatsapp />

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Layout;
