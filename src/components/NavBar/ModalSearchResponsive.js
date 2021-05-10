import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import CloseIcon from "../../../public/static/svg/CloseIcon";
import styles from "./NavBar.module.css";
import util from "../../util";
import { IMAGE_URL_DISABLED } from "../../constants";
const ModalSearchResponsive = ({ open, close }) => {
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");
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
  const { data = null } = useQuery(QUERY_PRODUCT);
  const clearInput = () => {
    setValueSearch("");
  };

  const handleProduct = (product) => {
    close(false);
    clearInput();
    router.push({
      pathname: "/Product",
      query: { product: JSON.stringify(product) },
    });
  };

  return (
    <>
      {open && (
        <div className={styles.modalSearch}>
          <div
            className={styles.iconCloseModalSearch}
            onClick={() => close(false)}
          >
            <CloseIcon />
          </div>
          <h4 className={styles.labelSearchR}>¿Qué estás buscando hoy?</h4>{" "}
          <div className={styles.modalInputSearch}>
            <input
              placeholder={"Escribe el nombre de tu producto"}
              onChange={(e) => setValueSearch(e.target.value)}
            />
          </div>
          {valueSearch.length > 0 && (
            <div>
              {data?.products?.edges.map(({ node }, index) => {
                const { description, title, images, variants } = node;
                const imageUrl = images?.edges[0]?.node?.src;
                const price = variants.edges[0].node.price;
                const id = variants.edges[0].node.id;
                return (
                  <div
                    key={index}
                    className={styles.productResponsive}
                    onClick={() =>
                      handleProduct({
                        imageUrl: imageUrl ? imageUrl : IMAGE_URL_DISABLED,
                        price,
                        variantId: id,
                        title,
                        description,
                        id,
                      })
                    }
                  >
                    <div className={styles.smallImg}>
                      <img
                        src={imageUrl ? imageUrl : IMAGE_URL_DISABLED}
                        alt={title}
                      />
                    </div>
                    <div className={styles.informationResponsiveProduct}>
                      <span>{title}</span>
                      <span>{util.formatCOP(price)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
ModalSearchResponsive.propTypes = {
  close: PropTypes.func,
  open: PropTypes.bool,
};
export default ModalSearchResponsive;
