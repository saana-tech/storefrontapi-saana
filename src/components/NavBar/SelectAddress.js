import React, { useState } from "react";
import styles from "./NavBar.module.css";

import ArrowDown from "../../../public/static/svg/ArrowDown";
import PinIcon from "../../../public/static/svg/PinIcon";
const SelectAddress = () => {
  const [showSelect, setShowSelect] = useState(false);
  const listAddress = [];
  return (
    <div className={styles.selectAddress}>
      <div
        className={styles.selectNav}
        onClick={() => setShowSelect(!showSelect)}
      >
        <PinIcon />
        Bogota
        <ArrowDown />
      </div>
      {showSelect && (
        <div className={styles.showSelectAddress}>
          <div className={styles.addressSave}>
            {listAddress.length > 0 ? (
              listAddress.map((address, index) => {
                return <a key={index}>{address}</a>;
              })
            ) : (
              <span>No ahi direcciones</span>
            )}
          </div>
          <div className={styles.separator} />
          <div className={styles.btnAdd}>
            <button>Agregar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectAddress;
