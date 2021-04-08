import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import ArrowDown from "../../../public/static/svg/ArrowDown";
import CartIcon from "../../../public/static/svg/CartIcon";
import PinIcon from "../../../public/static/svg/PinIcon";
import SearchIcon from "../../../public/static/svg/SearchIcon";
import { LOGO } from "../../constants";
import styles from "./NavBar.module.css";
import IconService from "../../../public/static/svg/IconService";

const NavBar = () => {
  const GET_COLLECTIONS = gql`
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
  const [valueSearch, setValueSearch] = useState("");
  const { data = null, loading = false, error = null } = useQuery(
    GET_COLLECTIONS
  );
  console.log("loading => ", loading);
  console.log("error => ", error);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navPrincipal}>
          <div>
            <img
              className={styles.logoImage}
              src={LOGO}
              alt={"Saanafarma logo"}
            />
          </div>
          <div className={styles.inputSearchProducts}>
            <input
              className={styles.inputSearch}
              type={"text"}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              placeholder={"Buscar producto"}
            />
            <div className={styles.iconSearch}>
              <SearchIcon />
            </div>
          </div>
          <div className={styles.selectNav}>
            <PinIcon />
            Bogota
            <ArrowDown />
          </div>{" "}
          <div className={styles.selectNav}>
            <IconService />
            Más Servicios
            <ArrowDown />
          </div>
          <div className={styles.contCart}>
            <CartIcon />
          </div>
          <div className={styles.buttonLogin}>
            <button>Iniciar sesión</button>
          </div>
        </nav>

        {/* CATEGORY */}
      </header>
      <div className={styles.containerCollection}>
        <ul>
          {data &&
            data?.collections?.edges.map(({ node }, index) => {
              const { title } = node;
              return (
                <li key={index}>
                  <a>{title}</a>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
