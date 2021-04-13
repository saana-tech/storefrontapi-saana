import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import SearchIcon from "../../../public/static/svg/SearchIcon";
import styles from "./NavBar.module.css";

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");
  /*   const SEARCH_PRODUCT = gql`
    {
      products(query: ${valueSearch}, first: 5) {
        edges {
          node {
            id
            title
            description
          }
        }
      }
    }
  `;

  const { data = null, loading = false, error = null } = useQuery(
    SEARCH_PRODUCT
  );

  console.log("search products =>", data); */

  return (
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
  );
};

export default Search;
