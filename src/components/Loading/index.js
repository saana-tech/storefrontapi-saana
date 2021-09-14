import React from "react";
import { LOGO } from "../../constants";
import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <img className={styles.logoImage} src={LOGO} alt={"Saanafarma logo"} />
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
