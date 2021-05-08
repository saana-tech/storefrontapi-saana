import React from "react";
import { motion } from "framer-motion";

import styles from "./Banner.module.css";

const Banner = () => {
  const img =
    "https://cdn.shopify.com/s/files/1/0539/3920/8366/files/ensure_dd81229c-a366-4b69-a9c1-3b4476fcf69b.png?v=1618530443";
  return (
    <motion.div
      className={styles.containerBanner}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.4,
          },
        },
      }}
    >
      <div className={styles.banner}>
        <div className={styles.information}>
          <h2>ENSURE ADVANCE</h2>
          <span>Mantente fuerte, mantente bien</span>
          <span style={{ marginTop: 25 }} className={styles.subtitle}>
            OFERTA ENSURE ADVANCE X 237 PAGUE 6 LLEVE 8
          </span>
        </div>
        <div className={styles.imgBanner}>
          <img src={img} alt={"Banner"} />
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
