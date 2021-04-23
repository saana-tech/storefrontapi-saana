import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
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
  const addresses = user?.addresses?.edges;
  const defaultAddress = user?.defaultAddress?.address1;
  const [selectAddressSelect] = useMutation(selectAddressDefault);

  const handleDefaultAddAddress = async (id) => {
    const token = localStorage.getItem("token");

    const input = {
      customerAccessToken: token,
      addressId: id,
    };
    try {
      const { data } = await selectAddressSelect({ variables: input });
      console.log("select address =>", data);
    } catch (error) {
      console.log("error:handleDefaultAddAddress=>", error);
    }
  };
  return (
    <>
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
                    <a key={index} onClick={() => handleDefaultAddAddress()}>
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
        <AddAddress />
      </Modal>
    </>
  );
};

export default SelectAddress;
