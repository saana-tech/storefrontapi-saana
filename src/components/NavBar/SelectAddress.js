import React, { useContext, useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";

import ArrowDown from "../../../public/static/svg/ArrowDown";
import PinIcon from "../../../public/static/svg/PinIcon";
import Modal from "../Modal";
import AddAddress from "./AddAddress";
import { StoreContext } from "../../core";
import { selectAddressDefault } from "../../graphql/gql";

const SelectAddress = () => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { user = null } = globalState;

  const [showSelect, setShowSelect] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [token, setToken] = useState("");

  const addresses = user?.addresses?.edges;
  const defaultAddress = user?.defaultAddress?.address1;

  const customerTokenQuery = gql`
    query customer {
      customer(customerAccessToken: "${token}") {
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

  const [selectAddressSelect] = useMutation(selectAddressDefault, {
    update(cache) {
      const { customer } = cache.readQuery({
        query: customerTokenQuery,
        variables: {
          input: {
            customerAccessToken: token,
          },
        },
      });

      cache.writeQuery({
        query: customerTokenQuery,
        variables: {
          input: {
            customerAccessToken: token,
          },
        },
        data: {
          customer,
        },
      });
    },
  });

  const handleDefaultAddAddress = async (id) => {
    const token = localStorage.getItem("token");
    const input = {
      customerAccessToken: token,
      addressId: id,
    };
    try {
      await selectAddressSelect({ variables: input });
      setShowSelect(false);
    } catch (error) {
      console.log("error:handleDefaultAddAddress=>", error);
    }
  };
  const handleToken = () => {
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    handleToken();
  }, [handleToken]);
  return (
    <>
      <div className={styles.iconAddress}>
        <button type={"button"} onClick={() => setShowSelect(!showSelect)}>
          <PinIcon />
        </button>
      </div>
      <div className={styles.selectAddress}>
        <div
          className={styles.selectNav}
          onClick={() => setShowSelect(!showSelect)}
        >
          <PinIcon />
          <span className={styles.defaultAddress}>
            {defaultAddress ? defaultAddress : "Bogota"}
          </span>
          <ArrowDown />
        </div>
        {showSelect && (
          <div className={styles.showSelectAddress}>
            <div className={styles.addressSave}>
              {addresses && addresses.length > 0 ? (
                addresses.map(({ node }, index) => {
                  return (
                    <a
                      key={index}
                      onClick={() => handleDefaultAddAddress(node.id)}
                    >
                      {node.address1}
                    </a>
                  );
                })
              ) : (
                <span>No ahi direcciones</span>
              )}
            </div>
            <div className={styles.separator} />
            <div className={styles.btnAdd}>
              <button type={"button"} onClick={() => setShowMaps(true)}>
                Agregar
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal open={showMaps} close={setShowMaps}>
        <AddAddress close={setShowMaps} />
      </Modal>
    </>
  );
};
SelectAddress.propTypes = {
  visible: PropTypes.bool,
};

export default SelectAddress;
