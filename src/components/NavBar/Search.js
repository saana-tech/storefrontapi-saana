import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";

import SearchIcon from "../../../public/static/svg/SearchIcon";
import CloseIcon from "../../../public/static/svg/CloseIcon";
import styles from "./NavBar.module.css";
import util from "../../util";
import { useRouter } from "next/router";
import { handleSaveSearch } from "../../core/global/actions";

const Search = () => {
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");

  const clearInput = () => {
    handleSaveSearch(valueSearch);
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
              sku
            }
          }
        }
      }
    }
  }
}`;
  const { data = null, loading = false } = useQuery(QUERY_PRODUCT);

  const handleSearchProduct = () => {
    const url = `https://api.whatsapp.com/send?phone=573152738113&text=Estoy%20buscando%20${valueSearch}`;
    util.openWebTab(url);
  };

  return (
    <div className={styles.containerSearch}>
      <h4 className={styles.labelSearch}>¿Qué estás buscando hoy?</h4>

      <div className={styles.inputSearchProducts}>
        <input
          className={styles.inputSearch}
          type={"text"}
          value={valueSearch}
          onChange={(e) => setValueSearch(util.resetString(e.target.value))}
          placeholder={"Escribe el nombre de tu producto"}
        />
        <div className={styles.iconSearch}>
          {loading ? (
            <Spinner animation="border" role="status" size={"sm"} />
          ) : (
            <SearchIcon />
          )}
        </div>
      </div>

      {!loading && valueSearch.length > 0 && (
        <>
          <div className={styles.iconClose} onClick={() => clearInput()}>
            <CloseIcon />
          </div>
          <div className={styles.contResult}>
            {data?.products?.edges && data?.products?.edges.length > 0 ? (
              data?.products?.edges.map(({ node }, index) => {
                const { description, title, images, variants } = node;
                const imageUrl = images?.edges[0]?.node?.src;
                const price = variants.edges[0].node.price;
                const id = variants.edges[0].node.id;
                const sku = variants.edges[0].node.sku;
                return (
                  <div
                    key={index}
                    className={styles.productSearch}
                    onClick={() =>
                      handleProduct({
                        imageUrl: imageUrl
                          ? imageUrl
                          : "/static/img/imgDisabled.png",
                        price,
                        variantId: id,
                        title,
                        description,
                        id,
                        sku,
                      })
                    }
                  >
                    <div className={styles.contImgSearch}>
                      <img
                        src={
                          imageUrl ? imageUrl : "/static/img/imgDisabled.png"
                        }
                        alt={title}
                      />
                    </div>
                    <div className={styles.informationSearch}>
                      <span className={styles.titleSearch}>{title}</span>
                      <span className={styles.priceSearch}>
                        {util.formatCOP(price)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.containerWsMsn}>
                <div className={styles.whatsappMsn}>
                  <h2>
                    ¿No encuentras{" "}
                    <span className={styles.keyword}>{valueSearch}</span>?
                  </h2>
                  <span>
                    No te preocupes haz click{" "}
                    <a
                      onClick={() => handleSearchProduct()}
                      className={styles.callToAction}
                    >
                      aquí
                    </a>{" "}
                    y te lo buscamos
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
