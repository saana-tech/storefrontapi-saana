import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import SearchIcon from "../../../public/static/svg/SearchIcon";
import CloseIcon from "../../../public/static/svg/CloseIcon";
import styles from "./NavBar.module.css";
import util from "../../util";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");

  const clearInput = () => {
    setValueSearch("");
  };

  const handleProduct = (product) => {
    clearInput();
    router.push({
      pathname: "/Product",
      query: { product: JSON.stringify(product) },
    });
  };

  const QUERY_PRODUCT = gql`  {
  products(query: "title: ${valueSearch}", first: 10) {
    edges {
      node {
        id
        title
        description
        images(first: 10) {
          edges {
            node {
              src
              originalSrc
            }
          }
        }
         variants(first: 5) {
          edges {
            node {
              id
              price
            }
          }
        }
      }
    }
  }
}`;
  const { data = null, loading = false, error = null } = useQuery(
    QUERY_PRODUCT
  );

  console.log("loading =>", loading);
  console.log("error =>", error);
  return (
    <div className={styles.containerSearch}>
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
      {!loading && valueSearch.length > 0 && data?.products?.edges.length > 0 && (
        <>
          <div className={styles.iconClose} onClick={() => clearInput()}>
            <CloseIcon />
          </div>
          <div className={styles.contResult}>
            {data?.products?.edges &&
              data?.products?.edges.map(({ node }, index) => {
                const { description, title, images, variants } = node;
                const imageUrl = images.edges[0].node.src;
                const price = variants.edges[0].node.price;
                const id = variants.edges[0].node.id;
                return (
                  <div
                    key={index}
                    className={styles.productSearch}
                    onClick={() =>
                      handleProduct({
                        imageUrl,
                        price,
                        variantId: id,
                        title,
                        description,
                        id,
                      })
                    }
                  >
                    <div className={styles.contImgSearch}>
                      <img src={imageUrl} alt={title} />
                    </div>
                    <div className={styles.informationSearch}>
                      <span className={styles.titleSearch}>{title}</span>
                      <span className={styles.priceSearch}>
                        {util.formatCOP(price)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
