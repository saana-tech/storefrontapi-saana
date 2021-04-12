import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  const img =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/banner_ensure.png?v=1617044561";
  return (
    <div className={styles.containerBanner}>
      <div className={styles.banner}>
        <div className={styles.information}>
          <h2>ENSURE ADVANCE</h2>
          <span>Mantente fuerte, mantente bien</span>
          <span style={{ marginTop: 25 }}>
            OFERTA ENSURE ADVANCE X 237 PAGUE 6 LLEVE 8
          </span>
        </div>
        <div className={styles.imgBanner}>
          <img src={img} alt={"Banner"} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
