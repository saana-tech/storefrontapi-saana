import React, { useState } from "react";
import { LOGO } from "../../constants";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [valueSearch, setValueSearch] = useState("");

  return (
    <header id="header">
      <nav className={styles.navPrincipal}>
        <div className="container-logo-nav">
          <img
            className={styles.logoImage}
            src={LOGO}
            alt={"Saanafarma logo"}
          />
        </div>
        <div className="input-search-products">
          <input
            type={"text"}
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
