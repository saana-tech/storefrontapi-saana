import React, { useState } from "react";
import ArrowDown from "../../../public/static/svg/ArrowDown";
import IconService from "../../../public/static/svg/IconService";
import styles from "./NavBar.module.css";

const SelectServices = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.selectServices}>
      <div
        className={(styles.selectNav, styles.servicesInput)}
        onClick={() => setShow(!show)}
      >
        <IconService />
        Más Servicios
        <ArrowDown />
      </div>
      {show && (
        <div className={styles.selectContent}>
          <a>Saana lab</a> <a>Saana consulta</a>{" "}
        </div>
      )}
    </div>
  );
};

export default SelectServices;
