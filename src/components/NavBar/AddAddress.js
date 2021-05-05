import React, { useContext, useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import PropTypes from "prop-types";

import styles from "./NavBar.module.css";

import MapContainer from "../MapContainer";
import { StoreContext } from "../../core";
import { handleGeoLocation } from "../../core/global/actions";
import { createAddAddressCustomer } from "../../graphql/gql";

const AddAddress = ({ close }) => {
  const [address, setAddress] = useState("");
  const [google, setGoogle] = useState(null);
  const [token, setToken] = useState("");
  const [valueSearch, setValueSearch] = useState("");

  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { coordinates = null } = globalState;
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

  const [addAddressMutation] = useMutation(
    createAddAddressCustomer,

    {
      update(cache, { data: { customerAddressCreate } }) {
        let currentCustomer;
        const { customer } = cache.readQuery({
          query: customerTokenQuery,
          variables: {
            input: {
              customerAccessToken: token,
            },
          },
        });
        currentCustomer = customer;

        const newAddress = customerAddressCreate.customerAddress;
        const newAddressArray = newAddress
          ? [...customer.addresses.edges, newAddress]
          : [newAddress];
        currentCustomer = {
          ...customer,
          addresses: {
            edges: newAddressArray,
            __typename: "MailingAddressConnection",
          },
        };

        cache.writeQuery({
          query: customerTokenQuery,
          variables: {
            input: {
              customerAccessToken: token,
            },
          },
          data: {
            customer: currentCustomer,
          },
        });
      },
    }
  );

  const searchOptions = {
    location:
      coordinates &&
      google &&
      new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
    radius: 20000,
    types: ["address"],
  };
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((res) => {
        handleGeoLocation(
          {
            latitude: res.lat,
            longitude: res.lng,
          },
          globalDispatch
        );
      })
      .catch((error) => console.error("Error", error));
  };
  const handleSaveAddress = async () => {
    const token = localStorage.getItem("token");
    const input = {
      customerAccessToken: token,
      address: {
        address1: address,
        address2: address,
        city: "Bogota",
      },
    };

    try {
      await addAddressMutation({ variables: input });
      close(false);
    } catch (error) {
      console.log("error address =>", error);
    }
  };

  const renderFunc = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) => (
    <div className="autocomplete-root">
      <label id={"input-auto"}>Escribe tu dirección</label>
      <input
        {...getInputProps()}
        className={styles.inputAutocomplete}
        htmlFor={"input-auto"}
        placeholder={"Ex: Carrera 12 #34-56 Bogotá, D.C"}
      />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Buscando...</div>}
        {suggestions.map((suggestion, index) => {
          return (
            <div
              {...getSuggestionItemProps(suggestion)}
              key={index}
              className={styles.contentSearch}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
  const handleToken = () => {
    setToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    setGoogle(window.google);
  }, []);
  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <div className={styles.containerAddAddress}>
      <div className={styles.contAutocomplete}>
        <h2 className={styles.title}>¿A donde llevamos tu pedido?</h2>
        {coordinates ? (
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            searchOptions={searchOptions}
            onSelect={handleSelect}
          >
            {renderFunc}
          </PlacesAutocomplete>
        ) : (
          <div>
            <label id={"input-auto"}>Escribe tu dirección</label>
            <input
              className={styles.inputAutocomplete}
              htmlFor={"input-auto"}
              placeholder={"Ex: Carrera 12 #34-56 Bogotá, D.C"}
              onChange={(e) => setValueSearch(e.target.value)}
            />
          </div>
        )}

        <div className={styles.badgeInformation}>
          {coordinates ? (
            <span>
              Verifica tu dirección en el mapa sea la correcta, nos ayuda a ser
              mas precisos en tu entrega
            </span>
          ) : (
            <span>
              Le recomendamos aceptar el uso del gps para una mayor experiencia
            </span>
          )}
        </div>
        <div>
          <button
            onClick={() => handleSaveAddress()}
            disabled={address.length > 0 ? false : true}
            type={"button"}
            className={
              coordinates
                ? address.length > 0
                  ? styles.btnCompleteButton
                  : styles.disabledButton
                : valueSearch.length > 0
                ? styles.btnCompleteButton
                : styles.disabledButton
            }
          >
            Confirmar
          </button>
        </div>
      </div>

      <div className={styles.containerMaps}>
        <MapContainer />
      </div>
    </div>
  );
};
AddAddress.propTypes = {
  close: PropTypes.func,
};

export default AddAddress;
