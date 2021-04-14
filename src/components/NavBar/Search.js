import React, { useCallback, useEffect, useState } from "react";

import SearchIcon from "../../../public/static/svg/SearchIcon";
import styles from "./NavBar.module.css";
import clientAxios from "../../config/axios";
import util from "../../util";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");
  const [listResult, setListResult] = useState([]);

  const handleProduct = (product) => {
    setListResult([]);
    router.push({
      pathname: "/ProductSearch",
      query: { product: JSON.stringify(product) },
    });
  };

  const handleSearch = useCallback(async () => {
    try {
      if (valueSearch.length > 0) {
        const { data } = await clientAxios.get(
          `/search/suggest.json?q=${valueSearch}&resources[type]=product&resources[limit]=10&resources[options][unavailable_products]=last`
        );
        const products = data?.resources?.results.products;
        setListResult(products);

        console.log("response =>", products);
      } else {
        setListResult([]);
      }
    } catch (error) {
      console.log("error?=>", error.response);
    }
  }, [valueSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
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
      {listResult.length > 0 && (
        <div className={styles.contResult}>
          {listResult.map((product, index) => {
            const { image, featured_image, title, price, id, body } = product;
            const { alt } = featured_image;
            console.log("product search =>", product);
            return (
              <div
                key={index}
                className={styles.productSearch}
                onClick={() =>
                  handleProduct({
                    imageUrl: image,
                    price,
                    variantId: id,
                    title,
                    description: body,
                    id,
                  })
                }
              >
                <div className={styles.contImgSearch}>
                  <img src={image} alt={alt} />
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
      )}
    </div>
  );
};

export default Search;
