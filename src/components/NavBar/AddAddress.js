import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import styles from "./NavBar.module.css";

import MapContainer from "../MapContainer";
import { StoreContext } from "../../core";
import { handleGeoLocation } from "../../core/global/actions";
import { createAddAddressCustomer } from "../../graphql/gql";

const AddAddress = () => {
  const [address, setAddress] = useState("");
  const [google, setGoogle] = useState(null);
  const { state, globalDispatch } = useContext(StoreContext);
  const { globalState } = state;
  const { coordinates = null } = globalState;

  const [addAddressMutation] = useMutation(createAddAddressCustomer);

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
    console.log("token ==>", token);
    const input = {
      customerAccessToken: token,
      address: {
        address1: address,
        address2: address,
        city: "Bogota",
      },
    };

    try {
      const { data } = await addAddressMutation({ variables: input });
      console.log("data save address", data);
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
          console.log("suggestion =>", suggestion);
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

  useEffect(() => {
    setGoogle(window.google);
  }, []);

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
              address.length > 0
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

export default AddAddress;
